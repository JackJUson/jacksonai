import "server-only"

import { generateId } from "ai"
import { createAI, createStreamableValue, getMutableAIState, StreamableValue } from "ai/rsc"
import { headers } from "next/headers"
import { systemPrompt } from "./prompt"
import { AIActions, AIState, ServerMessage, UIState } from "./types"
import { rateLimit } from "../rate-limit"
import OpenAI from "openai"

export async function continueConversation(input: string): Promise<StreamableValue<any, any>> {
  "use server"

  // Implement rate limit based on the request's IP
  const header = await headers()
  const ip = (header.get("x-forwarded-for") ?? "127.0.0.2").split(",")[0]

  const { success } = await rateLimit(ip)
  if (!success) {
    throw new Error("Rate limit exceeded")
  }

  const history = getMutableAIState<typeof AI>("messages")

  // Update the AI state with the new user message.
  history.update([...(history.get() as ServerMessage[]), { role: "user", content: input }])

  const stream = createStreamableValue()

  try {
    ;(async () => {
      const openai = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: process.env.OPEN_API_KEY,
        defaultHeaders: {
          "HTTP-Referer": "https://jacksonai-chat.vercel.app",
          "X-Title": "Jackson AI Chat",
        },
      })

      const messages = history.get() as ServerMessage[]
      const formattedMessages = [
        { role: "system" as const, content: systemPrompt() },
        ...messages.map((msg) => ({ role: msg.role as "user" | "assistant", content: msg.content })),
      ]

      const response = await openai.chat.completions.create({
        model: "openai/gpt-oss-20b:free",
        messages: formattedMessages,
        temperature: 0.7,
        max_tokens: 512, // Limit for speed
        stream: true,
      })

      let fullText = ""
      for await (const chunk of response) {
        const content = chunk.choices[0]?.delta?.content
        if (content) {
          fullText += content
          stream.update(content)
        }
      }

      history.done([...(history.get() as ServerMessage[]), { role: "assistant", content: fullText }])
      stream.done()
    })()

    return stream.value
  } catch {
    stream.done()
    throw new Error("Failed to send message")
  }
}

// Create the AI provider with the initial states and allowed actions
export const AI = createAI<AIState, UIState, AIActions>({
  initialAIState: { messages: [], id: generateId() },
  initialUIState: [],
  actions: {
    continueConversation,
  },
  onSetAIState: async ({ state, done }) => {
    "use server"
    // No longer saving conversations to database
  },
})

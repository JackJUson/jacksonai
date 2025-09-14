import "server-only"

import { Question } from "./types"

export async function getQuestions(): Promise<Question[]> {
  "use server"

  const contents: Question[] = [
    // About
    { content: "Tell me about yourself" },
    { content: "Where are you based currently?" },
    { content: "What are your interests outside work?" },

    // Education
    { content: "Where did you study and what did you study?" },
    { content: "What courses did you excel in?" },
    { content: "What did you learn during your degree?" },

    // Experiences
    { content: "What do you do at work currently?" },
    { content: "What technologies do you use at work?" },
    { content: "Tell me about your teaching experience" },
    { content: "What kind of systems have you built?" },

    // Certifications
    { content: "What certifications do you have?" },
    { content: "What did you learn from your certifications?" },

    // Recommendations
    { content: "Who has influenced or recommended you?" },
    { content: "Which mentors or thinkers do you follow?" },
  ]

  const result: Question[] = []

  // Select 4 random questions from the pool
  while (result.length < 4) {
    const remainingQuestions = contents.filter((q) => !result.includes(q))
    if (remainingQuestions.length === 0) break

    result.push(remainingQuestions[Math.floor(Math.random() * remainingQuestions.length)])
  }

  return result
}

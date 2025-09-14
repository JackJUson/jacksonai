import { defineDocumentType, makeSource } from "contentlayer/source-files"

// About collection
const About = defineDocumentType(() => ({
  name: "About",
  filePathPattern: "about/**/*.mdx",
  fields: {
    slug: { type: "string", required: true },
    title: { type: "string", required: true },
    description: { type: "string", required: true },
  },
}))

// Certifications collection
const Certification = defineDocumentType(() => ({
  name: "Certification",
  filePathPattern: "certifications/**/*.mdx",
  fields: {
    slug: { type: "string", required: true },
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    date: { type: "string", required: true },
    institution: { type: "string", required: true },
    website: { type: "string", required: false },
    skills: { type: "list", of: { type: "string" }, required: true },
  },
}))

// Educations collection
const Education = defineDocumentType(() => ({
  name: "Education",
  filePathPattern: "educations/**/*.mdx",
  fields: {
    slug: { type: "string", required: true },
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    location: { type: "string", required: true },
    date: { type: "string", required: true },
    institution: { type: "string", required: true },
    website: { type: "string", required: false },
    skills: { type: "list", of: { type: "string" }, required: true },
    grade: { type: "string", required: true },
  },
}))

// Experiences collection
const Experience = defineDocumentType(() => ({
  name: "Experience",
  filePathPattern: "experiences/**/*.mdx",
  fields: {
    slug: { type: "string", required: true },
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    date: { type: "string", required: true },
    company: { type: "string", required: true },
    website: { type: "string", required: false },
    position: { type: "string", required: true },
    location: { type: "string", required: true },
    skills: { type: "list", of: { type: "string" }, required: true },
  },
}))

// Recommendations collection
const Recommendation = defineDocumentType(() => ({
  name: "Recommendation",
  filePathPattern: "recommendations/**/*.mdx",
  fields: {
    slug: { type: "string", required: true },
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    author: { type: "string", required: true },
    role: { type: "string", required: true },
    relation: { type: "string", required: true },
    link: { type: "string", required: true },
    date: { type: "string", required: true },
  },
}))

export default makeSource({
  contentDirPath: "content",
  documentTypes: [About, Certification, Education, Experience, Recommendation],
})

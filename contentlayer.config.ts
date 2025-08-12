import { defineDocumentType, makeSource } from 'contentlayer/source-files';

export const About = defineDocumentType(() => ({
  name: 'About',
  filePathPattern: 'about/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('about/', ''),
    },
  },
}));

export const Education = defineDocumentType(() => ({
  name: 'Education',
  filePathPattern: 'education/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    institution: { type: 'string', required: true },
    degree: { type: 'string', required: true },
    startDate: { type: 'date', required: true },
    endDate: { type: 'date', required: false },
    description: { type: 'string', required: true },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('education/', ''),
    },
  },
}));

export const Experience = defineDocumentType(() => ({
  name: 'Experience',
  filePathPattern: 'experience/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    company: { type: 'string', required: true },
    position: { type: 'string', required: true },
    startDate: { type: 'date', required: true },
    endDate: { type: 'date', required: false },
    description: { type: 'string', required: true },
    technologies: { type: 'list', of: { type: 'string' }, required: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('experience/', ''),
    },
  },
}));

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: 'projects/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    technologies: { type: 'list', of: { type: 'string' }, required: false },
    githubUrl: { type: 'string', required: false },
    liveUrl: { type: 'string', required: false },
    featured: { type: 'boolean', required: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('projects/', ''),
    },
  },
}));

export const Skill = defineDocumentType(() => ({
  name: 'Skill',
  filePathPattern: 'skills/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    category: { type: 'string', required: true },
    description: { type: 'string', required: true },
    proficiency: { type: 'number', required: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('skills/', ''),
    },
  },
}));

export const Language = defineDocumentType(() => ({
  name: 'Language',
  filePathPattern: 'languages/*.mdx',
  contentType: 'mdx',
  fields: {
    name: { type: 'string', required: true },
    level: { type: 'string', required: true },
    description: { type: 'string', required: true },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('languages/', ''),
    },
  },
}));

export default makeSource({
  contentDirPath: 'src/content',
  documentTypes: [About, Education, Experience, Project, Skill, Language],
});

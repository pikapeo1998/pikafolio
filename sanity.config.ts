import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

const projectType = {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()},
    {name: 'excerpt', title: 'Excerpt', type: 'text'},
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {list: ['Branding', 'Web Design', 'Development', 'Marketing']},
    },
    {name: 'link', title: 'Project link', type: 'url'},
    {name: 'image', title: 'Image', type: 'image', options: {hotspot: true}},
  ],
}

export default defineConfig({
  name: 'default',
  title: 'Pikapeo Portfolio',
  projectId: 't8fz3ups',
  dataset: 'production',
  plugins: [structureTool()],
  schema: {types: [projectType]},
})

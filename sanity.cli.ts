
import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'o1klbuxt',
    dataset: 'production',
  },
  server: {
    hostname: '0.0.0.0',
    port: 3334,
  },
})

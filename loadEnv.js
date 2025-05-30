import dotEnv from 'dotenv'

const path = process.env.CUSTOM_ENV
  ? process.env.CUSTOM_ENV
  : process.env.NODE_ENV === 'production'
  ? '.env'
  : '.env.dev'

dotEnv.config({ path })

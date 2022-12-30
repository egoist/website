declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string
    AUTH_SECRET: string
    AUTH_COOKIE_NAME: string
  }
}

declare var _singletons: Record<string, any>

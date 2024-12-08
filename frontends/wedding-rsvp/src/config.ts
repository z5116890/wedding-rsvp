// /////////////////////////////////////////////////
// DON'T MODIFY THIS FILE
// Add configs to the `.dotenv` file, items starting with `CONFIG_`
// Add any types to `/types/Config.d.ts`
// ////////////////////////////////////////////////

interface Config {
  SERVER_URL?: string
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __APPCONFIG__: Config
  }
}

const windowConfig: Config = window.__APPCONFIG__ || null
export default windowConfig

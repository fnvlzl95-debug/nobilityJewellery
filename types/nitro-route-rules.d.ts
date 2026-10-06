import 'nitropack/types'

// Nuxt 3 augments `nitropack`, but this Nitro version defines route rules in
// `nitropack/types`. Keep Nuxt's supported rendering flag on those interfaces.
declare module 'nitropack/types' {
  interface NitroRouteConfig {
    ssr?: boolean
  }

  interface NitroRouteRules {
    ssr?: boolean
  }
}

import 'angular-server-side-configuration/process'
export const environment = {
  production: true,
  GH_AUTH_TOKEN: process.env.GH_AUTH_TOKEN
}

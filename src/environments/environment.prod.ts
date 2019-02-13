import 'angular-server-side-configuration/process'
export const environment = {
  production: true,
  GH_AUTH_TOKEN: process.env.GH_AUTH_TOKEN || '4350b64f1ea73c347697a2dfdf81adbf4919bad8'
}

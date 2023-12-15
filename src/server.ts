/* eslint-disable @typescript-eslint/no-namespace */
import app from './app'
import { serverConfig } from './config/server'

app.listen(serverConfig.port, () => {
  console.log(`Ouvindo a porta ${serverConfig.port}`)
})

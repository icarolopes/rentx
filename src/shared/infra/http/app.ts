import 'reflect-metadata'

import express, { NextFunction, Request, Response } from 'express'
import swaggerUI from 'swagger-ui-express'
import * as dontenv from 'dotenv'

import createConnection from '@shared/infra/typeorm'

import 'express-async-errors'

import { AppError } from '@shared/errors/AppError'

import '@shared/container'

import { router } from './routes'

import swaggerFile from '../../../swagger.json'

createConnection()

dontenv.config({ path: `${__dirname}/.env` })

const app = express()
app.use(express.json())

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile))

app.use(router)

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    })
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`
  })
})

export { app }

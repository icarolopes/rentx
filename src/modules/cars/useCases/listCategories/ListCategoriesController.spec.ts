import { hash } from 'bcrypt'
import { Connection, createConnection } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'
import request from 'supertest'

import { app } from '@shared/infra/http/app'

let connection: Connection
describe('List Category Controller', () => {
  beforeAll(async () => {
    connection = await createConnection()

    await connection.runMigrations()

    const id = uuidV4()

    const password = await hash('admin', 8)

    await connection.query(
      `insert into users (id, name, email, password, "isAdmin", created_at, driver_license) values ( '${id}', 'admin', 'admin@mail.com', '${password}', true, 'now()', 'xxx' )`
    )
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('should be able to list all categories', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@mail.com',
      password: 'admin'
    })

    const { refresh_token } = responseToken.body

    await request(app)
      .post('/categories')
      .send({
        name: 'Category Supertest2',
        description: 'Category Supertest2'
      })
      .set({
        Authorization: `Bearer ${refresh_token}`
      })

    const response = await request(app).get('/categories')

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(1)
    expect(response.body[0]).toHaveProperty('id')
  })
})

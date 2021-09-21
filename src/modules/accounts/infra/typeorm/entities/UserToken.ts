import { v4 as uuidV4 } from 'uuid'

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn
} from 'typeorm'
import { User } from './User'

@Entity('users_tokens')
export class UserTokens {
  @PrimaryColumn()
  id: string

  @Column()
  refresh_token: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column()
  user_id: string

  @Column()
  expires_date: Date

  @CreateDateColumn()
  create_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}

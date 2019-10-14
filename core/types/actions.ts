import { User } from './user'

export interface GotUserAction {
  type: 'GOT_USER'
  user: User | null
}

export type UserACtionTypes = GotUserAction

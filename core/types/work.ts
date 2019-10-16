import { User } from './account'

export interface Work {
  _id: string
  name: string
  category: string
  description: string
  createdBy: User
}

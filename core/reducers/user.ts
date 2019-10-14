import { Action } from 'redux'

import { User } from '../types/user'
import { UserACtionTypes } from '../types/actions'

function user(state: User | null = null, action: UserACtionTypes) {
  switch (action.type) {
    case 'GOT_USER':
      return action.user

    default:
      return state
  }
}

export { user }

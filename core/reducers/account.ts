import { Action } from 'redux'

import { Account } from '../types/account'
import { AccountActionTypes } from '../types/actions'

function account(state: Account | null = null, action: AccountActionTypes) {
  switch (action.type) {
    case 'GOT_ACCOUNT':
      return action.account

    default:
      return state
  }
}

export { account }

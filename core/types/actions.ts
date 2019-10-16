import { Account } from './account'

export interface GotAccountAction {
  type: 'GOT_ACCOUNT'
  account: Account | null
}

export type AccountActionTypes = GotAccountAction

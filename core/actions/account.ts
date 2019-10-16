import { ActionCreator, Action } from 'redux'
import { ThunkDispatch, ThunkAction } from 'redux-thunk'

import * as auth from '../services/auth'
import { Account } from '../types/account'
import { GotAccountAction } from '../types/actions'
import { AppState } from '../store'

export const gotAccount: ActionCreator<GotAccountAction> = (
  account: Account
) => ({
  type: 'GOT_ACCOUNT',
  account,
})

// export const signInWithEmail = (
//   email: string,
//   password: string
// ): ThunkAction<
//   Promise<Account | null>,
//   AppState,
//   null,
//   GotAccountAction
// > => async dispatch => {
//   try {
//     const res = await auth.signIn(email, password)
//     const { user } = res.data
//     dispatch(gotAccount(user))
//     return user
//   } catch (err) {
//     console.log(err)
//     return null
//   }
// }

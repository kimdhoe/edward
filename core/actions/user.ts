import { ActionCreator, Action } from 'redux'
import { ThunkDispatch, ThunkAction } from 'redux-thunk'

import * as auth from '../services/auth'
import { User } from '../types/user'
import { GotUserAction } from '../types/actions'
import { AppState } from '../store'

export const gotUser: ActionCreator<GotUserAction> = (user: User) => ({
  type: 'GOT_USER',
  user,
})

// export const signInWithEmail = (
//   email: string,
//   password: string
// ): ThunkAction<
//   Promise<User | null>,
//   AppState,
//   null,
//   GotUserAction
// > => async dispatch => {
//   try {
//     const res = await auth.signIn(email, password)
//     const { user } = res.data
//     dispatch(gotUser(user))
//     return user
//   } catch (err) {
//     console.log(err)
//     return null
//   }
// }

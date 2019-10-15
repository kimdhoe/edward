import { Store } from 'redux'
import { parseCookies } from 'nookies'
import { NextPageContext } from 'next'

import { hopper } from './hopper'
import { HopperResponse, HopperSignInData } from '../types/hopper'
import { gotUser } from '../actions/user'

export function signUp(
  name: string,
  email: string,
  password: string
): Promise<HopperResponse<void>> {
  return hopper
    .post('signup', {
      json: { name, email, password },
    })
    .json()
}

export async function signIn(
  email: string,
  password: string
): Promise<HopperResponse<HopperSignInData>> {
  try {
    return hopper
      .post('signin', {
        json: { email, password },
      })
      .json()
  } catch (err) {
    return err.response.json()
  }
}

export async function signInWithToken(
  token: string
): Promise<HopperResponse<HopperSignInData>> {
  try {
    return hopper
      .post('signin-with-token', {
        headers: {
          authorization: 'Bearer ' + token,
        },
      })
      .json()
  } catch (err) {
    return err.response.json()
  }
}

export async function signOut() {
  try {
    return hopper.post('signout').json
  } catch (err) {
    console.log('Catched', err)
    return err.response.json()
  }
}

// Fetch user data using JWT token cookie and save into the Redux store,
// so that logged-in state can be rendered on server.
// Assume ctx includes Redux store.
export async function populateUserIfPossible(ctx: NextPageContext) {
  // Run on server, not client.
  if (!ctx.res) return

  const { token } = parseCookies(ctx)

  if (token) {
    try {
      const res = await signInWithToken(token)

      if (res.ok) {
        const { user } = res.data
        const { store } = ctx as NextPageContext & { store: Store }

        store.dispatch(
          gotUser({ id: user.id, name: user.name, email: user.email })
        )
      } else {
        // If sign-in request fails, sign out (delete token in cookie).
        await signOut()
      }
    } catch (err) {
      console.log('err', err.message)
    }
  }
}

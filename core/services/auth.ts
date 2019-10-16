import { Store } from 'redux'
import { parseCookies } from 'nookies'
import { NextPageContext } from 'next'

import { hopper } from './hopper'
import { HopperResponse, HopperSignInData } from '../types/hopper'
import { gotAccount } from '../actions/account'

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

// TODO
export async function continueWithFacebook({
  accessToken,
}: {
  accessToken: string
}): Promise<HopperResponse<HopperSignInData>> {
  try {
    return hopper
      .post('continue-with-facebook', {
        json: {
          // eslint-disable-next-line @typescript-eslint/camelcase
          access_token: accessToken,
        },
      })
      .json()
  } catch (err) {
    return err.response.json()
  }
}

export async function continueWithGoogle({
  accessToken,
}: {
  accessToken: string
}): Promise<HopperResponse<HopperSignInData>> {
  try {
    return hopper
      .post('continue-with-google', {
        json: { accessToken },
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
    return err.response.json()
  }
}

// Fetch account data using JWT token cookie and save into the Redux store,
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
        const { account } = res.data
        const { store } = ctx as NextPageContext & { store: Store }

        store.dispatch(
          gotAccount({
            id: account.id,
            name: account.name,
            email: account.email,
            token,
          })
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

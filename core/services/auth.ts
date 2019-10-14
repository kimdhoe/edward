import { hopper } from './hopper'

import { HopperResponse, HopperSignInData } from '../types/hopper'

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
    console.log('Catched', err)
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

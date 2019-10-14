import { hopper } from './hopper'

export function signUp(name: string, email: string, password: string) {
  return hopper
    .post('signup', {
      json: { name, email, password },
    })
    .json()
}

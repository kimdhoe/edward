import { User } from './user'

export interface HopperSignInData {
  user: User
}

export type HopperSuccessDataTypes = HopperSignInData | void

export interface HopperSuccess<T extends HopperSuccessDataTypes> {
  ok: true
  data: T
}

export interface HopperError {
  ok: false
  data: { message: string }
}

export type HopperResponse<T extends HopperSuccessDataTypes> =
  | HopperSuccess<T>
  | HopperError

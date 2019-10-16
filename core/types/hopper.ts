import { Account } from './account'
import { Work } from './work'

export interface HopperSignInData {
  account: Account
}

export interface HopperWorksData {
  works: Work[]
}

export interface HopperWorkData {
  work: Work
}

export type HopperSuccessDataTypes =
  | HopperSignInData
  | HopperWorkData
  | HopperWorksData
  | void

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

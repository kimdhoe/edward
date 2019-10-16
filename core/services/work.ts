import { hopper } from './hopper'
import { useSelector } from 'react-redux'
import { AppState } from '../store'
import {
  HopperResponse,
  HopperWorkData,
  HopperWorksData,
} from '../types/hopper'

let _token: string | null = null

export const getWorks = async (): Promise<HopperResponse<HopperWorksData>> => {
  return await hopper.get('api/work').json()
}

const _createWork = async ({
  name,
  description,
  category,
}: {
  name: string
  description: string
  category: string
  token?: string
}): Promise<HopperResponse<HopperWorkData>> => {
  return await hopper
    .post('api/work', {
      json: { name, description, category },
      headers: {
        authorization: 'Bearer ' + _token,
      },
    })
    .json()
}

export const useWorkService = () => {
  _token = useSelector(
    (state: AppState) => state.account && state.account.token
  )

  return {
    createWork: _createWork,
  }
}

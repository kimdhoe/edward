import { hopper } from './hopper'
import { useSelector } from 'react-redux'
import { AppState } from '../store'

let _token: string | null = null

const _createWork = async ({
  name,
  description,
  category,
}: {
  name: string
  description: string
  category: string
  token?: string
}) => {
  const res = await hopper
    .post('api/work', {
      json: { name, description, category },
      headers: {
        authorization: 'Bearer ' + _token,
      },
    })
    .json()

  return res
}

export const useWorkService = () => {
  _token = useSelector(
    (state: AppState) => state.account && state.account.token
  )

  return {
    createWork: _createWork,
  }
}

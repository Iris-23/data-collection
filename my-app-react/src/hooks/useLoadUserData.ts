import { useEffect, useState } from 'react'
import { useRequest } from 'ahooks'
import { getUserInfoService } from '../services/user'
import { useDispatch } from 'react-redux'
import { loginReducer } from '../store/userReducer'
import { getToken } from '../utils/user-token'

function useLoadUserData() {
  const [waitingUserData, setWaitingUserData] = useState(true)

  const dispatch = useDispatch()

  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result
      dispatch(loginReducer({ username, nickname }))
    },
    onFinally() {
      setWaitingUserData(false)
    },
  })

  const token = getToken()

  useEffect(() => {
    if (!token) {
      setWaitingUserData(false)
      return
    }

    run()
  }, [token])

  return { waitingUserData }
}

export default useLoadUserData

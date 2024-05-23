import { useEffect } from 'react'
import {
  isLoginOrRegister,
  MANAGE_INDEX_PATHNAME,
  isNoNeedUserInfo,
  LOGIN_PATHNAME,
} from '../router'
import { useLocation, useNavigate } from 'react-router-dom'
import { getToken } from '../utils/user-token'


function useNavPages(waitingUserData: boolean) {

  const { pathname } = useLocation()
  
  const token = getToken()

  const nav = useNavigate()

  useEffect(() => {
    if (waitingUserData) return

    if (token) {
      if (isLoginOrRegister(pathname)) {
        nav(MANAGE_INDEX_PATHNAME)
      }
      return
    }

    if (isNoNeedUserInfo(pathname)) {
      return
    } else {
      nav(LOGIN_PATHNAME)
    }
  }, [waitingUserData, token, pathname])
}

export default useNavPages

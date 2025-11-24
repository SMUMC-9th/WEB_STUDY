import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../store/store'
import { login, logout, restore } from '../store/loginSlice'
import { useEffect } from 'react'

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>()

  const { isLogin, accessToken } = useSelector(
    (state: RootState) => state.login
  )

  useEffect(() => {
    dispatch(restore())
  }, [dispatch])

  return {
    isLogin,
    accessToken,
    login: (token: string) => dispatch(login(token)),
    logout: () => dispatch(logout()),
  }
}

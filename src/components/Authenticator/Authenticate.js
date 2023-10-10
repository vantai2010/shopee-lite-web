import React, { Children, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { environment } from '../../utils/constant'
import { useNavigate } from 'react-router-dom'
import setAuthToken from '../../utils/setAuthToken'
import { unwrapResult } from '@reduxjs/toolkit'
import { fetchLoginWithTokenThunk } from '../../store/slices/appSlice'

export default function Authenticate({ children }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loadUser = async () => {
        let nameLocalStore = environment.REACT_APP_LOCAL_STORE_TOKEN_NAME
        if (localStorage.getItem(nameLocalStore)) {
            setAuthToken(localStorage[nameLocalStore])
        }
        try {
            let response = await dispatch(fetchLoginWithTokenThunk())
            let data = unwrapResult(response)
            if (data && data.errCode === 0) {
                navigate("/home")
            } else {
                setAuthToken(null)
                localStorage.removeItem(nameLocalStore)
            }
        } catch (error) {
            console.log('loi authentica: ', error)
            setAuthToken(null)
            localStorage.removeItem(nameLocalStore)
        }
    }
    useEffect(() => {
        loadUser()
    }, [])

    return (
        <>
            {children}
        </>
    )
}

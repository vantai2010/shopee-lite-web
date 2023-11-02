import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { keyMap } from '../../utils/constant'
import { handleLoginService, loginWithTokenService } from '../../services/appService'

export const fetchLoginWithTokenThunk = createAsyncThunk('app/fetchLoginWidthTokenThunk', async () => {
    try {
        let response = await loginWithTokenService()
        return response

    } catch (error) {
        console.log(error)
    }
})

export const fetchLoginThunk = createAsyncThunk('app/fetchLoginThunk', async (data) => {
    try {
        let response = await handleLoginService(data)
        return response

    } catch (error) {
        console.log(error)
    }
})


const initialState = {
    language: keyMap.VI,
    isLoading: false,
    isLogin: false,
    notifySocket: null,
    userData: {}
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        changeLanguage: (state, action) => {
            state.language = action.payload
        },
        handleConnectSocketNotify: (state, action) => {
            state.notifySocket = action.payload
        },
        handleDisConnectSocketNotify: (state, action) => {
            state.notifySocket?.disconnect()
            state.notifySocket = null
        },
    },
    extraReducers: {
        [fetchLoginWithTokenThunk.pending]: (state, action) => {
            state.isLoading = true
        },
        [fetchLoginWithTokenThunk.fulfilled]: (state, action) => {
            state.isLoading = false
            state.userData = action.payload?.data
        },
        [fetchLoginWithTokenThunk.rejected]: (state, action) => {
            state.isLoading = false
            state.userData = {}
        },
        [fetchLoginThunk.pending]: (state, action) => {
            state.isLoading = true
        },
        [fetchLoginThunk.fulfilled]: (state, action) => {
            state.isLoading = false
            state.userData = action.payload?.data
        },
        [fetchLoginThunk.rejected]: (state, action) => {
            state.isLoading = false
            state.userData = {}
        },
    }
})


export const { changeLanguage, handleConnectSocketNotify, handleDisConnectSocketNotify } = appSlice.actions

export default appSlice.reducer
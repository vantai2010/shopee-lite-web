import { io } from 'socket.io-client'
import { environment } from '../utils/constant';

const connectToNotifySocket = () => {
    // let url = env.REACT_APP_URL_BACK_END ? env.REACT_APP_URL_BACK_END + '/notify' : `${URL_BACK_END}/notify`
    // let nameLocalStore = env.REACT_APP_LOCAL_STORE_TOKEN_NAME ? env.REACT_APP_LOCAL_STORE_TOKEN_NAME : NAME_LOCAL_STORED

    let url = environment.BASE_URL_BE + '/notify'
    let nameLocalStore = environment.REACT_APP_LOCAL_STORE_TOKEN_NAME

    if (localStorage.getItem(nameLocalStore)) {
        return io.connect(url, {
            auth: {
                token: localStorage[nameLocalStore]
            }
        })
    } else {
        return null
    }
}

export {
    connectToNotifySocket
}
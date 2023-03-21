import Api from './Api'

export default {
    register (credentials) {
        return Api().post('auth/register', credentials)
    },
    login (credentials) {
        return Api().post('auth/signin', credentials)
    },
    getUser (credentials) {
        return Api().get('auth/getUser', credentials)
    },
    signout (credentials) {
        return Api().post('auth/signout', credentials)
    },
    refresh (credentials) {
        return Api().post('auth/refresh', credentials)
    }
}


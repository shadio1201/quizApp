import Api from './Api'

export default {
    postQuiz (credentials) {
        return Api().post('api/postQuiz', credentials)
    },
    getQuiz () {
        return Api().get('api/getQuiz')
    }
}
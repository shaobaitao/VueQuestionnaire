import axios from "axios";

const api = {
    getAnalysis(data) {
        return axios.post('api/getAnalysis.php', data).then(res => res)
    },
    login(data) {
        return axios.post('api/login.php', data).then(res => res)
    },
    loginCheck(data) {
        return axios.post('api/login_check.php', data).then(res => res)
    },
    getQuestions(data) {
        return axios.post('api/getQuestions.php', data).then(res => res)
    },
    deleteQuestion(data) {
        return axios.post('api/deleteQuestions.php', data).then(res => res)
    },
    checkAddQuestion(data) {
        return axios.post('api/addQuestion.php', data).then(res => res)
    },
    getFormData(data) {
        return axios.post('api/getFormData.php', data).then(res => res)
    },
    createForm(data) {
        return axios.post('api/createForm.php', data).then(res => res)
    },
    deleteForm(data) {
        return axios.post('api/deleteForm.php', data).then(res => res)
    },
    addAnswer(data) {
        return axios.post('api/addAnswer.php', data).then(res => res)
    },
    registerCheck(data) {
        return axios.post('api/register_check.php', data).then(res => res)
    },
}

export default api;
import { isEmpty } from 'lodash'

const requestErrorHandler = (error, alert) => {
    console.error(error.response)
    if (!isEmpty(error.response)) {
        return alert.error(error.response.data.message)
    }
    alert.error(error.message)
}

export default requestErrorHandler
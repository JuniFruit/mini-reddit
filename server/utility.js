

const errorMessage = (e) => {

    return {
        status: 'error',
        message: `Couldn't retrieve the data. Reason ${e}`
    }
}

module.exports = errorMessage;
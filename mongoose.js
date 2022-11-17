

const mongoose = require('mongoose');

const url = process.env.MONGO_CONNECT;

const connectToMongo = async () => {

    try {
        await mongoose.connect(url);
        console.log('connected mongoose')
    } catch (e) {
        console.error(e)
    }
}


module.exports = connectToMongo;
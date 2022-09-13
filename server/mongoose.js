

const mongoose = require('mongoose');

const url = `mongodb+srv://JuniFruit:${process.env.MONG_PASS}@cluster0.klarz67.mongodb.net/?retryWrites=true&w=majority`;

const connectToMongo = async () => {

    try {
        await mongoose.connect(url);
        console.log('connected mongoose')
    } catch (e) {
        console.error(e)
    }
}


module.exports = connectToMongo;
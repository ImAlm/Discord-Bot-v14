const mongoose = require('mongoose')
const { API } = require('../config.json')

class Handler {

    Connection() {

        mongoose.set('strictQuery', false)
        mongoose.connect(

            API.mongokey

        )
        .then(x => console.log(`[ Database ] - Başarılı bir şekilde veritaban bağlantısı gerçekleştirildi.`))
        .catch(() => console.log(`[ Database ] - Veritabanına erişim sağlanamadı.`))
    }
}

module.exports = new Handler()
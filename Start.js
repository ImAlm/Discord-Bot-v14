const MongooseConnection = require('./Src/Functions/Mongoose')
MongooseConnection.Connection()

const MainBot = require('./Src/Main/Main')
MainBot.Start()
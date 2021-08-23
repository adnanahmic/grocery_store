const mongoose = require('mongoose');
const Config = require('./config');
module.exports = {
    connect : async()=>{
        try{
          const connectionString = getConnectionString();
          await mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
          console.log('Database connected successfully!!!');
        }
        catch(err){
          console.log(err);
        }
    },
    close : ()=>{
        const db = mongoose.connection;
    }
}

const getConnectionString = ()=>{
    let connectionString = `mongodb://${Config.db.host}:${Config.db.port}/${Config.db.name}`;

    if (process.env.NODE_ENV && process.env.NODE_ENV.trim() !== 'development') {
      connectionString = `mongodb://${Config.db.userName}:${Config.db.password}@${Config.db.host}:${Config.db.port}/${Config.db.name}`;
    }
    if(Config.db.authDB){
      connectionString +=`?authSource=${Config.db.authDB}`;
    }
    return connectionString;

}
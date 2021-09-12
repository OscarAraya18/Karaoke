const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

const uri = "mongodb+srv://darksolutions:karaoke@cluster0.bolx4.mongodb.net/tracksdb?retryWrites=true&w=majority";

let db;

if (process.env.NODE_ENV == 'test'){
    const Mockgoose = require('mockgoose').Mockgoose;
    var mockgoose = new Mockgoose(mongoose);
    mockgoose.helper.setDbVersion('3.2.1');

    mockgoose.prepareStorage().then(() => {
        mongoose.connect('mongodb://localhost:1234/test', { useNewUrlParser: true}, (err) => {
            if (err) {
                console.log(err);
                process.exit(0);
            }
            console.log('Base de datos de prueba conectada');
        });
    });
    db = mongoose.connection;
}
else{
    MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
        if (err) {
            console.log(err);
            process.exit(0);
        }
        db = client.db('tracksdb');
        console.log('Base de datos conectada');
    });
}

const obtenerConexion = () => db;

module.exports = {
    obtenerConexion
}

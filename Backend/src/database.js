const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

const uri = "mongodb+srv://darksolutions:karaoke@cluster0.bolx4.mongodb.net/tracksdb?retryWrites=true&w=majority";

let db;

if (process.env.NODE_ENV == 'test'){
    const Mockgoose = require('mockgoose').Mockgoose;
    const mockgoose = new Mockgoose(mongoose);
    console.log("Prueba");
    mockgoose.prepareStorage().then(() => {
        mongoose.connect('mongodb://localhost:1234/test', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
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
    console.log("Suave");
    MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
        if (err) {
            console.log(err);
            process.exit(0);
        }
        db = client.db('tracksdb');
        console.log('Base de datos conectada');
    });
}
/*
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if(err){
        console.log(err);
        process.exit(0);
    }
    db = client.db('tracksdb');
    console.log('Base de datos conectada');
});*/


const obtenerConexion = () => db;

module.exports = {
    obtenerConexion
}

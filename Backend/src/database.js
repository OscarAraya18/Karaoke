const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

const uri = "mongodb+srv://darksolutions:karaoke@cluster0.bolx4.mongodb.net/tracksdb?retryWrites=true&w=majority";

let db;

// en caso de que la base de datos se necesite para tests
if (process.env.NODE_ENV == 'test'){
    db = mongoose.connection;
}//sino, se conecta a la base de datos alojada en la nube
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

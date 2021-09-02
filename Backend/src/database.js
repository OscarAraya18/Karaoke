const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://darksolutions:karaoke@cluster0.bolx4.mongodb.net/tracksdb?retryWrites=true&w=majority";

let db;

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if(err){
        console.log(err);
        process.exit(0);
    }
    db = client.db('tracksdb');
    console.log('Base de datos conectada');
});


const obtenerConexion = () => db;

module.exports = {
    obtenerConexion
}

const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

const uri = "mongodb+srv://darksolutions:karaoke@cluster0.bolx4.mongodb.net/tracksdb?retryWrites=true&w=majority";

let db;

async function connectDB() {
    if (process.env.NODE_ENV == 'test'){
        console.log("AAAA");
        const Mockgoose = require('mockgoose').Mockgoose;
        var mockgoose = new Mockgoose(mongoose);
        mockgoose.helper.setDbVersion('3.2.1');

        await mockgoose.prepareStorage();
        console.log("BBBB");
        await mongoose.connect('mongodb://localhost:1234/test', { useNewUrlParser: true, connectTimeoutMS: 5000 })
            .catch(() => 'Unable to connect to test database');
        
        console.log("CCCC");
        return db = mongoose.connection;
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
}

/*if (process.env.NODE_ENV == 'test'){
    const Mockgoose = require('mockgoose').Mockgoose;
    var mockgoose = new Mockgoose(mongoose);
    mockgoose.helper.setDbVersion('3.2.1');

    await mockgoose.prepareStorage(() => {
        mongoose.connect('mongodb://localhost:1234/test', { useNewUrlParser: true, connectTimeoutMS: 5000}, (err) => {
            if (err) {
                console.log(err);
                process.exit(0);
            }
            console.log('Base de datos de prueba conectada');
        });
    });
    console.log("Sale");
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
}*/

const obtenerConexion = () => db;

module.exports = {
    obtenerConexion,
    connectDB
}

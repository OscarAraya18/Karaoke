const multer = require('multer');
const { obtenerConexion } = require('../database');
const { GridFSBucket, ObjectId } = require('mongodb');
const { Readable } = require('stream');

const getCancion = (req, res) => {
    let idCancion;

    try {
        idCancion = new ObjectId(req.params.trackId);
    } catch (error) {
        return res.status(400).json({message: "Id invalido en la URL"})
    }

    res.set('content-type', 'audio/mp3');
    res.set('accept-ranges', 'bytes');

    const db = obtenerConexion();
    const bucket = new GridFSBucket(db, {
        bucketName: 'canciones'
    });

    let downloadStream = bucket.openDownloadStream(idCancion);

    downloadStream.on('data', chunk => {
        res.write(chunk);
    });

    downloadStream.on('error', () => {
        return res.status(404).json({message: err.message});
    });

    downloadStream.on('end', () => {
        res.end();
    });
};

const getLetra = (req, res) => {
    let idCancion;

    try {
        idCancion = new ObjectId(req.params.trackId);
    } catch (error) {
        return res.status(400).json({message: "Id invalido en la URL"})
    }
    const db = obtenerConexion();
    db.collection("metadata").findOne({cancionId: idCancion}, 
        { projection: { _id: 0, album: 0, artista: 0 } }
    , function(err, result) {
        if (err) {
            console.log(err);
            return res.status(400).json({message: err.message});
        }
        return res.status(200).send(result);
      });
};

const getAllCanciones = (req, res) => {
    const db = obtenerConexion();
    
    db.collection("metadata").find({}, { projection: { _id: 0, letra: 0 } } ).limit(20)
    .toArray(function(err, result) {
        if (err) {
            console.log(err);
            return res.status(400).json({message: err.message});
        }
        return res.status(200).send(result);
      });
};


const postCancion = (req, res) => {
    const storage = multer.memoryStorage();
    const upload = multer({
        storage,
        limits: {
            fields: 4,
            fileSize: 10000000,
            files: 1,
            parts: 5
        }
    });
    upload.single('track')(req, res, (err) => {
        if(err){
            console.log(err);
            return res.status(400).json({message: err.message});
        }
        else if (!req.body.name || !req.body.album ||
            !req.body.artista || !req.body.letra){
            return res.status(400).json({message: "Faltaron atributos para la cancion"});
        }
        
        let nombreCancion = req.body.name;
        let album = req.body.album;
        let artista = req.body.artista;
        let letra = req.body.letra;

        const readableTrackStream = new Readable();
        readableTrackStream.push(req.file.buffer);
        readableTrackStream.push(null);

        const db = obtenerConexion();
        const bucket = new GridFSBucket(db, {
            bucketName: 'canciones'
        });

        let uploadStream = bucket.openUploadStream(nombreCancion);
        const id = uploadStream.id;
        readableTrackStream.pipe(uploadStream);

        var myObject = {
            cancionId: id,
            nombre: nombreCancion,
            album: album,
            artista: artista,
            letra: letra
        };

        uploadStream.on('error', () => {
            return res.status(500).json({ message: "Error subiendo el archivo" });
        });

        uploadStream.on('finish', () => {
            console.log("Hola");
            db.collection("metadata").insertOne(myObject, (err, res) => {
                if (err) {
                    return res.status(400).json({ message: "Error subiendo la metadata" });
                }
                console.log("1 document inserted");
            });

            return res.status(200).json({ message: "Archivo subido satisfactoriamente. El id es: " + id });
        });
    });
};

const deleteCancion = (req, res) => {
    try {
        idCancion = new ObjectId(req.params.trackId);
    } catch (error) {
        return res.status(400).json({message: "Id invalido en la URL"})
    }

    var db = obtenerConexion();

    //primero se eliminan los pedazos
    db.collection("canciones.chunks").deleteMany({ files_id: idCancion }, function (err, obj) {
        if (err) {
            console.log(err);
            return res.status(400).json({ message: err.message });
        }
    });

    //despues se elimina el archivo en si  
    db.collection("canciones.files").deleteMany({ _id: idCancion }, function (err, obj) {
        if (err) {
            console.log(err);
            return res.status(400).json({ message: err.message });
        }
    });

    //ademas se elimina la metadata
    db.collection("metadata").deleteMany({ cancionId: idCancion }, function (err, obj) {
        if (err) {
            console.log(err);
            return res.status(400).json({ message: err.message });
        }
        return res.status(200).json({ message: "Cancion eliminada correctamente" });
    });

};

const updateCancion = (req, res) => {
    let idCancion;

    try {
        idCancion = new ObjectId(req.params.trackId);
    } catch (error) {
        return res.status(400).json({message: "Id invalido en la URL"})
    }

    var db = obtenerConexion();
    var newvalues = { $set: req.body};
    
    db.collection("metadata").updateOne({cancionId : idCancion}, newvalues, function(err) {
        if (err) {
            console.log(err);
            return res.status(400).json({ message: err.message });
        }
        return res.status(200).json({ message: "Cancion actualizada correctamente" });
      });
};

const buscarCancion = (req, res) => {
    var {letra, nombre, album, artista} = req.query;

    const db = obtenerConexion();

    let criterio;

    if (letra != ''){
        criterio = { $or: [
            {album: album},
            {nombre: nombre},
            {artista: artista},
            {letra: {$regex : letra} }
        ]}
    }
    else{
        criterio = { $or: [
            {album: album},
            {nombre: nombre},
            {artista: artista}
        ]}
    }

    db.collection("metadata").find(criterio, { projection: { _id: 0, letra: 0 } })
    .toArray(function(err, result) {
        if (err) {
            console.log(err);
            return res.status(400).json({message: err.message});
        }
        return res.status(200).send(result);
      });
};

module.exports = {
    getCancion,
    postCancion,
    getAllCanciones,
    getLetra,
    deleteCancion,
    updateCancion, 
    buscarCancion
}

//Referencias: https://www.w3schools.com/nodejs/
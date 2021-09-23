const multer = require('multer');
const { obtenerConexion } = require('../database');
const { GridFSBucket, ObjectId } = require('mongodb');
const { Readable } = require('stream');

/**
 * Metodo para acceder a una canción específica
 * @param {*} req solicitud entrante donde se indica el Id
 * @param {*} res respuesta saliente
 * @returns un 200 ok con el audio en caso exitoso / un 400 en caso de error
 */
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

/**
 * Funcion para obtener una letra es
 * @param {*} req solicitud entrante donde se indica el Id
 * @param {*} res respuesta saliente
 * @returns un 200 ok con la letra en caso exitoso / un 400 en caso contrario.
 */
const getLetra = (req, res) => {
    let idCancion;

    // se verifica si lo ingresado pertenece a un
    // id de mongoDb
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

/**
 * Método para acceder un máximo de 20 canciones de la base de datos
 * @param {*} req solicitud entrante
 * @param {*} res respuesta saliente
 * @returns un 200 ok con las canciones en caso exitoso / un 400 en caso contrario.
 */
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

/**
 * Metodo para guardar una cancion en la base de datos
 * @param {*} req solicitud entrante de donde se accede el cuerpo de la petición
 * @param {*} res respuesta saliente
 * @returns un 200 ok en caso exitoso / un 400 o 500 en caso contrario.
 */
const postCancion = (req, res) => {
    const storage = multer.memoryStorage();
    const upload = multer({
        storage,
        limits: {
            fields: 4,
            fileSize: 8000000,
            files: 1,
            parts: 5
        }
    });

    //se trata de subir el archivo
    upload.single('track')(req, res, (err) => {
        if(err){
            console.log(err);
            return res.status(400).json({message: err.message});
        }
        else if (!req.body.name || !req.body.album ||
            !req.body.artista || !req.body.letra){
            return res.status(400).json({message: "Faltaron atributos para la cancion"});
        }
        
        //se acceden los atributos del cuerpo de la canción
        let nombreCancion = req.body.name;
        let album = req.body.album;
        let artista = req.body.artista;
        let letra = req.body.letra;

        const readableTrackStream = new Readable();
        readableTrackStream.push(req.file.buffer);
        readableTrackStream.push(null);

        //se conecta a la base de datos
        const db = obtenerConexion();
        const bucket = new GridFSBucket(db, {
            bucketName: 'canciones'
        });

        //se comienza la subida del audio
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

        //se verifica si existe un error subiendo el archivo
        uploadStream.on('error', () => {
            return res.status(500).json({ message: "Error subiendo el archivo" });
        });

        // cuando se finaliza la subida del audio
        uploadStream.on('finish', () => {
            // se inserta la metadata asociada en la base de datos
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

/**
 * Método para eliminar una canción
 * @param {*} req solicitud entrante de donde se accede al Id
 * @param {*} res respuesta saliente
 * @returns un 200 ok en caso exitoso / un 400 caso contrario.
 */
const deleteCancion = (req, res) => {
    let idCancion;
    
    
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

/**
 * Método para actualizar la metadata de una canción
 * @param {*} req solicitud entrante de donde se accede al body
 * @param {*} res respuesta saliente
 * @returns un 200 ok en caso exitoso / un 400 caso contrario.
 */
const updateCancion = (req, res) => {
    let idCancion;

    // se verifica si lo ingresado pertenece a un
    // id de mongoDb
    try {
        idCancion = new ObjectId(req.params.trackId);
    } catch (error) {
        return res.status(400).json({message: "Id invalido en la URL"})
    }

    // se obtiene la conexion con la base de datos
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

/**
 * Metodo para buscar canciones mediante un filtrado
 * @param {*} req solicitud entrante de donde se accede al body
 * @param {*} res respuesta saliente
 * @returns un 200 ok en caso exitoso / un 400 caso contrario.
 */
const buscarCancion = (req, res) => {
    var {letra, nombre, album, artista} = req.query;

    // se conecta a la base de datos
    const db = obtenerConexion();

    let criterio;

    //si la letra es NO vacía se aplica el siguiente criterio
    if (letra != ''){
        criterio = { $or: [
            {album: album.toString()},
            {nombre: nombre.toString()},
            {artista: artista.toString()},
            {letra: {$regex : letra.toString(), "$options" : "i"} }
        ]}
    } // si es vacía, entonces se aplica el siguiente criterio
    else{
        criterio = { $or: [
            {album: album.toString()},
            {nombre: nombre.toString()},
            {artista: artista.toString()}
        ]}
    }

    db.collection("metadata").find(criterio, { projection: { _id: 0, letra: 0 } })
    .collation( { locale: 'en', strength: 2 } )
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
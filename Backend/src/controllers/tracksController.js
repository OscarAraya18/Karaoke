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

const postCancion = (req, res) => {
    const storage = multer.memoryStorage();
    const upload = multer({
        storage,
        limits: {
            fields: 1,
            fileSize: 10000000,
            files: 1,
            parts: 2
        }
    });
    upload.single('track')(req, res, (err) => {
        if(err){
            console.log(err);
            return res.status(400).json({message: err.message});
        }
        else if (!req.body.name){
            return res.status(400).json({message: "No se agrego nombre a la cancion"});
        }
        
        let nombreCancion = req.body.name;

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

        uploadStream.on('error', () => {
            return res.status(500).json({ message: "Error subiendo el archivo" });
        });

        uploadStream.on('finish', () => {
            return res.status(200).json({ message: "Archivo subido satisfactoriamente. El id es: " + id });
        });
    });
};

module.exports = {
    getCancion,
    postCancion
}

//613047b39d4ccaaedd4e34b8
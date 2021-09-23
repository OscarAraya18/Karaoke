const { Router } = require('express');
const bodyParser = require('body-parser')
const router = Router();

// create application/json parser
var jsonParser = bodyParser.json()

const {getCancion, postCancion, 
    getAllCanciones, getLetra, 
    deleteCancion, updateCancion, buscarCancion} = require('../controllers/tracksController');

//se asocian las rutas del API con sus respectivos métodos
router.get('/tracks/:trackId', getCancion);

router.post('/tracks', jsonParser, postCancion);

router.get('/tracks/get/all', getAllCanciones);

router.get('/tracks/letra/:trackId', getLetra);

router.get('/tracks/find/criterio', buscarCancion)

router.delete('/tracks/:trackId', deleteCancion);

router.put('/tracks/:trackId', jsonParser, updateCancion);

module.exports = router;
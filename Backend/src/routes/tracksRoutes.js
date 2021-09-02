const { Router } = require('express');
const router = Router();

const {getCancion, postCancion} = require('../controllers/tracksController');

router.get('/tracks/:trackId', getCancion);

router.post('/tracks', postCancion);

module.exports = router;
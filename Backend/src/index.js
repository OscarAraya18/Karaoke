const express = require("express");
const morgan = require('morgan');
const cors = require('cors');

const trackRoutes = require('./routes/tracksRoutes')

//inicializaciones
const app = express();

app.set('port', process.env.PORT || 4000);

//middlewares
app.use(cors());
app.use(morgan('dev'));

//rutas
app.use(trackRoutes);

app.get('/hello', (req, res) => {
    res.send('Hello World!')
  })

// inicializando el servidor en http
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});


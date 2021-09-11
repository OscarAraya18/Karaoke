process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');
var fs = require('fs');
var FormData = require('form-data');

const app = require('../../src/index')
const { obtenerConexion } = require('../../src/database');


describe('POST /tracks', () => {
    before(() => {
        console.log("Se conecta a la base de datos de prueba");
        obtenerConexion();
    });

    after(() => {
      console.log("Se cierra conexion con la base de datos");
      obtenerConexion().close();
    });

    var file = fs.createReadStream('../Backend/test/api/mp3/test.mp3');

    it('OK, creando una cancion',  done => {
        request(app)
            .post('/tracks')
            .attach('track', file)
            .field('letra', "abcde")
            .field('album', "Album test")
            .field('artista', "Artist test")
            .field('name', 'track test')
            .expect(200)
            .end(err => {
                if(err) return done(err);
                done();
            })
    });
})
process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');
var fs = require('fs');

const app = require('../../src/index')
const { obtenerConexion } = require('../../src/database');


describe('POST /tracks', () => {

    let file = fs.createReadStream('../Backend/test/api/mp3/test.mp3');
    console.log(file);

    it('OK, creando una cancion',  done => {
        request(app)
            .post('/tracks')
            .attach('track', file)
            .field('letra', "abcde")
            .field('album', "Album test")
            .field('artista', "Artist test")
            .field('name', 'track test')
            .expect(200)
            .end((err) => {
                if(err) return done(err);
                done();
            })
    });

    it('Fail, se necesitan de todos los campos (incluido el archivo)',  done => {
      request(app)
          .post('/tracks')
          .field('album', "Album test")
          .field('artista', "Artist test")
          .field('name', 'track test')
          .expect(400)
          .expect({ message: 'Faltaron atributos para la cancion' })
          .end((err) => {
                if(err) return done(err);
                done();
          });
    });
});
process.env.NODE_ENV = 'test';

const app = require('../../src/index');
const request = require('supertest');
var fs = require('fs');

const { obtenerConexion } = require('../../src/database');

describe('POST /tracks', () => {
    
  before(function (done) {
      obtenerConexion();
      console.log('AAAAAAAAAAAAAAAAAA');
    });

    let file = fs.createReadStream('../Backend/test/api/mp3/test.mp3');

    it('OK, creando una cancion',  done => {
        request(app)
            .post('/tracks')
            .attach('track', file)
            .field('letra', "abcde")
            .field('album', "Album test")
            .field('artista', "Artist test")
            .field('name', 'track test')
            .on('progress', (e) => {
              console.log((e.loaded * 100) / e.total);
            })
            .expect(200)
            .end((err) => {
                if(err) return done(err);
                done();
            })
    });

    /*it('Fail, Error subiendo la cancion',  done => {
      request(app)
          .post('/tracks')
          .attach('track', file)
          .field('letra', "abcde")
          .field('album', "Album test")
          .field('artista', "Artist test")
          .field('name', 'track test')
          .expect(500)
          .expect({ message: "Error subiendo el archivo" })
          .end((err) => {
              if(err) return done(err);
              done();
          })
  });*/

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
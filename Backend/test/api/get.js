process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');
var fs = require('fs');

const app = require('../../src/index')
const { obtenerConexion } = require('../../src/database');


describe('GET /tracks/:trackId', () => {

    it('Fail, el id es invalido', (done) => {
        request(app)
            .get('/tracks/fdfds')
            .expect(400)
            .end((err) => {
                if(err) return done(err);
                done();
            })
    })
});

describe('GET /tracks/letra/:trackId', () => {

    it('Fail, el id es invalido', (done) => {
        request(app)
            .get('/tracks/letra/45641dsad')
            .expect(400)
            .end((err) => {
                if(err) return done(err);
                done();
            })
    })
});

describe('GET /tracks/get/all', () => {

    it('Fail, no existe la coleccion el la db', (done) => {
        request(app)
            .get('/tracks/get/all')
            .expect(500)
            .end((err) => {
                if(err) return done(err);
                done();
            })
    })
});

describe('GET /tracks/find/criterio', () => {

    it('Fail, no existe la coleccion el la db', (done) => {
        request(app)
            .get('/tracks/find/criterio?letra=&nombre=&album=&artista=Bad Bunny')
            .expect(500)
            .end((err) => {
                if(err) return done(err);
                done();
            });
    });
});
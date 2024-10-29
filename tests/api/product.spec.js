const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../src/app');
const Product = require('../../src/models/products_models');

describe('Api de productos', () => {

    beforeAll(async () => {
        //Conexión a la base de datos solo para estas pruebas. Tenemos que traer la librería arriba de mongoose y hacemos al misma conexión que en el otro lado
        await mongoose.connect('mongodb://127.0.0.1:27017/online-shop') // Antes de que se lancen todas las pruebas me conecto a la base de datos
    })

    afterAll(async () => {
        //Desconexión a la base de datos.
        await mongoose.disconnect();
    })

    describe('GET /api/products', () => {

        let response;
        beforeAll(async () => {
            //Como primer parámetro pide una aplicación de express, como la tenemos exportada en app.js, la importamos.
            // Si queremos probar una petición get, supertest nos da el metodo.(get)
            response = await request(app).get('/api/products').send();
        })

        it('Recibir status 200', () => { // Aquí lanzamos la prueba
            // Esto es como si le damos al send request del médoto, como si hacemos la petición en el request.
            //Ahora vemos si la respuesta nos da el status 200. Dentro del método espect colocamos el valor que queremos valorar.
            expect(response.statusCode).toBe(200);
        })
        it('Debería responder con un json', () => { // Comprueba si recibo un json
            // toContain comprobamos que en esa cabecera tiene que estar este tipo de caracteres.
            expect(response.headers['content-type']).toContain('application/json');
        })

        it('Debemos recibir un array', () => {
            expect(response.body).toBeInstanceOf(Array);
        }) // Lo que me devuelve es un array? TOBEINSTANCEOF para ver el tipo de objeto.
    })

    describe('POST /api/products', () => {

        let response;
        const body = { name: 'Lapiz', description: 'Verde', department: 'test', price: 5, stock: 200, available: true }
        beforeAll(async () => {
            response = await request(app).post('/api/products').send(body);
        });

        afterAll(async () => {
            // Para que la base de datos se quede igual.
            //Borrar todos los productos con department test
            await Product.deleteMany({ department: 'test' }) // Así se borra en mongoDB y así borramos todos los productos que hemos creado.
        })

        it('Debería funcionar la URL', () => {
            expect(response.statusCode).toBe(201);
            expect(response.headers['content-type']).toContain('application/json')
        })

        it('Comprobar que tenemos el _id en la respuesta', () => {
            expect(response.body._id).toBeDefined(); // Está definido en el body?
        })

        it('Los valores enviados son los mismos que se guardan', () => {
            expect(response.body.name).toBe(body.name);
            expect(response.body.description).toBe(body.description);
            expect(response.body.department).toBe(body.department);
            expect(response.body.price).toBe(body.price);
            expect(response.body.stock).toBe(body.stock);
            expect(response.body.available).toBe(body.available);
        })


    })

    describe('PUT /api/products/<PRODUCTID>', () => {

        let product;
        const body = { name: 'Lápiz verde', description: 'Pinta en verde', department: 'test', price: 14, stock: 200, available: true };
        beforeAll(async () => {
            // 1. Crear el producto que vamos a actualizar
            product = await Product.create(body);

            // 2. Lanzar la petición PUT sobre el producto anterior
            response = await request(app).put(`/api/products/${product._id}`).send({ price: 30, stock: 300 })
        });

        afterAll(async () => {
            // Borrar el producto creado para las pruebas
            await Product.findByIdAndDelete(product._id)

        });

        it('La URL debe funcionar', () => {
            expect(response.statusCode).toBe(200);
            expect(response.header['content-type']).toContain('application/json');
        })

        it('Debería tener los campos actualizados en la base de datos', () => {
            expect(response.body.price).toBe(30);
            expect(response.body.stock).toBe(300);

        })

    });

    describe('DELETE /api/products/<PRODUCTID>', () => {

        let product;
        let response;
        const body = { name: 'Lápiz verde', description: 'Pinta en verde', department: 'test', price: 14, stock: 200, available: true };
        beforeAll(async () => {
            // 1. Crear el producto que vamos a borrar
            product = await Product.create(body);

            // 2. Lanzamos la petición
            response = await request(app)
                .delete(`/api/products/${product._id}`)
                .send();
        });

        afterAll(async () => {
            // Borrar el producto creado para las pruebas
            await Product.findByIdAndDelete(product._id);
        });

        it('debería funcionar la URL', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('application/json');
        });

        it('el producto no debería existir en la BD', async () => {
            const productDeleted = await Product.findById(product._id);
            expect(productDeleted).toBeNull();
        });

    });


})



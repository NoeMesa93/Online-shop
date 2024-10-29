Carpeta test: Como vaoms a probar cosas relacionadas con nuestra api, creamos una carpeta api en test. Creamos el documento products.spec porque vamos a probar ahí todo lo relacionado con los productos.
Para organizarlo, hacemos grupos de pruebas con el metodo describe('') de jest.

Metodos hock o metodos del ciclo de vida de la prueba:
BeforeAll: Antes de que comiencen todas las pruebas. Recibe como parámetro función anonima que se ejecutará antes de todas las pruebas
BeforeEach: Primero se ejecuta el, luego una prueba, luego otra vez beforeEach y luego la prueba de nuevo, y así sucesivamente.

#########

Librería de mongoDB: mongoose
conectar aplicacion con mongoDB:

Crear una carpeta en src llamada config y dentro un fichero db.js. Aquí establecemos la conexión con la base de datos.
Si me quiero conectar llamamos al metodo connect y le pasamos la url de conexión. mongodb:///iplocal

Mongoose nos permite hacer un esquema fijo para cada uno de nuestro modelo (modelo de producto, por ejemplo), por lo tanto generamos schemas.

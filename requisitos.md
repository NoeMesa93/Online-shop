# API PRODUCTS

## Recuperar todos los productos

URL: /api/products
MÉTODO: GET
HEADER: X
BODY: X

Respuesta:

- Un array con todos los productos.

¿Qué podemos probar?

- Recibo status 200, ya me dice que la url existe.
- Recibo un JSON como respuesta.
- Recibo un array de objetos de productos.

## Creación de un producto

URL: /api/products
MÉTODO: POST
HEADER: X
BODY: name, description, departament, price, stock, available

Respuesta:

- El nuevo producto creado

¿Qué podemos probar?

- Que la URL funcione: status -> 201 y el content-type: application/json
- Comprobar que en la respuesta tenemos el \_id
- Comprobar que los campos que enviamos en el body son los que se guardan en el documento de la BD

## Más rutas:

- Get /api/products/<productId> - Retorna un producto a partir de su id
- GET /api/products/dpt/<dpartment> - Retornar todos los productos de un departamento
- Get /api/products/price?min=<minprice>&mmax=<maxprice> - Retorna los productos en un rango de precio
- GET /api/products/available - Retorna todos los productos disponibles y con stock mayor de 10
  1º - Metodo en controlador y ruta
  2º - min y max lo extraemos de la req.query

## Añadir producto al carrito

PUT host/api/users/add/<PRODUCTID>

## Obtener el perfil del ususario

GET /api/users/profile

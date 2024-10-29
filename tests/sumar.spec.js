function sumar(numA, numB) {
    return numA + numB;
}



// Permite agrupar diferentes pruebas pequeñas.
// Primero le pasamos una pequeña descripción, de segundo parámetro le pasamos una función vacía/anónima
describe('Test para la función sumar', () => {
    // Método test es igual al it. Esto ya es un test, aquí ya probamos cosas.
    // Le pasamos también descripción y en la arrowfunction le pasamos lo que queremos probar.
    it('la función sumar retorna la suma de dos números', () => {
        const resultado = sumar(4, 5); // Estamos probando la función sumar, jest lo hace por mí. Debo saber que el resultado de la operación es nueve, debemos saber el resultado de lo que queremos probar.
        expect(resultado).toBe(9) // Colocamos lo que queremos evaluar en expect. Tobe es lo que debería ser: 9
        expect(sumar(2, 3)).toBe(5)
    });

});
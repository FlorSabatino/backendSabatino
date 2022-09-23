
const Contenedor = require ('.containers/Container.js')

const ContenedorProductos = new Contenedor ("productos");

ContenedorProductos.getAll ()
.then ((data) => console.log ({data}))
.catch ((error) => console.log(error));

ContenedorProductos.save ({
    title: "Libro",
    precio: 1000
})
.then ((data) => console.log ({data}))
.catch ((error) => console.log(error));

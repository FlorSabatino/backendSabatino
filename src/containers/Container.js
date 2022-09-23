const fs = require ('fs')

class Contenedor {
    constructor (nombreArchivo) {
        this.rutaArchivo = `./${nombreArchivo}.json`;

    }
    async getAll() {
        try {
            const archivo = await fs.promises.readFile(this.rutaArchivo, 'utf8')
            const elementos = JSON.parse(archivo)

            return elementos;
        } catch (error) {
            console.log (error);
            if (error.code === 'ENOENT'){
                await fs.promises.writeFile(this.rutaArchivo, JSON.stringify([], null, 3));
            }
        }
    }
    async save (elemento) {
        try {
            const elementos = await this.getAll()

            const id = elementos.length ===0 ? 1 : elementos [ elementos.length-1].id + 1;

            elemento.id = id
            elementos.push (elemento)

            await fs.promises.writeFile(this.rutaArchivo, JSON.stringify([elementos], null, 3));

            return elemento.id

        } catch (error) {

            console.log(error)
            
        }
    } 
    async getById (id) {
        try {
            const elementos = await this.getAll ()
            const elementoEncontrado = elementos.find ((elemento) => elemento.id == id)

            if (!elementoEncontrado) return null
            return elementoEncontrado

        } catch (error) {
            console.log(error)
            
        }
    }
    async deleteById (id){
        try {
            const elementos = await this.getAll()
            const elementoEncontrado = elementos.find ((elemento) => elemento.id == id);

            if (!elementoEncontrado) return "Elemento no encontrado"
            
            const elementoFiltrado = elementos.filter((elemento)=> elemento.id != id)
            
            await fs.promises.writeFile(
                this.rutaArchivo,
                JSON.stringify(elementoFiltrado, null, 3)
            );
            
        } catch (error) {
            
        }
    }
    async deleteAll() {
        try {
            await fs.promises.writeFile(this.rutaArchivo, JSON.stringify([], null, 3));
        } catch (error) {
            console.log(error);
        }
    }
}

const ContenedorProductos = new Contenedor ("productos");

// ContenedorProductos.getAll().then(data => console.log({data})).catch(error => console.log({error}));

ContenedorProductos.getById(2)
.then((flor) => console.log ({flor}))
.catch((error) => console.log ({error}));


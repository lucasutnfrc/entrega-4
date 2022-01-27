//Para iniciar servidor
//npm install
//nodemon index.js

/* Modulos */
const express = require('express');
const bp = require('body-parser');

const router = express.Router();

/* Instancia Express */
const app = express();

/* Middlewares */
app.use(express.static('public'));
app.use(express.json());
app.use(bp.urlencoded({ extended: true }));

/* Productos */

const productos = [

];

/* Rutas */

router.get('/', (req, res) => {
    res.status(200).json(productos)
});

router.get('/:id', (req, res) => {
    if (productos.length > 0) {
        for (let i = 0; i < productos.length; i++) {
            if (productos[i].id == req.params.id) {
               return res.status(200).json(productos[i]);
            }
        }
    }
    res.status(404).json({error: 'Producto no encontrado'})
});

router.delete('/:id', (req, res) => {
    if (productos.length > 0) {
        for (let i = 0; i < productos.length; i++) {
            if (productos[i].id == req.params.id) {
                productos.splice(i, 1)
               return res.status(200).json({
                   msj: 'Producto eliminado',
                   productos: productos.length > 0 ? productos : 'No quedan productos cargados'
               });
            }
        }
    }
    res.status(404).json({error: 'Producto no encontrado'})
});

router.post('/', (req, res) => {
    let producto = req.body;
    if (productos.length > 0) {
        let ultimo = productos.length - 1
        
        producto['id'] = productos[ultimo].id + 1;
    } else {
        producto['id'] = 1;
    };
    console.log(productos);
    productos.push(producto)
    res.status(200).json({
        msj: 'Producto agregado',
        producto,
        productos
    })
});

router.put('/:id', (req, res) => {
    let producto = req.body
    let id = req.params.id;
    producto['id'] = id;

    if (productos.length > 0) {
        for (let i = 0; i < productos.length; i++) {
            if (productos[i].id == id) {
                productos[i] = producto;
                return res.status(200).json({
                    msj: 'Producto editado',
                    producto: producto,
                    productos
                });
            }
        }
    };
    res.status(404).json({error: 'Producto no encontrado'})

})

app.use('/api/productos', router);

/* Servidor */
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
server.on('error', err => {
    console.log('Error', err);
})
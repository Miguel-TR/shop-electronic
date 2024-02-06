const express = require('express');
const path = require('path');
const loginRoute = require('./routes/loginRoutes');
const productCartRoute = require('./routes/productCartRoutes');
const homeRoute = require('./routes/homeRoutes');
const productoRoute = require('./routes/productosRoutes');

const app = express();
const PORT = 3030;

// ACCESO A LOS ARCHIVOS DE LA CARPETA public 
const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

//TEMPLATE
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//ARCHIVOS STATIC
app.use(express.static('public'))
app.set('views', path.join(__dirname, './views'));

//ROUTES
app.use('/',loginRoute);

app.use('/', productCartRoute);

app.use('/', homeRoute);

app.use('/',productoRoute)
app.get('/detalleDeProducto',( req, res ) => {
  res.sendFile(path.join(__dirname, 'views/productDetail.html'))
});

app.get('/header_and_footer', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/header_and_footer.html'))
});


/*app.get('/crear-cuenta', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/productCart.html'))
});*/

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
})
const express = require('express');
const path = require('path');

const homeRoute = require('./routes/homeRoutes');
const aboutRoute = require('./routes/aboutRoutes');
const loginRoute = require('./routes/loginRoutes');
const productCartRoute = require('./routes/productCartRoutes');
const productDetailRoute = require('./routes/productDetailRoutes');

const app = express();
const PORT = 3030;

// ACCESO A LOS ARCHIVOS DE LA CARPETA public 
const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

// TEMPLATE ENGINE (MOTOR DE PLANTILLAS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ARCHIVOS STATIC
app.use(express.static('public'))
app.set('views', path.join(__dirname, './views'));

// ROUTES
app.use('/', homeRoute);

app.use('/', loginRoute);

app.use('/', productCartRoute);

app.use('/', aboutRoute);

app.use('/', productDetailRoute);



app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
})
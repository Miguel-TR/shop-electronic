// ************ Require's ************
const express = require('express');
const path = require('path');
const methodOverride = require('method-override'); // Pasar poder usar los métodos PUT y DELETE
const session = require('express-session');
const cookieParser = require('cookie-parser');

//const homeRoute = require('./routes/homeRoutes');
const aboutRoute = require('./routes/aboutRoutes');
const loginRoute = require('./routes/loginRoutes');
const productCartRoute = require('./routes/productCartRoutes');
const productRoute = require('./routes/productRoutes');
const userRoute = require('./routes/userRoutes');
const contactRoute = require('./routes/contactRoutes');

const productRoutesAPIs = require('./routes/api/productRoutes');

// ************ express() - (don't touch) ************
const app = express();
const PORT = 3030;

// ************ Middlewares - (don't touch) ************
app.use(express.static(path.join(__dirname, '../public')));  // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false }));//nos permite trabajar con formularios con metodo post
app.use(express.json());//nos permite trabajar con formularios con meotodo post
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(session({ secret: 'grupo-09' }));
app.use(cookieParser());
// ACCESO A LOS ARCHIVOS DE LA CARPETA public 
//const publicPath = path.resolve(__dirname, './public');
//app.use(express.static(publicPath));

// TEMPLATE ENGINE (MOTOR DE PLANTILLAS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// ARCHIVOS STATIC
app.use(express.static('public'))
app.set('views', path.join(__dirname, './views'));

// ************ Route System require and use() ************
const homeRouter = require('./routes/homeRoutes'); // Rutas main

// ROUTES
app.use('/', homeRouter);
app.use('/products', productRoute);
// app.use('/', loginRoute); rutas incluidas en userRoute
app.use('/', productCartRoute);
app.use('/', aboutRoute);
app.use('/', userRoute)
app.use('/', contactRoute);

// Routes APIs
app.use('/api/products', productRoutesAPIs);


app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
})

// conexion con la base de datos 
app.use(session({
  secret: 'secret',
  resave: false, // Agrega esta línea
  saveUninitialized: false, // Agrega esta línea
}));

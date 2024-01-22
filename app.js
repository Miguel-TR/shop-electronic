const express = require('express');
const path = require('path')

const app = express();
const PORT = 3030;

// ACCESO A LOS ARCHIVOS DE LA CARPETA public 
const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

app.use(express.static('public'))
app.set('views', path.join(__dirname, './views'));

app.get('/',( req, res ) => {
  const pathHome = path.join(__dirname, 'views/home.html')
  res.sendFile(pathHome)
});
app.get('/detalleDeProducto',( req, res ) => {
  res.sendFile(path.join(__dirname, 'views/productDetail.html'))
});

app.get('/header_and_footer', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/header_and_footer.html'))
});

app.get('/iniciar-sesion', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/login.html'));

});

app.get('/crear-cuenta', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/register.html'))
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
})
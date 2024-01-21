const express = require('express');
const app = express();
const PORT = 3030;
const path = require('path')
app.use(express.static('public'))
app.set('views', path.join(__dirname, './views'));

app.get('/',( req, res ) => {
  const pathHome = path.join(__dirname, 'views/home.html')
  res.sendFile(pathHome)
});
app.get('/detalleDeProducto',( req, res ) => {
  res.sendFile(path.join(__dirname, 'views/productDetail.html'))
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
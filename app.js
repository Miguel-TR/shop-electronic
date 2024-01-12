const express = require('express');
const app = express();
const PORT = 3030;
app.use('/', (req, res) => {

});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
})
const app = require('./src/app');
const connectDB = require('./src/config/database');
const path = require('path');
const express = require('express');

const port = 3000;

const startServer = async () => {
  try {
    await connectDB();

    app.use(express.static(path.join(__dirname, '../front')));


    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../front/index.html'));
    })

    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    })
  } catch (error) {
    console.log('No se ha podido levantar el servidor', error);
    process.exit(1);
  }
}

startServer();




const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { Usuario, Vehiculo } = require('./app');

const app = express();
const port = process.env.PORT || 4250;
const url = 'mongodb://127.0.0.1/parqueadero';

function crearVehiculo() {
    const placa = document.getElementById('placa').value;
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const tipo_vehiculo = document.getElementById('tipo_vehiculo').value;
    const color = document.getElementById('color').value;
    const id_usuario = document.getElementById('id_usuario').value;
    const fecha_ingreso = document.getElementById('fecha_ingreso').value;
    const estado = document.getElementById('estado').value;
  
    const data = {
      placa,
      marca,
      modelo,
      tipo_vehiculo,
      color,
      id_usuario,
      fecha_ingreso,
      estado
    };
  
    fetch('http://localhost:4250/vehiculos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resultados => console.log(resultados))
      .catch(error => console.error(error));
  }
  
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log('CONECTADO A LA BASE DE DATOS DEL PARQUEADERO'))
    .catch((e) => console.log('El error de conexión es:' + e));
  
  app.use(cors());
  app.use(bodyParser.json());
  
  app.get('/vehiculos', async (req, res) => {
    const vehiculos = await Vehiculo.find().populate('id_usuario');
    res.send(vehiculos);
  });
  
  app.post('/vehiculos', async (req, res) => {
    const { placa, marca, modelo, tipo_vehiculo, color, id_usuario, fecha_ingreso, estado } = req.body;
    const vehiculo = new Vehiculo({
      placa,
      marca,
      modelo,
      tipo_vehiculo,
      color,
      id_usuario,
      fecha_ingreso: fecha_ingreso ? new Date(fecha_ingreso) : new Date(),
      estado,
    });
    const resultados = await vehiculo.save();
    res.send(resultados);
  });
  
  app.put('/vehiculos/:id', async (req, res) => {
    const { id } = req.params;
    const { placa, marca, modelo, tipo_vehiculo, color, id_usuario, fecha_ingreso, estado } = req.body;
    const vehiculo = await Vehiculo.updateOne({ _id: id }, {
      $set: {
        placa,
        marca,
        modelo,
        tipo_vehiculo,
        color,
        id_usuario,
        fecha_ingreso: fecha_ingreso ? new Date(fecha_ingreso) : new Date(),
        estado,
      }
    });
    res.send(vehiculo);
  });
  
  app.delete('/vehiculos/:id', async (req, res) => {
    const { id } = req.params;
    const vehiculo = await Vehiculo.deleteOne({ _id: id });
    res.send(vehiculo);
  });
  app.listen(port, () => console.log(`SERVIDOR INICIADO EN EL PUERTO ${port}`));
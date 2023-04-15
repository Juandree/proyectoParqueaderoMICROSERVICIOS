const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { Usuario, Vehiculo } = require('./app');

const app = express();
const port = process.env.PORT || 4250;
const url = 'mongodb://127.0.0.1/parqueadero';

//
function crearUsuario() {
  const nombre_completo = document.getElementById('nombre_completo').value;
  const correo_electronico = document.getElementById('correo_electronico').value;
  const contrasena = document.getElementById('contrasena').value;
  const numero_telefono = document.getElementById('numero_telefono').value;
  const direccion = document.getElementById('direccion').value;
  const tipo_cliente = document.getElementById('tipo_cliente').value;
  const fecha_registro = document.getElementById('fecha_registro').value;
  const estado_cuenta = document.getElementById('estado_cuenta').value;

  const data = {
    nombre_completo,
    correo_electronico,
    contrasena,
    numero_telefono,
    direccion,
    tipo_cliente,
    fecha_registro,
    estado_cuenta
  };

  fetch('http://localhost:4250/usuarios', {
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
//
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('CONECTADO A LA BASE DE DATOS DEL PARQUEADERO'))
  .catch((e) => console.log('El error de conexión es:' + e));

app.use(cors());
app.use(bodyParser.json());

app.get('/usuarios', async (req, res) => {
  const personas = await Usuario.find();
  res.send(personas);
});

app.post('/usuarios', async (req, res) => {
  const { nombre_completo, correo_electronico, contrasena, numero_telefono, direccion, tipo_cliente, fecha_registro, estado_cuenta } = req.body;
  const personas = new Usuario({
    nombre_completo,
    correo_electronico,
    contrasena,
    numero_telefono,
    direccion,
    tipo_cliente,
    fecha_registro: fecha_registro ? new Date(fecha_registro) : new Date(),
    estado_cuenta,
  });
  const resultados = await personas.save();
  res.send(resultados);
});

app.put('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre_completo, correo_electronico, contrasena, numero_telefono, direccion, tipo_cliente, fecha_registro, estado_cuenta } = req.body;
  const personas = await Usuario.updateOne({ _id: id }, {
    $set: {
      nombre_completo,
      correo_electronico,
      contrasena,
      numero_telefono,
      direccion,
      tipo_cliente,
      fecha_registro: fecha_registro ? new Date(fecha_registro) : new Date(),
      estado_cuenta,
    }
  });
  res.send(personas);
});
app.listen(port, () => console.log(`SERVIDOR INICIADO EN EL PUERTO ${port}`));

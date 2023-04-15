const mongoose = require ('mongoose')
const { Schema, ObjectId } = mongoose;

const url= 'mongodb://127.0.0.1/parqueadero'

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
  })
.then(()=> console.log('CONECTADO A LA BASE DE DATOS DEL PARQUEADERO'))
.catch((e)=> console.log('El error de conexión es:'+e))

// Esquema de usuarios
const usuariosSchema = new Schema({
    nombre_completo: String,
    correo_electronico: String,
    contrasena: String,
    numero_telefono: String,
    direccion: String,
    tipo_cliente: String,
    fecha_registro: Date,
    estado_cuenta: String,
  });
  
  // Esquema de vehículos
  const vehiculosSchema = new Schema({
    placa: String,
    marca: String,
    modelo: String,
    color: String,
    id_usuario: {
      type: ObjectId,
      ref: 'usuarios',
    },
  });
  

  
  // Creación de los modelos
  // Este código crea modelos de datos utilizando mongoose para interactuar con la base de datos.

  const Usuario = mongoose.model('usuarios', usuariosSchema);
  const Vehiculo = mongoose.model('vehiculos', vehiculosSchema);

  /*
Este bloque de código exporta varios módulos del archivo actual para que 
puedan ser utilizados en otros archivos. Los módulos que se están exportando 
son Usuario, Vehiculo.
*/

  module.exports = {
    Usuario,
    Vehiculo,
  };
///////////////////////////////////USUARIOS///////////////////////////////////////////
//Mostrar

const mostrar = async ()=>{
    const personas = await Usuario.find()
    console.log(personas)
}

//crear

const crear = async ()=>{
    const personas = new Usuario({
        
        nombre_completo: 'Jesus Casanare',
        correo_electronico: 'Jesus Casanare@gmail.com',
        contrasena: 'sajdwuasduhuawd',
        numero_telefono: '3117228345',
        direccion: 'Calle 4 #1 45',
        tipo_cliente: 'Estudiante',
        fecha_registro: new Date(),     
        estado_cuenta: 'Activa'

    })
    const resultados = await personas.save()
    console.log(resultados)
}

//editar

const editarUsuario = async (id)=>{
    const personas = await Usuario.updateOne({_id:id},
    {
        $set:{
            nombre_completo: 'Juan Carlos',
        correo_electronico: 'juanoedit@gmail.com',
        contrasena: 'DJ1!',
        numero_telefono: '3167107400',
        direccion: 'Calle 71 AN #1 41 Matamoros',
        tipo_cliente: 'Normal',
        fecha_registro: new Date(),     
        estado_cuenta: 'Activa'
        
        }

    })
    console.log(personas)
}

//borrar

const eliminarUsuario = async (id)=>{
    const personas = await Usuario.deleteOne({_id:id})
    console.log(personas)

}


//crear()
//mostrar()
//editarUsuario('641d141e7be1207e80145db6')
//eliminarUsuario('641d141e7be1207e80145db6')

/////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////VEHICULOS///////////////////////////////////////////

//MOSTRAR
const mostrarVehiculos = async()=>{
    const vehiculosc = await Vehiculo.find()
    console.log(vehiculosc)
}

//CREAR
const crearVehiculo = async () => {
  const usuario = await Usuario.findOne(); // Se busca un usuario en la base de datos

  const vehiculo = new Vehiculo({
    placa: 'ABC-453',
    marca: 'Audi',
    modelo: 'Corolla',
    color: 'Blanco',
    id_usuario: usuario._id, // Se asigna el ID del usuario como llave foránea
  });

  const resultado = await vehiculo.save();
  console.log(resultado);
};

//editar

const editarVehiculo = async (id)=>{
  const vehiculosc = await Vehiculo.updateOne({_id:id},
  {
      $set:{
        placa: 'CUR244',
        marca: 'AUDI',
        modelo: 'R6',
        color: 'ROJO',
      
      }

  })
  console.log(Vehiculo)
}
//borrar

const eliminarVehiculo = async (id)=>{
  const vehiculosc = await Vehiculo.deleteOne({_id:id})
  console.log(vehiculosc)

}

//mostrarVehiculos()
//crearVehiculo()
//editarVehiculo('6419058a6e66658a37bc6fa3')
//eliminarVehiculo('6419058a6e66658a37bc6fa3')

/////////////////////////////////////////////////////////////////////////////////////////
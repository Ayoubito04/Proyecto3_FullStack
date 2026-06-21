//Aquí vamos a crear la conexión con la base de datos,para eso necesitamos instalar mongoose,
//Una vez que tengamos mongoose, necesitamos crear una instancia de mongoose
const mongoose=require('mongoose');
//También necesitamos importar dotenv para poder usar las variables de entorno
const dotenv=require('dotenv');
//Una vez que tengamos mongoose, necesitamos crear una instancia de mongoose
const connectDB=async()=>{
    try{
        //Primero vamos a abrir un try catch para manejar los errores
        //Además traeremos la varieble de entorno que contiene la URI de la base de datos, para eso necesitamos importar dotenv
       
        await mongoose.connect(process.env.Mongo_URI)
        console.log('MongoDB connected ✅')
    }catch(error){
        console.log(error)
    }
}
module.exports=connectDB;
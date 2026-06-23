const mongoose = require('mongoose');
const { Schema } = mongoose;

const gameSchema=new Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
title:{
    type:String,
    required:true
},
genre:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
},
price:{
    type:Number,
    required:true
},
image:{
    type:String,
    required:true
},
releaseDate:{
    type:Date,
    required:true
},
developer:{
    type:String,
    required:true
},
publisher:{
    type:String,
    required:true
},
rating:{
    type:Number,
    required:true
},
platform:{
    type:String,
    required:true
},
minspecs:{
    os:{
        type:String
    },
     cpu: { type: String },
        ram: { type: Number },
        gpu: { type: String },
        storage: { type: Number }
},
   recSpecs: {
        os: { type: String },
        cpu: { type: String },
        ram: { type: Number },
        gpu: { type: String },
        storage: { type: Number }
    }
},{
    timestamps:true

})
//Ahora toca exportar el modelo, para eso necesitamos usar el método model de mongoose, el primer parámetro es el nombre del modelo y el segundo parámetro es el esquema que acabamos de crear
const Game=mongoose.model("Game",gameSchema);

module.exports=Game;

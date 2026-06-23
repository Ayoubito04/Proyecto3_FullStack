//Ahora vamos a crear las rutas para los juegos, para eso necesitamos usar el método Router de express
const express=require('express');
const router=express.Router();
const {GetAllGames,FilterGames}=require('../controllers/Games.controller');
router.get('/',GetAllGames);
router.get('/filter',FilterGames);

module.exports=router;
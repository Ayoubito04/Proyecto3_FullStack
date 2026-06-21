//Vamos a crear una ruta para registrar un usuario, para eso necesitamos crear una carpeta llamada routes y dentro de ella un archivo llamado Users.route.js
const express=require('express');
const router=express.Router();
const {registerUser}=require('../controllers/auth/Register');
const {loginUser}=require('../controllers/auth/Login');
const {EditUser,DeleteUser}=require('../controllers/Users.controller');
const {verifyToken}=require('../middlewares/auth.middleware');

//Rutas públicas
router.post('/registro',registerUser);
router.post('/login',loginUser);

//Rutas protegidas (requieren token)
router.put('/edit/:id',verifyToken,EditUser);//Estas se tienen que indicar el id,para saber  que usuario se tiene que modificar
router.delete('/delete/:id',verifyToken,DeleteUser);


module.exports=router;

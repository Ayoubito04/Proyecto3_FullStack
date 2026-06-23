//Aquí vamos a implementar las rutas para los reviews, para eso necesitamos usar el método Router de express
const express=require('express');
const router=express.Router();
//El usuario también tiene que estar verificado
const {verifyToken}=require('../middlewares/auth.middleware');
const {createReview,getReviewsByGame,DeleteReview}=require('../controllers/Reviews.controller');
//Una vez que tengamos el controlador, vamos a crear las rutas para los reviews, para eso necesitamos usar el método post de express
router.post('/:gameId',verifyToken,createReview);
router.get('/:gameId',getReviewsByGame);
router.delete('/:reviewId',verifyToken,DeleteReview);
module.exports=router;
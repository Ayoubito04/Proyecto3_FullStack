//Vamos a ir con las Reviews, para eso necesitamos crear un archivo llamado Reviews.controller.js dentro de la carpeta controllers
const Reviews=require('../models/Reviews');
const Games=require('../models/Games');
const Usuario=require('../models/Users');

//Función para crear una rewview
const createReview=async(req,res)=>{
    try{
        const {gameId}=req.params;
        const {rating,comment}=req.body;
        const game=await Games.findOne({id:parseInt(gameId)});
        if(!game){
            return res.status(404).json({message:'Juego no encontrado'});
        }
        const user=await Usuario.findById(req.user.id);
        if(!user){
            return res.status(404).json({message:'Usuario no encontrado'});
        }
        //Verificamos si el usuario ya ha hecho una review para ese juego
        const existingReview=await Reviews.findOne({user:user._id,game:game._id});
        if(existingReview){
            return res.status(400).json({message:'El usuario ya ha hecho una review para este juego'});
        }
        const lastReview=await Reviews.findOne().sort({id:-1});
        const nextId=lastReview ? lastReview.id+1 : 1;
        const review=await Reviews.create({
            id:nextId,
            user:user._id,
            game:game._id,
            rating,
            comment
        });
        return res.status(201).json({message:'Review creada correctamente',review});
    }
    catch(error){
        return res.status(500).json({message:'Error del servidor',error:error.message});
    }

}

const getReviewsByGame=async(req,res)=>{
    try{
        const {gameId}=req.params;
        const game=await Games.findOne({id:parseInt(gameId)});
        if(!game){
            return res.status(404).json({message:'Juego no encontrado'});
        }
        const reviews=await Reviews.find({game:game._id}).populate('user','nombre avatar');
        if(reviews.length===0){
            return res.status(404).json({message:'No se encontraron reviews para este juego'});
        }
        return res.status(200).json(reviews);
    }catch(error){
        return res.status(500).json({message:'Error del servidor',error:error.message});

    }
}
const DeleteReview=async(req,res)=>{
    try{
        const {reviewId}=req.params;
        const review=await Reviews.findOne({id:parseInt(reviewId)});
        if(!review){
            return res.status(404).json({message:'Review no encontrada'});
        }
        //Verificamos si el usuario es el dueño de la review
        if(review.user.toString()!==req.user.id){
            return res.status(403).json({message:'No tienes permiso para eliminar esta review'});
        }
        await Reviews.findOneAndDelete({id:parseInt(reviewId)});
        return res.status(200).json({message:'Review eliminada correctamente'});
    }catch(error){
        return res.status(500).json({message:'Error del servidor',error:error.message});
    }
}

module.exports={createReview,getReviewsByGame,DeleteReview};
const Usuario=require('../models/Users');

const DeleteUser=async(req,res)=>{
    try{
        const user=await Usuario.findById(req.params.id);
        if(!user){
            return res.status(404).json({message:'Usuario no encontrado'});
        }
        await Usuario.findByIdAndDelete(req.params.id);
        return res.status(200).json({message:'Usuario eliminado correctamente'});
    }catch(error){
        return res.status(500).json({message:'Error del servidor'});
    }
}
const EditUser=async(req,res)=>{
    try{
        const user=await Usuario.findById(req.params.id);
        if(!user){
            return res.status(404).json({message:'Usuario no encontrado'});
        }
        //Si el usuario no existe,no se podrán editar los datos, para eso necesitamos usar el método findByIdAndUpdate de mongoose
        const updatedUser=await Usuario.findByIdAndUpdate(req.params.id,req.body,{new:true});
        return res.status(200).json({message:'Usuario actualizado correctamente',updatedUser});
    }catch(error){
        return res.status(500).json({message:'Error del servidor'});

    }
}


module.exports={DeleteUser, EditUser};
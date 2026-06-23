//Aquí vamos a definir la lógica de los juegos,para eso vamos a importar el modelo de juegos que acabamos de crear
const Games=require('../models/Games');

//Ahora vamos a crear la función que nos permite obtener todos los juegos, para eso necesitamos usar el método find de mongoose
const GetAllGames=async(req,res)=>{
    try{
        const games=await Games.find();
        if(games.length===0){
            return res.status(404).json({message:'No se encontraron juegos'});
        }
        return res.status(200).json(games);
    }catch(error){
        return res.status(500).json({message:'Error del servidor'});
    }
}

//Esto es para filtrar por titulo,plataforma y genero
const FilterGames=async(req,res)=>{
      //Vamos a filtrar los juegos por título, género y plataforma, para eso necesitamos usar el método find de mongoose
      try{
        //Vamos a filtrar todos los juegos que contengan el título, género y plataforma que nos pasan por query params, para eso necesitamos usar el método find de mongoose
        const {title,genre,platform,minOs,minCpu,minGpu,minRam,minStorage,recOs,recCpu,recGpu,recRam,recStorage}=req.query;
        const filter={};
        if(title)    filter.title={$regex:title,$options:'i'};
        if(genre)    filter.genre={$regex:genre,$options:'i'};
        if(platform) filter.platform={$regex:platform,$options:'i'};
        // Specs mínimas
        if(minOs)      filter['minspecs.os']={$regex:minOs,$options:'i'};
        if(minCpu)     filter['minspecs.cpu']={$regex:minCpu,$options:'i'};
        if(minGpu)     filter['minspecs.gpu']={$regex:minGpu,$options:'i'};
        if(minRam)     filter['minspecs.ram']={$lte:parseInt(minRam,10)};
        if(minStorage) filter['minspecs.storage']={$lte:parseInt(minStorage,10)};
        // Specs recomendadas
        if(recOs)      filter['recSpecs.os']={$regex:recOs,$options:'i'};
        if(recCpu)     filter['recSpecs.cpu']={$regex:recCpu,$options:'i'};
        if(recGpu)     filter['recSpecs.gpu']={$regex:recGpu,$options:'i'};
        if(recRam)     filter['recSpecs.ram']={$lte:parseInt(recRam,10)};
        if(recStorage) filter['recSpecs.storage']={$lte:parseInt(recStorage,10)};
        //Ahora vamos a buscar los juegos que cumplan con el filtro que acabamos de crear, para eso necesitamos usar el método find de mongoose
        const games=await Games.find(filter);
         if(games.length===0){
            return res.status(404).json({message:'No se encontraron juegos con los filtros proporcionados'});
         }

        return res.status(200).json(games);


      }catch(error){
        return res.status(500).json({message:'Error del servidor'});
      }
}

module.exports={GetAllGames,FilterGames};
module.exports={GetAllGames,FilterGames};

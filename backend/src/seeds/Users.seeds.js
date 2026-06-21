const mongoose=require('mongoose');
const fs=require('fs');
const path=require('path');
const bcrypt=require('bcrypt');
const dotenv=require('dotenv');
const Usuario=require('../models/Users');
dotenv.config({path:path.join(__dirname,'../../.env')});

const seedUsers=async()=>{
    try{
        await mongoose.connect(process.env.Mongo_URI);
        const csvData=fs.readFileSync(path.join(__dirname,'../data/CSV/Users.csv'),'utf-8');
        const lines=csvData.trim().split('\n');
        const headers=lines[0].split(',').map(h=>h.replace(/"/g,'').trim());
        const users=lines.slice(1).map(line=>{
            const values=line.split(',');
            return {
                nombre:values[1]?.trim(),
                email:values[2]?.trim(),
                avatar:values[3]?.trim(),
                city:values[4]?.trim(),
                country:values[5]?.trim(),
                bio:values[6]?.trim(),
                password:values[8]?.trim()
            };
        });
        for(const user of users){
            const salt=await bcrypt.genSalt(10);
            const hashedPassword=await bcrypt.hash(user.password,salt);
            user.password=hashedPassword;
        }
        await Usuario.insertMany(users);
        console.log('Usuarios insertados correctamente ✅');
        process.exit();
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}

seedUsers();



//Aquí vamos a traer todos los videojuegos del excel y lo vamos a pasar a csv para poder importarlos a la base de datos, para eso necesitamos instalar xlsx
const xlsx=require('xlsx');
const fs=require('fs');
const path=require('path');

const workbook=xlsx.readFile(path.join(__dirname,'../data/Excel/videojuegos.xlsx'));
//Una vez que tengamos el excel, necesitamos obtener la primera hoja del excel
const sheets=["Games","Users","Reviews"];
sheets.forEach((sheetName)=>{
    const worksheet=workbook.Sheets[sheetName];
    const csvData=xlsx.utils.sheet_to_csv(worksheet);
    fs.writeFileSync(path.join(__dirname,`../data/CSV/${sheetName}.csv`),csvData);
    console.log(`Archivo ${sheetName}.csv creado correctamente ✅`);
});

    

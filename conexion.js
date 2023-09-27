let mysql = require("mysql");
function conectarBD(){
    let conexion = mysql.createConnection({
            host: "localhost",
            database: "tavo_foro",
            user: "root",
            password: ""
    });
    return conexion;
}
module.exports = {
    conectarBD, // Exporta la función para que esté disponible en otros archivos
  };
/*
conexion.connect(function(err){
    if(err){
        throw err;
    }else{
        console.log("Conexion exitosa");
    }
});

conexion.end();*/
const { promiseImpl } = require("ejs");
const {MongoClient} = require("mongodb");

//const urlConexion = "mongodb+srv://user:1998@clase.pte5gu8.mongodb.net/";

const urlConexion = process.env.Mongo_url;

function conectar(){
    return MongoClient.connect(urlConexion);

}

function colores(){
    return new Promise(async callback => {
        let conexion = await conectar();
        let coleccion = conexion.db("colores").collection("colores");
        let colores = await coleccion.find({}).toArray();
        conexion.close();
        callback(colores);
    });
}
module.exports = {colores};
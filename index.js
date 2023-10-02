const express = require("express");
const cors = require("cors");
const {colores} = require("./db");
const {MongoClient} = require("mongodb");

const urlConexion = "mongodb+srv://user:1998@clase.pte5gu8.mongodb.net/";

let puerto = process.env.PORT || 4000;

const servidor = express();

servidor.use(cors());

servidor.use("/prueba", express.static("./estaticos"));
servidor.get("/", async(peticion,respuesta) => {
   const ColorModel = MongoClient.model("Color", {
      name: String,
   });

   try {
      const colores = await ColorModel.find();
      const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
      respuesta.json(colorAleatorio);
    } catch (error) {
      respuesta.status(500).json({ error: "Error al obtener el color desde MongoDB" });
    }
  });


 servidor.use((ppeticion,respuesta) => {
    respuesta.status(404);
    respuesta.send("not found...");
 });



servidor.listen(puerto);
import express from "express"; //SE IMPORTA EXPRES se asigna a una constante
import router from "./routes/index.js"; //se importa el archivo de rutas
import db from "./config/db.js"; //se importa la base de datos


console.log(process.env.DB_HOST);
const app = express(); //esto es na funcion de express que se ejecuta

//conectar la base de datos
db.authenticate()
  .then(() => console.log("Base de datos conectada"))
  .catch((error) => console.log(error));

//definir puerto
const port = process.env.PORT || 3000;

//habilitar pug
app.set("view engine", "pug"); //se usa el motor de plantillas pug

//obtener el año actual
app.use((req, res, next) => {
  //se crea un middleware
  const year = new Date(); //se crea una variable con la fecha actual
  res.locals.actualYear = year.getFullYear(); //se crea una variable local para usar en el html
  res.locals.nombresitio = "Agencia de Viajes"; //se crea una variable local para usar en el html
  next(); //se usa next para que continue con el siguiente middleware
});

//agregar body parser para leer los datos del formulario
app.use(express.urlencoded({ extended: true }));  

//definir carpeta publica
app.use(express.static("public")); //se usa la carpeta publica de las imagenes
//agregar router
app.use("/", router); //use soporta todos los verbos http y los trae del archivo de rutas

app.listen(port, () => {
  //arrancar el servidor
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});

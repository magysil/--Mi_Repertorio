import {obtenerCanciones} from "../models/GetCanciones.js"

export const vistaHome = async (req,res) => {
    const canciones = await obtenerCanciones();
    res.render("home",{
        layout:"main",
        title: "Mi Repertorio",
        titleTabla:"Tabla Canciones",
        canciones: canciones 
        
       
    })
}
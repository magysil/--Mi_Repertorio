import {insertarCancion} from "../models/PostCanciones.js"
import {obtenerCanciones} from "../models/GetCanciones.js"
import { actualizarCancion } from "../models/PutCancionnes.js";
import { eliminarCancion } from "../models/DeleteCanciones.js";

 export const postCancion = async(req,res) =>{
  
    try {
        const response = await insertarCancion(req.body)
        console.log('salida',response)
        res.status(200).send(response);
    }catch (error) {
        console.error(error);
        res.status(500).send('Error al agregar la canción');
      }
} 

export const getCancion = async (req, res) => {
  try {
    const canciones = await obtenerCanciones();
    res.status(200).render('Home',{ 
     layout:"main",
     title: "Mi Repertorio",
     titleTabla: 'Lista de Canciones',
     canciones: canciones 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener las canciones');
  }
}

export const putCancion = async(req,res) => {
  const id = req.params.id
  const cancion = req.body
  try {
    const response = await actualizarCancion(id,cancion)
    res.status(200).json(response)
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar la canción');
  }
}

export const deleteCancion = async(req,res) => {
  const id = req.params.id
  try {
    const response = await eliminarCancion(id)
    console.log(response)
    res.status(200).json({ message: 'Canción eliminada correctamente' })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la canción' });
  }
}

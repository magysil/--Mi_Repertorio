import pool from '../config/db.js';

export const actualizarCancion = async(id,cancion) =>{
    let client 
    const {titulo,artista,tono} = cancion
    const queryActualizar = {
        name : 'put-cancion',
        text: "UPDATE canciones SET titulo = $1, artista = $2, tono = $3 WHERE id = $4 RETURNING *;",
        values: [titulo, artista, tono, id]
    }
    try {
        client = await pool.connect();
        const result = await client.query(queryActualizar);
        console.log(result.rows)
        return result.rows
    } catch(error){
        return console.error("Error de conexión o cosulta", error.code, error.message);
    }finally{
        if(client){
            client.release()
        }
    }
}
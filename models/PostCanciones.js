import pool from '../config/db.js';

export const insertarCancion = async(cancion) =>{
    let client 
    const values = Object.values(cancion)
    const queryAgregar = {
        name : 'add-cancion',
        text: "INSERT INTO canciones (titulo, artista, tono) VALUES ($1, $2, $3) RETURNING *;",
        values
    }
    try {
        client = await pool.connect();
        const result = await client.query(queryAgregar);
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



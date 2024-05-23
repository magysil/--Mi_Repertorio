import pool from '../config/db.js';

export const eliminarCancion = async(id) =>{
    let client 
    const queryEliminar ={
        name:'delete-cancion',
        text:'DELETE FROM canciones WHERE id = $1 RETURNING *',
        values: [id]
    }
    try {
        client = await pool.connect();
        const result = await client.query(queryEliminar);
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
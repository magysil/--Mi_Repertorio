import pool from '../config/db.js';

export const obtenerCanciones = async () => {
    let client;
    const queryObtener = {
      name: 'get-canciones',
      text: "SELECT * FROM canciones ORDER BY id;"
    };
    try {
      client = await pool.connect();
      const result = await client.query(queryObtener);
      return result.rows;
    } catch (error) {
      console.error("Error de conexión o consulta", error.code, error.message);
    } finally {
      if (client) {
        client.release();
      }
    }
  };
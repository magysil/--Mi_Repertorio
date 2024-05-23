document.addEventListener("DOMContentLoaded", () => {
  const cancionInput = document.getElementById("cancion");
  const artistaInput = document.getElementById("artista");
  const tonoInput = document.getElementById("tono");
  const botonAgregar = document.getElementById("agregar");
  const botonEditar = document.getElementById("editar");
  botonAgregar.style.display = "block";
  botonEditar.style.display = "none";

  //Evento Click del boton editar de la tabla canciones
  document.querySelectorAll(".btn-editar").forEach((button) => {
    button.addEventListener("click", (event) => {
      const row = event.target.closest("tr"); 
      const id = row.querySelector("td:first-child").textContent; 
      const titulo = row.querySelector("td:nth-child(2)").textContent; 
      const artista = row.querySelector("td:nth-child(3)").textContent; 
      const tono = row.querySelector("td:nth-child(4)").textContent; 

    // Rellenar el formulario de agregar con los datos de la canción a editar
      cancionInput.value = titulo;
      artistaInput.value = artista;
      tonoInput.value = tono;

      botonAgregar.style.display = "none";
      botonEditar.style.display = "block";
      botonEditar.dataset.id = id;
    });
  });

  //Solicitud POST
  document.getElementById("agregar").addEventListener("click", async (e) => {
    e.preventDefault();
    const cancion = cancionInput.value;
    const artista = artistaInput.value;
    const tono = tonoInput.value;

    if (!cancion || !artista || !tono) {
        showAlert('Por favor, llene todos los campos.', 'warning');
        return;
      }
      
    try {
      const nuevaCancion = {
        titulo: cancion,
        artista: artista,
        tono: tono,
      };

      const response = await axios.post("/cancion", nuevaCancion);

      if (response.status == 200) {
        console.log("Canción agregada correctamente", response);
        cancionInput.value = "";
        artistaInput.value = "";
        tonoInput.value = "";
        window.location.href = "/canciones";
      }else {
        console.error("Error al agregar la canción");
      }
    }catch (error) {
      console.error("Error al enviar datos:", error);
    }
  });

  //Solicitud PUT
  botonEditar.addEventListener("click", async () => {
    const id = botonEditar.dataset.id;
    const cancion = cancionInput.value;
    const artista = artistaInput.value;
    const tono = tonoInput.value;

    try {
      const response = await axios.put(`/cancion/${id}`, {
        titulo: cancion,
        artista: artista,
        tono: tono,
      });

      if (response.status === 200) {
        console.log("Canción editada correctamente");

     // Limpiar los campos del formulario de edición
        cancionInput.value = "";
        artistaInput.value = "";
        tonoInput.value = "";
        window.location.reload(); 

        
      } else {
        console.error("Error al editar la canción");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  });
});

//Solicitud DELETE
document.querySelectorAll('.btn-eliminar').forEach(btn =>{
    btn.addEventListener('click', async() =>{
    const row = btn.closest('tr');
    const id = row.dataset.id;
    console.log(id);

        try{
            const response = await axios.delete(`/cancion/${id}`)
            if(response.status === 200){
                const message = response.data.message;
                console.log(message);
                showAlert(message, 'success');
                row.remove();
            }else{
                const message = response.data.message;
                console.error(message);
                showAlert(message, 'danger');
            }
        }catch (error){
            console.error('Error al eliminar la canción:', error);
            showAlert('Error al eliminar la canción', 'danger');
        }
    })
})

function showAlert(message, type) {
    const alertContainer = document.getElementById('alert-container');
    const alertHTML = `
     
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>    
    `;
  
    alertContainer.innerHTML = alertHTML;
}  

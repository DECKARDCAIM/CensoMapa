// Diccionario de imágenes por municipio
const imagenesMunicipios = {
  999: "/images/progreso.png",
  201: "/images/guastatoya.png",
  202: "/images/morazan.png",
  203: "/images/sanagustin.png",
  204: "/images/cristobal.png",
  205: "/images/jicaro.png",
  206: "/images/sansare.png",
  207: "/images/sanarate.png",
  208: "/images/antoniolapaz.png"
};

// Función para cargar los datos del municipio seleccionado
function cargarDatosMunicipio() {
  const municipioId = document.getElementById("municipios").value;
  
  // Cambiar la imagen del municipio
  document.getElementById("municipio-image").src = imagenesMunicipios[municipioId];

  // URL de la API con los IDs
  const apiUrl = `https://censopoblacion.azurewebsites.net/API/indicadores/2/${municipioId}`;

  // Hacemos el request a la API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Verificar si el dato está serializado doblemente como cadena JSON
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }
      mostrarDatos(data);
    })
    .catch(error => console.error("Error al obtener los datos:", error));
}

// Función para mostrar los datos en el DOM
function mostrarDatos(data) {
  const resultadosDiv = document.getElementById("resultados");

  resultadosDiv.innerHTML = '';

  const html = `
    <div class="data-item"><strong>Población Total:</strong> ${data.pob_total}</div>
    <div class="data-item"><strong>Índice de Masculinidad:</strong> ${data.indice_masculinidad}</div>
    <div class="data-item"><strong>Edad Promedio:</strong> ${data.edad_promedio}</div>
    <div class="data-item"><strong>Índice de Dependencia:</strong> ${data.indice_dependencia}</div>
    <div class="data-item"><strong>Años Promedio de Estudio:</strong> ${data.anios_prom_estudio}</div>
    <div class="data-item"><strong>Alfabetismo:</strong> ${data.alfabetismo}%</div>
    <div class="data-item"><strong>Viviendas Particulares:</strong> ${data.viviendas_part}</div>
    <div class="data-item"><strong>Total de Hogares:</strong> ${data.total_hogares}</div>
    <div class="data-item"><strong>Promedio de Personas por Hogar:</strong> ${data.prom_personas_hogar}</div>
    <div class="data-item"><strong>Porcentaje de Jefas de Hogar:</strong> ${data.total_jefas_hogar}%</div>
  `;
  
  resultadosDiv.innerHTML = html;
}

// Cargar los datos por defecto para El Progreso al inicio
cargarDatosMunicipio();

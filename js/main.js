let countries;

let btnToggleDarkMode = document.querySelector("#btn-toggle-dark-mode");
// Nada más cargar la página tenemos que mostrar todos los paises, vamos a

let inputSearch = document.querySelector("#input-field-country");

/**
 * Esta función la vamos a utilizar para actualizar el DOM con todos los paises del array countries
 *
 * @param {array} countries Array de objetos con paises
 */
function updateCountries(countries) {
  countries.forEach((c) => {
    // Objetivo: Generar tantos nodos como paises hay en este array
    // 1. Tenemos que crear un DIV
    const country = document.createElement("div");
    country.classList.add("country-info-box");

    // 2. Rellenar su innerHTML con la estructura adecuada y con cada valor de las propiedades del objeto
    country.innerHTML = `
    <img src="${c.flags.png}">
    <h2>${c.name.common}</h2>
    <p>Population: ${c.population}</p>
    <p>Region: ${c.region}</p>`;

    // 3. Añadir el nodo al padre que corresponda section#countries-selection-box
    document.querySelector("#countries-selection-box").appendChild(country);
  });
}

inputSearch.addEventListener("input", function (event) {
  // Hemos detectado que ha cambiado el valor el input
  // 1. Tenemos que LIMPIAR todo el .innerHTML del contenedor que tiene todos los paises

  document.querySelector("#countries-selection-box").innerHTML = "";

  // 2. Tenemos que utilizar adecuadamente el método filter para mirar si el campo c.name.official incluye el substring de inputSearch.value

  // Corregir a las 10.52
  const filteredCountries = countries.filter((c) =>
    c.name.common.toLowerCase().includes(inputSearch.value.toLowerCase())
  );

  updateCountries(filteredCountries);
});

async function getAllCountries() {
  // REto 1. Hacer una llamada a la API a la URL https://restcountries.com/v3.1/all , y mostrar por consola todos array de paises
  // Guardad la información que devuelve la API en la varible countries

  // 12.07 Corregir

  const response = await fetch("https://restcountries.com/v3.1/all ");
  countries = await response.json();

  // Reto 2: Para poder crear tantos paises como hay en el array de la API, tenemos que iterar por todos ellos

  // Utiliza el metodo forEach en la varible countries, y muestra por consola cada uno de las propiedades para cada pais.
  updateCountries(countries);
}

function toggleDarkMode() {
  document.querySelector("html").classList.toggle("dark-mode");
  btnToggleDarkMode.children[0].classList.toggle("bi-moon");
  btnToggleDarkMode.children[0].classList.toggle("bi-moon-fill");
}

function init() {
  btnToggleDarkMode.addEventListener("click", toggleDarkMode);
  getAllCountries();
}

window.onload = init();

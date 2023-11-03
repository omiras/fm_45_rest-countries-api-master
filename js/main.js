let countries;

let btnToggleDarkMode = document.querySelector("#btn-toggle-dark-mode");
// Nada más cargar la página tenemos que mostrar todos los paises, vamos a

let inputSearch = document.querySelector("#input-field-country");
inputSearch.addEventListener("input", function (event) {
  // Hemos detectado que ha cambiado el valor el input
  // 1. Tenemos que LIMPIAR todo el .innerHTML del contenedor que tiene todos los paises

  document.querySelector("#countries-selection-box").innerHTML = "";

  // 2. Tenemos que volver a hacer el .forEach para cada elemento, pero esta vez, solo para los paises cuyo nombre contiene el valor del input: inputSearch.value o event.target.value (podemos usar cualquier de los dos)

  countries.forEach((c) => {
    // Hay que mostrar el nombre del pais, la URL donde se encuentra la bandera, la población total, el continente o region, y la capital
    // console.log(c.name.official); // nombre del pais
    // console.log(c.flags.svg); // url de la bandera
    // console.log(c.population); // poblacion total
    // console.log(c.region); // continente

    // Si el nomnbre del pais incluye lo que está escribiendo el usuario en el inpt
    if (c.name.official.includes(inputSearch.value)) {
      // Objetivo: Generar tantos nodos como paises hay en este array
      // 1. Tenemos que crear un DIV
      const country = document.createElement("div");
      country.classList.add("country-info-box");

      // 2. Rellenar su innerHTML con la estructura adecuada y con cada valor de las propiedades del objeto
      country.innerHTML = `
    <img src="${c.flags.png}">
    <h2>${c.name.official}</h2>
    <p>Population: ${c.population}</p>
    <p>Region: ${c.region}</p>`;

      // 3. Añadir el nodo al padre que corresponda section#countries-selection-box
      document.querySelector("#countries-selection-box").appendChild(country);
    }
  });
});

async function getAllCountries() {
  // REto 1. Hacer una llamada a la API a la URL https://restcountries.com/v3.1/all , y mostrar por consola todos array de paises
  // Guardad la información que devuelve la API en la varible countries

  // 12.07 Corregir

  const response = await fetch("https://restcountries.com/v3.1/all ");
  countries = await response.json();

  // Reto 2: Para poder crear tantos paises como hay en el array de la API, tenemos que iterar por todos ellos

  // Utiliza el metodo forEach en la varible countries, y muestra por consola cada uno de las propiedades para cada pais.

  console.log(
    "Paises con mas de un continente: ",
    countries.find((c) => !c.capital)
  );

  countries.forEach((c) => {
    // Hay que mostrar el nombre del pais, la URL donde se encuentra la bandera, la población total, el continente o region, y la capital
    // console.log(c.name.official); // nombre del pais
    // console.log(c.flags.svg); // url de la bandera
    // console.log(c.population); // poblacion total
    // console.log(c.region); // continente

    // Objetivo: Generar tantos nodos como paises hay en este array
    // 1. Tenemos que crear un DIV
    const country = document.createElement("div");
    country.classList.add("country-info-box");

    // 2. Rellenar su innerHTML con la estructura adecuada y con cada valor de las propiedades del objeto
    country.innerHTML = `
    <img src="${c.flags.png}">
    <h2>${c.name.official}</h2>
    <p>Population: ${c.population}</p>
    <p>Region: ${c.region}</p>`;

    // 3. Añadir el nodo al padre que corresponda section#countries-selection-box
    document.querySelector("#countries-selection-box").appendChild(country);
  });
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

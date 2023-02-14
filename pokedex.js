const main = document.getElementById("main");
const inputNombre = document.getElementById("nombre");
// const inputTipo = document.getElementById("tipo");
// const select = document.getElementById("ordenar");

async function getAllPokemon() {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`);
  const data = await response.json();
  return data;
}

async function pintarTodosLosPokemon() {
  const todosLosPokemon = await getAllPokemon();
  todosLosPokemon.results.forEach(async (pokemon) => {
    await pintarUnPokemon(pokemon.name);
  });
}
inputNombre.addEventListener("keyup", async () => {
  main.innerHTML = "";
  const datos = await getAllPokemon();
  const datosFiltrados = datos.results.filter((x) =>
    x.name.includes(inputNombre.value)
  );
  datosFiltrados.forEach(async (x) => {
    await pintarUnPokemon(x.name);
  });
  
});

// inputNombre.addEventListener('keyup',async()=>{
//   main.innerHTML=''
//   const datos=await getAllPokemon()
//   const datosFiltrados=datos.results.filter(x=>x.name.includes(inputNombre.value))
//   datosFiltrados.forEach(async x => {
//     await pintarUnPokemon(x.name)
//   });
// })
//guardar en un array de objetos nombre + tipo,
//crear un addeventlistener combobox
//llamar a pintarunpokemon(nombre del tipo elegido)

console.log(getAllPokemon());

async function getPokemonData(pokemonId) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
  );
  const data = await response.json();
  return data;
}
console.log(getPokemonData(1));

async function pintarUnPokemon(pokemonId) {
  const pokemonData = await getPokemonData(pokemonId);
  const divContenedor = document.createElement("div");
  const divContenido2 = document.createElement("div");
  const h2 = document.createElement("h2");
  const divTipo = document.createElement("div");
  const divContenido = document.createElement("div");
  const divImg = document.createElement("div");
  const h2Id = document.createElement("h2");
  divIPT=document.createElement('div')

  h2.innerHTML = pokemonData.name;
  divImg.innerHTML = `<img class='width' src="${pokemonData.sprites.other.dream_world.front_default}"/>`;
  h2Id.innerHTML = pokemonData.id;

  divContenedor.className = "b-main__div";
  divContenido.className = `b-main__div__div-contenido`;
  divContenido2.className = pokemonData.types[0].type.name;
  divTipo.className = "b-main__div__div-tipo";
  h2Id.className = "b-main__div__p";
  h2.className = "b-main__div__div-contenido__h2";
  divImg.className='width_div'
  divIPT.className='b-main__div__div-contenido__divIPT'

  pokemonData.types.forEach((pokemon) => {
    const pTipo = document.createElement("p");
    pTipo.innerHTML = pokemon.type.name;
    divTipo.appendChild(pTipo);
    pTipo.className = "b-main__div__div-tipo__p";
  });

  main.appendChild(divContenedor);
  divContenido2.appendChild(divContenido);
  divContenido.appendChild(h2Id);
  divIPT.appendChild(divImg);
  divIPT.appendChild(h2);
  divIPT.appendChild(divTipo);
  divContenedor.appendChild(divContenido2);
  divContenido.appendChild(divIPT)
}

pintarTodosLosPokemon();

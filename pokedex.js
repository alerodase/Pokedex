const main = document.getElementById("main");
const inputNombre=document.getElementById('nombre')
const inputTipo=document.getElementById('tipo')
const select=document.getElementById('ordenar')


async function getAllPokemon() {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`);
  const data = await response.json();
  return data
}
// const todosLosPokemon=getAllPokemon()
// console.log(todosLosPokemon);
async function pintarTodosLosPokemon(){
  const todosLosPokemon=await getAllPokemon()
  todosLosPokemon.results.forEach(async pokemon=>{
  await pintarUnPokemon(pokemon.name)
  
  })
}
inputNombre.addEventListener('keyup',async()=>{
  main.innerHTML=''
  const datos=await getAllPokemon()
  const datosFiltrados=datos.results.filter(x=>x.name.includes(inputNombre.value))
  datosFiltrados.forEach(async x => {
    await pintarUnPokemon(x.name)
  });
})

inputNombre.addEventListener('keyup',async()=>{
  main.innerHTML=''
  const datos=await getAllPokemon()
  const datosFiltrados=datos.results.filter(x=>x.name.includes(inputNombre.value))
  datosFiltrados.forEach(async x => {
    await pintarUnPokemon(x.name)
  });
})
//guardar en un array de objetos nombre + tipo,
//crear un addeventlistener combobox
//llamar a pintarunpokemon(nombre del tipo elegido)

console.log(getAllPokemon());


async function getPokemonData(pokemonName) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  );
  const data = await response.json();
  return data;
}
console.log(getPokemonData('bulbasaur'));

async function pintarUnPokemon(pokemonName){
  const pokemonData= await getPokemonData(pokemonName)
  const divContenedor=document.createElement('div')
  const divContenido2=document.createElement('div')
  const h2=document.createElement('h2')
  const divTipo=document.createElement('div')
  const divContenido=document.createElement('div')
  const divImg=document.createElement('div')
  const pId=document.createElement('p')
  
  h2.innerHTML=pokemonData.name
  divImg.innerHTML=`<img class='width' src="${pokemonData.sprites.front_default}"/>`
  pId.innerHTML=pokemonData.id

  divContenedor.className='b-main__div'
  divContenido.className=`b-main__div__div-contenido`
  divContenido2.className=pokemonData.types[0].type.name
  divTipo.className='b-main__div__div-tipo'
  pId.className='b-main__div__p'
  h2.className='b-main__div__div-contenido__h2'
  
 pokemonData.types.forEach(pokemon=>{
  const pTipo=document.createElement('p')
  pTipo.innerHTML=pokemon.type.name
  divTipo.appendChild(pTipo)
  pTipo.className='b-main__div__div-tipo__p'
 })

  main.appendChild(divContenedor)
  divContenido2.appendChild(divContenido)
  divContenido.appendChild(pId)
  divContenido.appendChild(divImg)
  divContenido.appendChild(h2)
  divContenido.appendChild(divTipo)
  divContenedor.appendChild(divContenido2)


}


pintarTodosLosPokemon()

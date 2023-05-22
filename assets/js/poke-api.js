
// Saida := objeto que tem as funções de manipulação da poke api
// FATCH API ( forma de fazer requisição http pelo JS )

const pokeApi = {} 

function convertPokeApiDetailToPokemon(pokeDetail){
    //criando instancia da classe pokemon "que esta no arquivo poke-model"
    const pokemon = new Pokemon()

    //adicionadno elementos da api a meta dados"atributos" da classe pokemon
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    //pokemon.types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types= types
    pokemon.type = type

    //pokemon.type = pokemon.types.get(0) heigth widht

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    //pokemon.altura instancia a altura do pokemon que requisitamos da API
    pokemon.altura = pokeDetail.height
    pokemon.peso = pokeDetail.weight

    //instanciando as habilidades do pokemons mapeando elas e atribuindo a constante "habilidades"
    //depois uso uma destruction para pega a 1º habilidade.
    const habilidades = pokeDetail.abilities.map((abilitiesSlot) => abilitiesSlot.ability.name)

    const [habilidade] =  habilidades
    
    pokemon.abilities = habilidades
    pokemon.ability = habilidade

    return pokemon

}



pokeApi.getPokemonsDetail = (pokemon) => {
    //aqui pega os detalhe do pokemon e ja convertendo o response em json.
    return fetch (pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)

 }

pokeApi.getPokemons = (offset = 0,limit = 5) => {

    //criando variavel url com link do end point da api
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    //FAZENDO REQUISIÇÃO COM O "fetch(link-ou variavel com o link, noc aso "url")"
    // Processamento Assincrono ( vai acontecer e em algum momento via ter uma resposta )
    return fetch (url)
    
    //Arrow Function sintatse redusida por "=>" após o parametro da função,  "Função  sem contexto quando so quer ter um call back "retorno"
    //   parametro + "seta" + comando 
        .then((response) => response.json())
        //a linha abaixo da prioridade para os resultados
        .then((jsonBody) => jsonBody.results )
        // dado o resultado o 'map" mapeia a lista/arrai de pokemons em uma lista de outras requisições do detalhe do pokemon
        .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))
        //linha abaixo pega todos os promise
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => pokemonDetails)
        .catch((error) => console.error(error))
}



//atenção ao final deste arquivo esta comentado a tentativa que foi feita antes ate chegar na solução.

//window objeto global que da acesso a janela do browser
//document  da acesso ao elementos da pagina sprites > other > ream > dream_world front_default
const pokemonsList = document.getElementById('pokemonList')



//pegando botao "mais pokemon" da pagina 
const loadMoreButton = document.getElementById('showMore')





const maxRecords = 151
const limit = 4;
let offset = 0; 





function loadPokemonItens(offset, limit){

    
    
    //Tive toque ao ver os numero da pokedex entao fiz uma funçao para formatar o prefixo dos numeros 
    function prefixoNumber(pokemon){
        const pre = pokemon;

        if (pre >= 100){
            return '#'
        } else if ( pre>= 10){
            return '#0'
        } else { 
            return '#00'
        }
    }

    
 
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {


        
        pokemonsList.innerHTML += pokemons.map((pokemon) =>
        `   <li class="pokemon ${pokemon.type}" id="${pokemon.number}">
                <div class="linhaTopCardPokemon">
                    <!-- COMENTARIO > botao cirado em cada card para mostrar os detalhes atravez da abertura de um dialog -->
                    <button class="maisDetalhes"  id="${pokemon.number}" type="button">+</button>
                    <span class="name"> ${pokemon.name} </span> 
                    <span class="number"> ${prefixoNumber(pokemon.number)}${pokemon.number} </span>
                </div>
                <div class="cardBody" >
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join(" ")}
                    </ol>
                    <div class="bg-img">
                        <img  src="${pokemon.photo}" alt="${pokemon.name} "  >
                    </div>  
                </div>

               <!-- ________________________________________________ -->

               <div class="modal" id="dialog1${pokemon.number}">
                    <div class="cardcor ${pokemon.type}">
                        <div  class="cardHeader">
                            <span class="name"> ${pokemon.name} </span> 
                            <span class="number"> ${prefixoNumber(pokemon.number)}${pokemon.number} </span>
                            <!-- COMENTARIO > botao cirado em cada modal para fechar o mesmo -->
                            <button class="btClose" id="close${pokemon.number}" type"button">x</button>
                        </div>
                        <div class="cardBody modalBody"> 
                            <div class="imgPokebola" >
                                <img class="imgpoke" src="${pokemon.photo}" alt="${pokemon.name}"  >
                            </div>
                        </div>
                    </div>
                    <div class="cardDetalhes">
                        <div class="modalDetalhesHeader">
                            <h3 class="tituloDetalhes">Detalhes do Pokemon</h3>
                        </div>
                        <div class="modalBodyDetalhe">
                            <div class="colunLeaft">
                                <h4> Tipos </h4>
                                <ol class="types">
                                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join(" ")}
                                 </ol>
                            </div>
                            <div class="colunMid">
                                <h4 class="tituloPeso"> Peso </h4>
                                <span class="peso">${(pokemon.peso / 10).toFixed(1)} Kg</span>

                                <h4 class="tituloAltura">Altura</h4>
                                <span class="altura">${(pokemon.altura / 10).toFixed(1)} m </span>
                            </div>
                            <div class="colunDir">
                                <h4 class="tituloHabilidades"> habilidades</h4>
                                <ol class="habilidades">
                                    ${pokemon.abilities.map((habilidade) => 
                                        `<li class="habilidade ${habilidade} ${pokemon.type}">${habilidade}</li>`).join(" ")}
                                </ol>
                            </div>
                        <div>
                    </div>
                </div>

                    
               
               
             
                
        

            </li>`

             
        
        ).join(' ') //join a cada espa~ço de uma li para outra li, define um espaço

        //chama a função acaoBotaoDetalhes que cria o dinanismos dos botões nos card de cada pokemon atribuindo eventos de abrir um dialog com os detalhes do pokemon.
        //nesta mesma função em outro botao que consta dentro do dialog, atribi evento para fechar o dialog.
        
            acaoBotoesDetalhes();
          

    })

    
   
}
 
 


loadPokemonItens(offset,limit)


//criei uma função para adicionar ume evento/açao ao botão dinamico de cada card de pokemon. tive muita dificuldade em colocar o dinanismo pois os botão funcionavam mas ao carregar mais pokemon com a paginação os novos continuavam funcionando e os velhos parava de funcionar. 
function acaoBotoesDetalhes() {
    //antes estava chamando os botão maisdetalhe pelo id "card+pokemonnumber" entao criei uma constante  para pegar o valor da classe do botão que seria "maisDetalhes"
    const botoesDetalhes = document.getElementsByClassName('maisDetalhes');

    //vi sobre como funciona o metodo Array.from() e o forEach e atribui a classe do botão e como visto sobre arrow function envolvi as ações dos botões abrir e fechar o meu dialog.
    Array.from(botoesDetalhes).forEach((botao) => {

    //nessa parte me compliquei para entender a logica por tras fiz varias tentativa até chegar nessa solução,  criei uma constante que vai receber o id do meu botão que é "${pokemon.number}" de acordo com a classe maisDetalhes
      const idPokemon = botao.id;

      //desta forma usei a constante criada para referencia o id do meu dialog que quero que abra e o id do botao dentro do dialog que quero que feche.
      const dialog = document.getElementById(`dialog1${idPokemon}`);
      const btClose = document.getElementById(`close${idPokemon}`);
     
      //adiciona evento no botão que vai abrir o popup  
      botao.addEventListener('click', () => {
        //dialog.show()
        dialog.style.display = 'flex';
      });
      //adiciona evento no botão que vai fecha o popup  ( ele consta dentro do popup )
      btClose.addEventListener('click', () => {
        //dialog.close();
        dialog.style.display = 'none';
      });
    });
  }
  



 

//adiciona um evento no botao criado "nesse caso abaixo quando clicar no botao ele vai carregar mais 5 pokemons"
loadMoreButton.addEventListener('click', () => {
    
    offset += limit;
    

    const qtdRecordNexPage = offset + limit

    if (qtdRecordNexPage >= maxRecords) {
        const newLimit =  maxRecords - offset  
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
        

        

    } else {

        loadPokemonItens(offset, limit)
       

    }
    })



/*  PRIMEIRA TENTATIVA DA FUNÇÃO ACAOBOTOESDETALHES

Deixo aqui comentado primeira tentativa, deu certo essa minha tentativa, o botao chama o dilaog, porem quando tentei acionar a paginação e adicionar mais pokemon o meu botao mais detalhes nao abria os pokemons que ja estavam na pagina somento abria os que foram adicionado com a paginação. 

lembro que a tentativa comentada nao e para mostra meu erro e sim que persisti e achei a solução. 

segue função: 

function acaoBotaoDetalhe(offset,limit){




pokeApi.getPokemons(offset, limit).then((pokemons = []) => {

  
    pokemons.map((pokemon) => {
         //referencia usada para idia do botao de dialog > https://www.youtube.com/watch?v=hg66uftLsTQ&t=420s <

         const abrir = document.getElementById(`card${pokemon.number}`)
         const btClose = document.getElementById(`close${pokemon.number}`)
         const dialog1 = document.getElementById(`dialog1${pokemon.number}`)
       



         //não sei o por que mas ao carregar no navegador funciona normalmente mas as vezes ao recarregar a pagina aparece o erro "(in promise) TypeError: Cannot read properties of null (reading 'addEventListener')"
         abrir.addEventListener('click', () => {
 
             dialog1.show()
 
         })

         btClose.addEventListener('click', () => {

            dialog1.close()


         })}


 
 )})
        }


*/
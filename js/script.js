const elForm = selectElem('.wrapper__form');
const elSelect = selectElem('#wrapper__select', elForm);
const elSearch = selectElem('#wrapper__search', elForm);
const elFilter = selectElem('#wrapper__filter', elForm);
const elFormBtn = selectElem('#wrapper__button', elForm);
const elMenu = selectElem('.cards__menu');
const elTemplate = selectElem('#template').content;
const elModalMenu = selectElem('.sidebar__list');
//const ModalTemplate = selectElem('#modal__template').content;

let likedArr = [];

function renderPokemons(pokemonsArr, element){
    element.innerHTML = null; 
    pokemonsArr.forEach((pokemon) =>{
        const cloneTemplate = elTemplate.cloneNode(true)
        
        selectElem('.cards__img', cloneTemplate).src = pokemon.img;
        selectElem('.cards__title', cloneTemplate).textContent = pokemon.name;
        selectElem('.cards__type', cloneTemplate).textContent = pokemon.type;
        selectElem('.cards__weight', cloneTemplate).textContent = pokemon.weight;
        selectElem('.cards__age', cloneTemplate).textContent = pokemon.avg_spawns + " age";
        
        let elCardBtn = selectElem('.cards__like--btn', cloneTemplate);
        elCardBtn.dataset.id = pokemon.id;
        
        elCardBtn.addEventListener('click', (e) =>{
            elCardBtn.classList.toggle('cards__like--active');
            let pokemonId = e.target.dataset.id;
            let likedPokemon = pokemons.find((pokemon) => pokemon.id == pokemonId);

            if(!likedArr.includes(likedPokemon)){
                likedArr.push(likedPokemon);
            }
             else if(!e.target.classList.contains('cards__like--active')){
                let found = likedArr.find(el => el.id == e.target.dataset.id );
                let index = likedArr.indexOf(found);
                likedArr.splice(index, 1);
            }
            // likedArr.forEach((pokemon) =>{
            //     const
            // })
            renderPokemons(likedArr, elModalMenu);
        })
        element.appendChild(cloneTemplate);
    })
}
renderPokemons(pokemons, elMenu);

function renderTypes(pokemonsArr, element){
    let result = [];
    pokemonsArr.forEach((pokemon) =>{
        pokemon.type.forEach(tip =>{
            if(!result.includes(tip)){
                result.push(tip);
            }; 
        });
    });
    result.forEach(tip =>{
        let newOption = createElem('option');
        newOption.textContent = tip;
        newOption.value = tip;
        element.appendChild(newOption);
    });
};
renderTypes(pokemons, elSelect);

elForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    
    const inputValue = elSearch.value.trim();
    const selectValue = elSelect.value.trim();
    const filterValue = elFilter.value.trim();
    
    const regex = new RegExp(inputValue, 'gi');
    const filteredPokemons = pokemons.filter((pokemon)=> pokemon.name.match(regex));
    
    let foundPokemons = [];
    
    if(selectValue === 'All'){
        foundPokemons = filteredPokemons;
    }else{
        foundPokemons = filteredPokemons.filter(pokemon => pokemon.type.includes(selectValue));
    }
    //---------------------- by Alphabet
    if(filterValue === 'Aa__Zz'){
        foundPokemons.sort((a, b) => {
            if(a.name > b.name){
                return 1
            }else if( a.name < b.name){
                return -1
            }else{
                return 0
            }
        })
    }else if(filterValue === 'Zz__Aa'){
        foundPokemons.sort((a, b) => {
            if(a.name > b.name){
                return -1
            }else if( a.name < b.name){
                return 1
            }else{
                return 0
            }
        })
    }
    //-------------------------------- by Weight
    else if(filterValue === 'Light__Heavy'){
        foundPokemons.sort((a, b) => {
            if(a.weight > b.weight){
                return 1
            }else if( a.weight < b.weight){
                return -1
            }else{
                return 0
            }
        })
    }else if(filterValue === 'Heavy__Light'){
        foundPokemons.sort((a, b) => {
            if(a.weight > b.weight){
                return -1
            }else if( a.weight < b.weight){
                return 1
            }else{
                return 0
            }
        })
    }
    //------------------ by Age
    else if(filterValue === 'Young__Old'){
        foundPokemons.sort((a, b) => {
            if(a.avg_spawns > b.avg_spawns){
                return 1
            }else if( a.avg_spawns < b.avg_spawns){
                return -1
            }else{
                return 0
            }
        })
    }else if(filterValue === 'Old__Young'){
        foundPokemons.sort((a, b) => {
            if(a.avg_spawns > b.avg_spawns){
                return -1
            }else if( a.avg_spawns < b.avg_spawns){
                return 1
            }else{
                return 0
            }
        })
    }
    elSearch.value = null;
    renderPokemons(foundPokemons, elMenu);
})

const elSidebar = selectElem('.sidebar');
const elSidebarWrap = selectElem('.sidebar__wrapper');
const sidebarMenu = selectElem('sidebar__list');
const elOpenBtn = selectElem('.header__like--btn');
const elCloseBtn = selectElem('.close-btn');


elOpenBtn.addEventListener('click', () =>{
    elSidebar.classList.add('sidebar--active');
    // elCardBtn.classList.add('cards__like--passive')
    // if(elSidebar.classList.add('sidebar--active')){
    // }
      // renderPokemons(likedArr, elModalMenu)
})
elCloseBtn.addEventListener('click', () =>{
    elSidebar.classList.remove('sidebar--active');
})

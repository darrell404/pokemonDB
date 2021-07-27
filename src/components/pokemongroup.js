import {connect} from 'react-redux'
import ImageMissing from '../images/not-found.png'
import {FETCH_POKEMON_NAME} from '../reducers/FetchPokemonName'
import {Link} from 'react-router-dom'

function PokemonGroup(props) {

    const PokemonCardRender = connect(null, mapDispatchToProps)(PokemonCard);
    const filterPokemon = props.pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(props.search.toLowerCase()));
    

    if (filterPokemon.length === 0)
    return (
        <div className="pokemonList">
        <h3>Pokemon not found!</h3>
        </div>
    )
    else
    return (
          <div className="pokemonList">
             {filterPokemon.map((pokemonChar) => (<PokemonCardRender key={pokemonChar.name} pokemonName={pokemonChar.name} index={pokemonChar.url.slice(34, -1)}></PokemonCardRender>))}
          </div>
    )
}

export function PokemonCard(props) {
    
    function ImageNotFound(img) {
      img.target.src = ImageMissing;
    }
  
    const handleClick = () => {
      props.FetchPokemonName(props.pokemonName)
    }
  
    return (
      <div className="pokemonName"><Link to={`/${props.pokemonName}`}>
        <div className="pokemon-image-container"><img onClick={handleClick} key={props.pokemonName} alt={`${props.pokemonName}`} title={`${props.pokemonName}`} onError={ImageNotFound} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.index}.png`}/>
        </div></Link><br/><br/>
        <div>{"#" + (props.index)}
        </div>
        <div className="pokemonTitle">{props.pokemonName.charAt(0).toUpperCase() + props.pokemonName.slice(1)}
        </div>
      </div>   
      )
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    FetchPokemonName: (ownProps) => {dispatch({type: FETCH_POKEMON_NAME, payload: ownProps})}
  }
}

const mapStateToProps = (state) => {
    return {
        pokemons: state.pokemonlist,
        search: state.PokemonSearch,
        offset: state.offsetData
    }
}

export default connect(mapStateToProps)(PokemonGroup);



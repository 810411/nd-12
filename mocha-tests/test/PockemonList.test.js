const sinon				= require('sinon');
const assert			= require('assert');
const expect			= require('chai').expect;

const Pokemon			= require('../index').Pokemon;
const PokemonList	= require('../index').Pokemonlist;

describe('PokemonList Class', () => {
  let	pokemon,
    pokemonList;

  before(() => {
    pokemon = new Pokemon('Pokemon1', 100);
    pokemonList	= new PokemonList(pokemon);
  });

  it('Adding Pokemon2 in list: last object in list should be "Pokemon2"', () => {
    pokemonList.add('Pokemon2', 50);
    expect(pokemonList[pokemonList.length - 1]).to.deep.equal(new Pokemon('Pokemon2', 50));
  });

  it('Showing count of objects Pokemon in list', () => {
    let loggerSpy = sinon.spy(console, 'log');
    pokemonList.show();
    assert(loggerSpy.calledWith(`There are 2 pokemons here.`));
    loggerSpy.restore();
  });

  it('Strongest object Pockemon in list (Pokemon1)', () => {
    expect(pokemonList.max()).to.deep.equal(pokemon);
  })
});
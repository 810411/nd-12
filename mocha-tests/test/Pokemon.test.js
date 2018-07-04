const sinon				= require('sinon');
const assert			= require('assert');

const Pokemon			= require('../index').Pokemon;

let pikachu		= new Pokemon('Pokemon', 100);

describe('Pokemon Class', () => {
  it('Object of class Pokemon should show name "Pokemon" and level "100"', () => {
    let loggerSpy = sinon.spy(console, 'log');
    pikachu.show();
    assert(loggerSpy.calledWith(`Hi! My name is Pokemon, my level is 100`));
    loggerSpy.restore();
  })
});
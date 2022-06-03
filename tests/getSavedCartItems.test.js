const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  test('Se a função foi definida', () => {
    expect(typeof getSavedCartItems).toBe('function');
  });

  test("Se ao chamar a função, o método 'localStorage.getItem' é chamado", () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });

  test("Se ao chamar a função, o método 'localStorage.getItem' é chamado com o parâmetro 'cartItems'", () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});

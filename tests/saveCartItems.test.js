const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  test('Se a função foi definida', () => {
    expect(typeof saveCartItems).toBe('function');
  });

  const ARGUMENT = '<ol><li>Item</li></ol>';

  test("Se a função for chamada com o argumento '<ol><li>Item</li></ol>', o método 'localStorage.setItem' é chamado", () => {
    saveCartItems(ARGUMENT);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  test("Se a função for chamada com o argumento '<ol><li>Item</li></ol>', o método 'localStorage.setItem' é chamado", () => {
    saveCartItems(ARGUMENT);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', ARGUMENT);
  });
});

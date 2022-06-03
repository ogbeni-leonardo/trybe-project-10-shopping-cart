require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  test('Se a função foi definida', () => {
    expect(typeof fetchItem).toBe('function');
  });

  test('Se a função for chamada sem nenhum argumento é retornada uma mensagem de erro', async () => {
    expect(await fetchItem()).toEqual(new Error('You must provide an url'));
  });

  const ARGUMENT = 'MLB1615760527';

  test("Se ao chamar a função com um parâmetro, a função 'fetch' é chamada", async () => {
    await fetchItem(ARGUMENT);
    expect(fetch).toHaveBeenCalled();
  });

  test("Se ao chamar a função com o argumento 'MLB1615760527', a função 'fetch' utiliza o endpoint correspondente", async () => {
    const URL = `https://api.mercadolibre.com/items/${ARGUMENT}`;
    await fetchItem(ARGUMENT);
    expect(fetch).toHaveBeenCalledWith(URL);
  });

  test("Se o objeto retornado pela função, chamada com o argumento 'MLB1615760527' é uma estrutura de dados válida", async () => {
    expect(await fetchItem(ARGUMENT)).toEqual(item);
  });
});

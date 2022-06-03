require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  test("Se a função 'fetchProducts' foi definida", () => {
    expect(typeof fetchProducts).toBe('function');
  });

  test("Se a função 'fetch' é chamada ao passar um argumento para a função 'fetchProducts'", async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  test("Se ao chamar a 'fetchProducts', a função 'fetch' utiliza o endpoint correto", async () => {
    const URL = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(URL);
  });

  test("Se o retorno da função 'fetchProducts', é uma estrutura de dados válida", async () => {
    const data = await fetchProducts('computador');
    expect(data).toEqual(computadorSearch);
  });

  test("Se ao chamar a função 'fetchProducts' sem argumentos é retornado um erro específico", async () => {
    expect(await fetchProducts()).toEqual(new Error('You must provide an url'));
  });
});

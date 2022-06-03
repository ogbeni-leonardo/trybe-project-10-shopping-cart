const fetchItem = async (queryId) => {
  if (queryId === undefined) {
    return new Error('You must provide an url');
  }

  const URL = `https://api.mercadolibre.com/items/${queryId}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}

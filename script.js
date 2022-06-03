const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(
    createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'),
  );

  return section;
};

// Criada por mim

const getInformationOfCartItem = (string) => {
  const formattedString = string
    .replace('SKU:', '')
    .replace('NAME:', '')
    .replace('PRICE:', '')
    .replace('$', '');

  const [sku, name, salePrice] = formattedString
    .split('|')
    .map((info) => info.trim());
  return { sku, name, salePrice };
};

// Criada por mim

const allItemsFromCart = () => JSON.parse(getSavedCartItems());

const totalPrice = () => {
  let value = 0;
  allItemsFromCart().forEach(({ salePrice }) => {
    value += parseFloat(salePrice);
  });
  value = Math.round(value * 100) / 100;
  document.querySelector('.total-price').innerText = value;
};

const localStorageUpdate = () => {
  const itemsOnCart = document.querySelectorAll('.cart__item');
  const itemsValue = [];

  for (let index = 0; index < itemsOnCart.length; index += 1) {
    const formattedString = getInformationOfCartItem(
      itemsOnCart[index].innerText,
    );
    itemsValue.push(formattedString);
  }

  saveCartItems(JSON.stringify(itemsValue));
  totalPrice();
};

const getSkuFromProductItem = (item) =>
  item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  event.target.remove();
  localStorageUpdate();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

// Criadas por mim

const addSectionItems = async () => {
  const sectionItems = document.querySelector('.items');

  const allProductsFromQuery = await fetchProducts('computador');
  allProductsFromQuery.results.forEach((item) => {
    const { id: sku, title: name, thumbnail: image } = item;

    const itemElement = createProductItemElement({ sku, name, image });
    sectionItems.appendChild(itemElement);
  });
};

const addItemsToCart = async () => {
  const addButtons = document.querySelectorAll('.item__add');
  addButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const myParent = button.parentElement;
      const queryId = getSkuFromProductItem(myParent);

      const getItem = await fetchItem(queryId);
      const { id: sku, title: name, price: salePrice } = getItem;

      const itemToAdd = createCartItemElement({ sku, name, salePrice });
      document.querySelector('.cart__items').appendChild(itemToAdd);

      localStorageUpdate();
    });
  });
};

window.onload = async () => {
  await addSectionItems();
  await addItemsToCart();

  allItemsFromCart().forEach((item) => {
    document
      .querySelector('.cart__items')
      .appendChild(createCartItemElement(item));
  });

  totalPrice();
};

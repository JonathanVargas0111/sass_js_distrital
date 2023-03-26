const apiUrl = 'https://fakestoreapi.com/products';

const fetchData = async () => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};


/*

  Reder Menu
  Se crea con lso datos de categorias

*/

const renderMenu = (data) => {
  //Asocia el contenedor del menu
  const filterMenu = document.getElementById('filter-menu');
  const categories = [...new Set(data.map((item) => item.category))];

  //recorre las categorias y crea los botones
  categories.forEach((category) => {
    const categoryButton = document.createElement('button');
    categoryButton.textContent = category;
    categoryButton.classList.add('categories__category');

    //add funcionalidad
    categoryButton.addEventListener('click', () => {
      const filteredData = filterData(data, category);
      renderProducts(filteredData);
    });
    //Agregando al dom
    filterMenu.appendChild(categoryButton);
  });
};


/*

  Reder Menu
  Se crea con lso datos de categorias

*/

const renderProducts = (data) => {
  const productContainer = document.getElementById('product-container');
  productContainer.innerHTML = '';
  data.forEach((item) => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('product');
    itemElement.innerHTML = `
      <h3 class="product__title">${item.title}</h3>
      <img class="product__image" src="${item.image}" alt="${item.title}" >
      <p class="product__price">Precio: $${item.price}</p>
      <p class="product__catgory">Categoría: ${item.category}</p>
    `;
    productContainer.appendChild(itemElement);
  });
};



/*

  Ffiltracion de informacion

*/
const filterData = (data, filterValue) => {
  const filteredData = data.filter((item) => {
    return item.category === filterValue;
  });
  return filteredData;
};

const searchProduct = (data, searchValue) => {
  const searchResults = data.filter((item) => {
    return item.title.toLowerCase().includes(searchValue.toLowerCase());
  });
  return searchResults;
};

const initializeApp = async () => {
  const data = await fetchData();
  renderMenu(data);
  renderProducts(data);

  const searchButton = document.getElementById('search-button');
  searchButton.addEventListener('click', () => {
    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value.trim();
    const searchResults = searchProduct(data, searchValue);
    renderProducts(searchResults);
  });
};

initializeApp();
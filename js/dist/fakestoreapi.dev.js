"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var apiUrl = 'https://fakestoreapi.com/products';

var fetchData = function fetchData() {
  var response, data;
  return regeneratorRuntime.async(function fetchData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch(apiUrl));

        case 3:
          response = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          data = _context.sent;
          return _context.abrupt("return", data);

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
};
/*

  Reder Menu
  Se crea con lso datos de categorias

*/


var renderMenu = function renderMenu(data) {
  //Asocia el contenedor del menu
  var filterMenu = document.getElementById('filter-menu');

  var categories = _toConsumableArray(new Set(data.map(function (item) {
    return item.category;
  }))); //recorre las categorias y crea los botones


  categories.forEach(function (category) {
    var categoryButton = document.createElement('button');
    categoryButton.textContent = category;
    categoryButton.classList.add('categories__category'); //add funcionalidad

    categoryButton.addEventListener('click', function () {
      var filteredData = filterData(data, category);
      renderProducts(filteredData);
    }); //Agregando al dom

    filterMenu.appendChild(categoryButton);
  });
};
/*

  Reder Menu
  Se crea con lso datos de categorias

*/


var renderProducts = function renderProducts(data) {
  var productContainer = document.getElementById('product-container');
  productContainer.innerHTML = '';
  data.forEach(function (item) {
    var itemElement = document.createElement('div');
    itemElement.classList.add('product');
    itemElement.innerHTML = "\n      <h3 class=\"product__title\">".concat(item.title, "</h3>\n      <img class=\"product__image\" src=\"").concat(item.image, "\" alt=\"").concat(item.title, "\" >\n      <p class=\"product__price\">Precio: $").concat(item.price, "</p>\n      <p class=\"product__catgory\">Categor\xEDa: ").concat(item.category, "</p>\n    ");
    productContainer.appendChild(itemElement);
  });
};
/*

  Ffiltracion de informacion

*/


var filterData = function filterData(data, filterValue) {
  var filteredData = data.filter(function (item) {
    return item.category === filterValue;
  });
  return filteredData;
};

var searchProduct = function searchProduct(data, searchValue) {
  var searchResults = data.filter(function (item) {
    return item.title.toLowerCase().includes(searchValue.toLowerCase());
  });
  return searchResults;
};

var initializeApp = function initializeApp() {
  var data, searchButton;
  return regeneratorRuntime.async(function initializeApp$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(fetchData());

        case 2:
          data = _context2.sent;
          renderMenu(data);
          renderProducts(data);
          searchButton = document.getElementById('search-button');
          searchButton.addEventListener('click', function () {
            var searchInput = document.getElementById('search-input');
            var searchValue = searchInput.value.trim();
            var searchResults = searchProduct(data, searchValue);
            renderProducts(searchResults);
          });

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
};

initializeApp();
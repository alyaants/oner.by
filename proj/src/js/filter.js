const list = document.querySelector(".list");
const items = document.querySelectorAll(".catalog__item");
const listItems = document.querySelectorAll(".list__item");
function filter() {
  list.addEventListener("click", (event) => {
    const targetId = event.target.dataset.id;
    const target = event.target;
    console.log("ghghhg");

    if (target.classList.contains("list__item")) {
      listItems.forEach((listItem) => listItem.classList.remove("active"));
      target.classList.add("active");
    }

    switch (targetId) {
      case "all":
        showAllItems();
        break;
      case "aral":
      case "bmw":
      case "eurol":
      case "shell":
      case "lukoil":

      case "alfa":
      case "banner":
      case "hagen":
      case "patron":
      case "autofan":

      case "carwel":
      case "k-k":
      case "ls":
      case "mers":
      case "replay":
        filterItems(targetId);
        break;
    }
  });
}

function showAllItems() {
  items.forEach((item) => {
    item.style.display = "block";
  });
}

function filterItems(className) {
  const itemsArray = Array.from(items); // Преобразуем NodeList в массив
  itemsArray.forEach((item) => {
    if (item.classList.contains(className)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

filter();

// поиск по товарам
const inputSearch = document.querySelector(".search");
inputSearch.addEventListener("input", search);

function search() {
  const input = inputSearch.value.toLowerCase();
  const products = document.querySelectorAll(".catalog__item");

  products.forEach((product) => {
    const searchFirm = product
      .querySelector(".item-firm")
      .textContent.toLowerCase();
    const searchDescr = product
      .querySelector(".item-descr")
      .textContent.toLowerCase();
    const searchArticle = product
      .querySelector(".article")
      .textContent.toLowerCase();

    if (searchFirm.includes(input) || searchDescr.includes(input)) {
      product.style.display = "block";
    } else if (searchArticle.includes(input)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}


new Swiper(".swiper", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  speed: 800,
  effect: "slide",

  autoplay: {
    delay: 4000,
  },

  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

const cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const addToCartButtons = document.querySelectorAll(".cart");

addToCartButtons.forEach((button) => {
  button.addEventListener("click", addToCart);
});


// Функция для добавления товара в корзину
function addToCart(event) {
  const productElement = event.target.closest(".item");
  if (productElement) {
    const productName =
      productElement.querySelector(".item-title h3").textContent;
    const productPrice = productElement.querySelector(".new").textContent;
    const productImg = productElement.querySelector("img").src;
    const productId = Date.now(); 

    const product = {
      id: productId, 
      name: productName,
      price: productPrice,
      img: productImg, 
    };

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
  }
}

let isCartOpen = false;

const cartButton = document.querySelector(".cart-header");
const overlay = document.createElement("div");
overlay.className = "overlay";
document.body.appendChild(overlay);
const cartWrap = document.createElement("div");
cartWrap.classList.add("cart-wrap");
document.body.appendChild(cartWrap);

const cartHeader = document.createElement("div");
cartHeader.classList.add("cartHeader");
cartWrap.appendChild(cartHeader);

const titleCart = document.createElement("span");
titleCart.classList.add("titleCart");
titleCart.textContent = "Корзина";
cartHeader.appendChild(titleCart);

const closeButton = document.createElement("button");
closeButton.classList.add("closeButton");
closeButton.innerText = "✖";
cartHeader.appendChild(closeButton);

const listWrap = document.createElement("div");
listWrap.classList.add("listWrap");
cartWrap.appendChild(listWrap);

const cartList = document.createElement("ul");
cartList.className = "listUl";
listWrap.appendChild(cartList);

const total = document.createElement("span");
total.classList.add("total");
total.innerText = "Сумма заказа: ";
listWrap.appendChild(total);

cartButton.addEventListener("click", () => {
  if (isCartOpen) {
    cartWrap.style.display = "none";
    overlay.style.display = "none";
  } else {
    cartWrap.style.display = "block";
    overlay.style.display = "block";
    displayCart();
  }
  isCartOpen = !isCartOpen;
});

closeButton.addEventListener("click", () => {
  cartWrap.style.display = "none";
  overlay.style.display = "none";
  isCartOpen = false;
});

// удаление товаров в корзине и сумма
function displayCart() {
  const cartData = JSON.parse(localStorage.getItem("cart"));
  const cartList = document.querySelector(".listUl");

  cartList.innerHTML = "";

  let totalAmount = 0;

  if (cartData && cartData.length > 0) {
    cartData.forEach((item) => {
      const cartItem = document.createElement("li");
      const productImage = document.createElement("div");
      productImage.classList.add("productImage");
      const image = document.createElement("img");
      image.src = item.img;
      image.alt = item.name;
      cartItem.appendChild(productImage);
      productImage.appendChild(image);

      const productInfo = document.createElement("div");
      productInfo.classList.add("product-info");

      const productTitle = document.createElement("span");
      productTitle.textContent = `${item.name} — `;

      const productPrice = document.createElement("span");
      productPrice.textContent = item.price;

      productInfo.appendChild(productTitle);
      productInfo.appendChild(productPrice);

      cartItem.appendChild(productInfo);

      const removeBtn = document.createElement("button");
      removeBtn.classList.add("removeBtn");
      removeBtn.textContent = "Удалить";

      removeBtn.addEventListener("click", () => {
        const index = cartData.findIndex((cartItem) => cartItem.id === item.id);
        if (index !== -1) {
          cartData.splice(index, 1);
          localStorage.setItem("cart", JSON.stringify(cartData));
          totalAmount -= parseFloat(item.price);
          displayCart();
        }
      });

      cartItem.appendChild(removeBtn);
      cartList.appendChild(cartItem);

      totalAmount += parseFloat(item.price);
    });

    const total = document.querySelector(".total");
    totalAmount = parseFloat(totalAmount.toFixed(2));
    total.textContent = `Сумма заказа: ${totalAmount} BYN`;

  } else {
    const emptyCartMessage = document.createElement("p");
    emptyCartMessage.classList.add("empty");
    emptyCartMessage.textContent = "Корзина пуста";
    cartList.appendChild(emptyCartMessage);

    const total = document.querySelector(".total");
    total.textContent = "Сумма заказа: 0 BYN";
  }
}

displayCart();

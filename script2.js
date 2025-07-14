let cart = [];
let isLoggedIn = false;

function userLoggedIn() {
  isLoggedIn = true;
  alert("🎉 You are now logged in!");

  // Enable buttons
  document.querySelectorAll("button[onclick^='addToCart']").forEach(btn => {
    btn.disabled = false;
  });

  document.getElementById("checkout-btn").disabled = false;
}

function addToCart(product, price) {
  cart.push({ product, price });
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const total = document.getElementById("cart-total");
  cartItems.innerHTML = '';
  let sum = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.product} - ₹${item.price} <button onclick="removeFromCart(${index})" style="margin-left: 10px; background: red; color: white; border: none; border-radius: 5px; cursor: pointer;">❌</button>`;

    cartItems.appendChild(li);
    sum += item.price;
  });

  total.innerText = `Total: ₹${sum}`;
}

function removeFromCart(index) {
  cart.splice(index, 1); // remove item from cart
  renderCart();          // re-render cart
}


function checkout() {
  if (!isLoggedIn) {
    alert("Please login/register before checking out.");
    return;
  }

  let message = "Hello, I'd like to place an order:\n";
  cart.forEach(item => {
    message += `- ${item.product} (₹${item.price})\n`;
  });
  const total = cart.reduce((acc, cur) => acc + cur.price, 0);
  message += `Total: ₹${total}`;

  const encoded = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/918447820157?text=${encoded}`;
  window.open(whatsappURL, "_blank");
}

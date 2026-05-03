function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart-items");
    let totalPriceElement = document.getElementById("total-price");

    cartContainer.innerHTML = "";

    // Show message if cart is empty
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty</h2>
                <p>Browse products and add items to your cart.</p>
            </div>
        `;

        totalPriceElement.innerText = "";
        updateCartCount();
        return;
    }

    let totalPrice = 0;

    cart.forEach((product, index) => {
        let productTotal = product.price * product.quantity;
        totalPrice += productTotal;

        cartContainer.innerHTML += `
            <div class="cart-product">
                
                <div class="cart-product-info">
                    <img src="${product.image}" width="100">
                    
                    <div>
                        <h3>${product.name}</h3>
                        <p>Size: ${product.size}</p>
                        <p>Colour: ${product.colour}</p>
                    </div>
                </div>

                <p>P${product.price}</p>

                <input 
                    type="number"
                    value="${product.quantity}"
                    min="1"
                    onchange="updateQuantity(${index}, this.value)"
                >

                <p>P${productTotal}</p>

                <button class="remove-btn" onclick="removeItem(${index})">
                    Remove
                </button>
            </div>
        `;
    });

    totalPriceElement.innerText = "Total: P" + totalPrice;

    updateCartCount();
}


// Remove item from cart
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}


// Update quantity
function updateQuantity(index, newQuantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    newQuantity = parseInt(newQuantity);

    // Remove product if invalid quantity
    if (newQuantity <= 0 || isNaN(newQuantity)) {
        removeItem(index);
        return;
    }

    cart[index].quantity = newQuantity;

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}


// Update navbar cart badge
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let totalItems = 0;

    cart.forEach(item => {
        totalItems += parseInt(item.quantity);
    });

    let cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.innerText = totalItems;
    }
}


// Run when page loads
displayCart();
updateCartCount();
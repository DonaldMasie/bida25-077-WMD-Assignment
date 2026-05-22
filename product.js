function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalItems = 0;

    cart.forEach(item => {
        totalItems += parseInt(item.quantity);
    });

    document.getElementById("cart-count").innerText = totalItems;
}

const addCartBtn = document.getElementById("add-cart");

if(addCartBtn){
    addCartBtn.addEventListener("click", function () {
        const quantity = parseInt(document.getElementById("quantity").value);
        const size = document.getElementById("size").value;
        const colour = document.getElementById("colour").value;

        if (size === "Select Size" || colour === "Select colour") {
            alert("Please select size and colour");
            return;
        }

        const product = {
            name: document.querySelector(".col-2 h1").innerText,
            price: parseInt(document.querySelector(".col-2 h4").innerText.replace("P","")),
            image: document.querySelector(".main-img").src,
            quantity: quantity,
            size: size,
            colour: colour
        };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        let existingProduct = cart.find(item =>
            item.name === product.name &&
            item.size === product.size &&
            item.colour === product.colour
        );

        if(existingProduct){
            existingProduct.quantity += quantity;
        } else {
            cart.push(product);
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        updateCartCount();

        window.location.href = "cart.html";
    });
}

updateCartCount();
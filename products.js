
async function fetchProducts() {
    try {
        const response = await fetch("https://ecommerce-samurai.up.railway.app/product");
        const data = await response.json();
        const products = data.data;
        return products
    } catch {
        alert("An error has occured. Please try again later.")
    };
}

async function renderProducts() {
    const productsList = document.querySelector('#all-products-list');
    const productsFilter = document.querySelector('.products__header__filter').value;

    productsList.innerHTML = `<i class="fa-solid fa-spinner products__list__spinner"></i>`;
    const products = await fetchProducts();

    const productsDisplayed = products.filter((product) => {
        if (product.category === productsFilter) {
            return true;
        }
        if (productsFilter === "") {
            return true;
        }
    });
    
    const productsHTML =(productsDisplayed.map((product) => { 
        return `<div class="product">
        <img src="https://ecommerce-samurai.up.railway.app/${product.images[0]}" alt="" class="product__img" />
        <div class="product__details">
            <h3 class="product__details__title">${product.name}</h3>
            <span class="product__details__price">$${product.price} </span>
        </div>
    </div>`
    })).join("");

    productsList.innerHTML = productsHTML; 
}
// fetch("https://ecommerce-samurai.up.railway.app/product")
renderProducts()
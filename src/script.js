/* filepath: c:\Tools\workarea\software-store\src\js\scripts.js */
document.addEventListener('DOMContentLoaded', () => {
    const licenseSliders = document.querySelectorAll('.license-slider');

    licenseSliders.forEach(slider => {
        slider.addEventListener('input', (event) => {
            const valueSpan = document.getElementById(`${event.target.id}-value`);
            const value = event.target.value;
            let text = '';

            switch (value) {
                case '1':
                    text = '1 год';
                    break;
                case '2':
                    text = '3 года';
                    break;
                case '3':
                    text = '5 лет';
                    break;
            }

            valueSpan.textContent = text;
        });
    });

    updateCart();
});

function addToCart(productName, price) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ productName, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'cart.html';
}

function updateCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');
    let total = 0;

    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.textContent = `${item.productName} - $${item.price}`;
        cartItemsContainer.appendChild(itemElement);
        total += item.price;
    });

    cartTotalContainer.textContent = `Итого: $${total}`;
}

function proceedToCheckout() {
    alert('Переход к оплате...');
    // Здесь можно добавить логику для перехода к оплате
}
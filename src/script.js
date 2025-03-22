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

    if (document.getElementById('cart-items')) {
        updateCart();
    }
});

function addToCart(productName, price) {
    const orderId = generateOrderId();
    const licenseDuration = document.querySelector(`#${productName.toLowerCase().replace(/ /g, '-')}-license-value`).textContent;
    const version = document.querySelector(`#${productName.toLowerCase().replace(/ /g, '-')}-version`).value;
    const support = document.querySelector(`input[name="${productName.toLowerCase().replace(/ /g, '-')}-support"]`).checked ? 'Yes' : 'No';
    const training = document.querySelector(`input[name="${productName.toLowerCase().replace(/ /g, '-')}-training"]`).checked ? 'Yes' : 'No';
    const comments = document.querySelector(`#${productName.toLowerCase().replace(/ /g, '-')}-comments`).value;

    const data = {
        orderId,
        productName,
        price,
        licenseDuration,
        version,
        support,
        training,
        comments
    };

    fetch('https://script.google.com/macros/s/AKfycbzzw1JmyZ7EGboaZ_Q22-_q-ChJr30BT5VRzaMJ0A_CAFZUUyCUL_bxgWcOzygeXspz/exec', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(result => {
        if (result.status === 'success') {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(data);
            localStorage.setItem('cart', JSON.stringify(cart));
            window.location.href = 'cart.html';
        } else {
            alert('Ошибка при добавлении товара в корзину.');
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert('Ошибка при добавлении товара в корзину.');
    });
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

function generateOrderId() {
    return 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}
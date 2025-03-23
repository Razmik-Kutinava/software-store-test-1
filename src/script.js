document.addEventListener('DOMContentLoaded', () => {
    // Обработка слайдеров лицензии
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

    // Изменение текста кнопок "Добавить в корзину"
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.textContent = 'Купить сейчас'; // Меняем текст кнопки
    });

    // Обработка кнопок "Добавить в корзину" (отправка данных)
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product'); // Находим карточку товара
            const productName = productCard.querySelector('h3').textContent; // Название товара
            const price = parseFloat(productCard.querySelector('p').textContent.replace('Цена: $', '')); // Цена
            const licenseDuration = productCard.querySelector('.license-slider + span').textContent; // Длительность лицензии
            const version = productCard.querySelector('select').value; // Версия
            const support = productCard.querySelector('input[type="checkbox"][value="support"]').checked ? 'Yes' : 'No'; // Поддержка
            const training = productCard.querySelector('input[type="checkbox"][value="training"]').checked ? 'Yes' : 'No'; // Обучение
            const comments = productCard.querySelector('textarea').value; // Комментарии

            // Формируем объект с данными
            const data = {
                orderId: generateOrderId(),
                productName,
                price,
                licenseDuration,
                version,
                support,
                training,
                comments
            };

            // Отправляем данные в Google Sheets
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
                    alert('Товар добавлен в корзину!');
                } else {
                    alert('Ошибка при добавлении товара в корзину.');
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert('Ошибка при добавлении товара в корзину.');
            });
        });
    });

    // Обновление корзины (если страница корзины существует)
    if (document.getElementById('cart-items')) {
        updateCart();
    }
});

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

function generateOrderId() {
    return 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

document.addEventListener('DOMContentLoaded', () => {
    // Находим все кнопки на странице
    const allButtons = document.querySelectorAll('button');
    
    // Добавляем класс каждой кнопке
    allButtons.forEach(button => {
        button.classList.add('add-to-cart');
    });
});
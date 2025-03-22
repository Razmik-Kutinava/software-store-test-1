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
});
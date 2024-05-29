window.addEventListener('load', function () {
    let formCreateProduct = document.querySelector('form.form-create-product');

    formCreateProduct.addEventListener('submit', function (event) {
        let errors = [];

        let name = document.querySelector('input.name');
        let description = document.querySelector('textarea.description');
        let brand = document.querySelector('select.brand option');
        let warranty = document.querySelector('input.warranty');
        let price = document.querySelector('input.price');
        let discount = document.querySelector('input.discount');
        let stock = document.querySelector('input.stock');
        let category = document.querySelector('select.category option');
        let image = document.querySelector('input.input-image');
        let allowedExtensionsImage = /(.jpg|.jpeg|.png|.gif)$/i;
        let specifications = document.querySelector('textarea.specifications');

        if (name.value === '' || name.value.length < 5) {
            errors.push('Debe ingresar un nombre de producto válido.');
        }
        if (description.value === '' || description.value.length < 20) {
            errors.push('Debe ingresar una descripción válida del producto.');
        }
        if (brand.value === '' || typeof Number(brand.value) !== 'number') {
            errors.push('Debe seleccionar la marca del producto.');
        }
        if (warranty.value === '' || !Number.isInteger(+warranty.value) || +warranty.value < 0) {
            errors.push('Debe ingresar una garantia válida.');
        }
        if (price.value === '' || typeof Number(price.value) !== 'number' || +price.value < 1) {
            errors.push('Debe ingresar un precio válido.')
        }
        if (discount.value === '' || typeof Number(discount.value) !== 'number' || +discount.value < 0 || +discount.value > 99) {
            errors.push('Debe ingresar un descuento válido.');
        }
        if (stock.value === '' || typeof Number(stock.value) !== 'number' || +stock.value < 0) {
            errors.push('Debe ingresar una cantidad de stock válida.');
        }
        if (category.value === '' || typeof Number(category.value) !== 'number') {
            errors.push('Debe seleccionar la categoría del producto.');
        }
        if (image.value !== '' && !allowedExtensionsImage.exec(image.value)) {
            errors.push('Debe cargar un archivo de imagen con extensión .jpeg/.jpg/.png/.gif');
        }
        if (specifications.value === '') {
            errors.push('Falta ingresar las especificaciones.');
        }

        if (errors.length > 0) {
            event.preventDefault();
            let ulErrors = document.querySelector('.errors-create-product ul');
            ulErrors.innerHTML = ``;
            errors.forEach(error => {
                ulErrors.innerHTML += `<li>${error}</li>`;
            });
            formCreateProduct.scrollIntoView();
        }
    });

});
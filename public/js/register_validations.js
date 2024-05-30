window.addEventListener('load', function () {
    let formRegister = document.querySelector('form.form-register');

    formRegister.addEventListener('submit', function (event) {
        let errors = [];

        let nombre = document.querySelector('input[name="nombre"]');
        let apellido = document.querySelector('input[name="apellido"]');
        let email = document.querySelector('input[name="email"]');
        let telefono = document.querySelector('input[name="telefono"]');
        let img = document.querySelector('input[name="img"]');
        let password = document.querySelector('input[name="password"]');
        let passwordConfirmation = document.querySelector('input[name="passwordConfirmation"]');

        let allowedExtensionsImage = /(.jpg|.jpeg|.png|.gif)$/i;

        if (nombre.value === '' || nombre.value.length < 2) {
            errors.push('Debe ingresar un nombre válido.');
        }

        if (apellido.value === '' || apellido.value.length < 2) {
            errors.push('Debe ingresar un apellido válido.');
        }

        if (email.value === '' || !validateEmail(email.value)) {
            errors.push('Debe ingresar un email válido.');
        }

        if (telefono.value === '' || !Number.isInteger(+telefono.value) || telefono.value.length !== 9) {
            errors.push('Debe ingresar un número de teléfono válido.');
        }

        if (img.value !== '' && !allowedExtensionsImage.exec(img.value)) {
            errors.push('Debe cargar un archivo de imagen con extensión .jpeg/.jpg/.png/.gif');
        }

        if (password.value === '' || password.value.length < 6) {
            errors.push('Debe ingresar una contraseña con al menos 6 caracteres.');
        }

        if (passwordConfirmation.value !== password.value) {
            errors.push('Las contraseñas no coinciden.');
        }

        if (errors.length > 0) {
            event.preventDefault();
            let ulErrors = document.querySelector('.form-register .errors ul');
            ulErrors.innerHTML = '';
            errors.forEach(error => {
                ulErrors.innerHTML += `<li>${error}</li>`;
            });
            formRegister.scrollIntoView();
        }
    });

    function validateEmail(email) {
        let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});

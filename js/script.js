"use-strict";

//? Add RegExp function
function verifForm(input, reg) {
    let regEx = new RegExp(reg, 'g');
    return regEx.test(input.value);
};

//! add invalid fonction box
function noValidateForm(firstName, email, object) {
    let spanName = document.querySelector('.err_name');
    let spanEmail = document.querySelector('.err_mail');
    let spanObject = document.querySelector('.err_object');

    !verifForm(firstName, "^[A-Za-z]{3,25}$") ? spanName.innerHTML = "Name invalid" : spanName.innerHTML = "";
    !verifForm(email, "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$") ? spanEmail.innerHTML = "Email invalid" : spanEmail.innerHTML = "";
    !verifForm(object, "^[A-Za-z]{3,20}$") ? spanObject.innerHTML = "Object invalid" : spanObject.innerHTML = "";
}


function validateForm() {
    let form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        noValidateForm(this.firstName, this.email, this.object);

        let myForm = {
            name: this.firstName.value,
            email: this.email.value,
            object: this.object.value,
            message: this.message.value
        };
        let init = {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(myForm)
        };
        if (verifForm(this.firstName, "^[A-Za-z]{3,25}$") &&
            verifForm(this.email, "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$") &&
            verifForm(this.object, "^[A-Za-z]{3,20}$") &&
            verifForm(this.message, "^[A-Za-z]{10,120}$")
        ) {
            fetch("./php/postForm.php", init)
                .then(res => {
                    return res.json()
                })
                .then(res => {
                    console.log(res);
                })
        } else {
            alert('Formulaire Invalid !')
        }

    })
};


validateForm()
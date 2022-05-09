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

    !verifForm(firstName, "^[A-Za-z\\s]{3,25}$") ? spanName.innerHTML = "Name invalid" : spanName.innerHTML = "";
    !verifForm(email, "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$") ? spanEmail.innerHTML = "Email invalid" : spanEmail.innerHTML = "";
    !verifForm(object, "^[A-Za-z\\s]{3,20}$") ? spanObject.innerHTML = "Object invalid" : spanObject.innerHTML = "";

    firstName.value.length < 3 ? spanName.innerHTML = "Name invalid : characters mini 3" : null;
    firstName.value.length > 25 ? spanName.innerHTML = "Name invalid : characters max 25" : null;

    object.value.length < 3 ? spanObject.innerHTML = "object invalid : characters mini 3" : null;
    object.value.length > 20 ? spanObject.innerHTML = "object invalid : characters max 20" : null;

    speChar(firstName, spanName);
    speChar(object, spanObject);

}

function speChar(input, span) {
    let charSpe = "~`!#$%^&*+=-[]\\\';,/{}|\":<>?";

    for (let i = 0; i < input.value.length; i++) {
        if (charSpe.indexOf(input.value.charAt(i)) != -1) {
            span.innerHTML = `${input.name} invalid : cannot use spécial characters`
        }
    }
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
        if (verifForm(this.firstName, "^[A-Za-z\\s]{3,25}$") &&
            verifForm(this.email, "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$") &&
            verifForm(this.object, "^[A-Za-z\\s]{3,20}$")
        ) {
            fetch("./php/postForm.php", init)
                .then(res => {
                    if (res.ok) {
                        let alert = document.getElementById("alert");
                        alert.style.height = "initial";
                        setTimeout(() => {
                            alert.style.height = "0";
                        }, 3500)
                    }
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
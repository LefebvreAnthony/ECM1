"use-strict";


function verifForm(input, reg) {
    let regEx = new RegExp(reg, 'g');
    return regEx.test(input.value);
};

function validateForm() {
    let form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

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
                    console.log(res);
                    res.json();
                })
                .then(res => {
                    console.log(res);
                })
        } else {
            alert("c'est mauvais")
        }

    })
};


validateForm()
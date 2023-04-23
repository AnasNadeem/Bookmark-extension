import { REGISTER_API } from './constants.js';

const loginBtn = document.getElementById('loginBtn');
const registerFormId = document.getElementById('registerFormId');

loginBtn.addEventListener('click', () => {
    document.location = 'login.html';
});

closeBtn.addEventListener("click", () => {
    window.close();
});

registerFormId.addEventListener('submit', (e) => {
    e.preventDefault();
    // const firstName = document.getElementById('firstName').value;
    // const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const messageAlert = document.getElementById('messageAlert');
    const errorMsg = document.getElementById('errorMsg');

    if (!email || !password || !confirmPassword) {
        errorMsg.innerHTML = 'Please enter your email and password';
        messageAlert.style.display = 'block';
        return;
    }

    if (password !== confirmPassword) {
        errorMsg.innerHTML = 'Password and confirm password do not match';
        messageAlert.style.display = 'block';
        return;
    }

    const registerData = {
        'email': email,
        'password': password
    }
    const header = {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(registerData)
    }

    fetch(REGISTER_API, header)
    .then(resp => {
        if(resp.ok){
            return resp.json();
        }
        return Promise.reject(resp);
    })
    .then(data => {
        chrome.storage.local.set({'user': data});
        document.location = 'otp.html';
    })
    .catch((errresp) => {
        errresp.json().then(err => {
            console.log('error:', err)
            let messageAlert = document.getElementById('messageAlert');
            let errorMsg = document.getElementById('errorMsg');
            for (const [key, value] of Object.entries(err)) {
            errorMsg.innerHTML += `${key}: ${value} <br>`;
            }
            if (messageAlert.style.display != 'block'){
                messageAlert.style.display = 'block';
            }
        })
    })

});
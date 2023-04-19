import { LOGIN_API } from './utils.js';

const registerBtn = document.getElementById('registerBtn');

const loginFormId = document.getElementById('loginFormId');
const messageAlert = document.getElementById('messageAlert');
const errorMsg = document.getElementById('errorMsg');

chrome.storage.local.get('user', (data) => {
    if(data.user){
        document.location = 'popup.html';
    }
});

registerBtn.addEventListener('click', () => {
    document.location = 'register.html';
});

closeBtn.addEventListener("click", () => {
    window.close();
});

loginFormId.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;

    if (!emailInput || !passwordInput) {
        alert('Please enter your email and password');
    }

    const loginData = {
        'email': emailInput,
        'password': passwordInput
    }

    const header = {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(loginData)
    }

    fetch(LOGIN_API, header)
    .then(response => {
        if (response.ok){
            return response.json()
        }
        return Promise.reject(response);
    })
    .then(data => {
        if (!data.is_active){
            chrome.storage.local.set({'user': data});
            document.location = 'otp.html';
        } else{
            chrome.storage.local.set({'user': data});
            document.location = 'popup.html';
        }
    })
    .catch((errresp) => {
        errresp.json().then(err => {
            errorMsg.innerHTML = err.error;
            if (messageAlert.style.display != 'block'){
                messageAlert.style.display = 'block';
            }
        })
    })

});
const BASE_API = 'http://127.0.0.1:8000';
const REGISTER_API = `${BASE_API}/api/user`;
const loginBtn = document.getElementById('loginBtn');

const registerFormId = document.getElementById('registerFormId');

loginBtn.addEventListener('click', () => {
    document.location = 'login.html';
});

registerFormId.addEventListener('submit', (e) => {
    // const firstName = document.getElementById('firstName').value;
    // const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const errorMessageAlert = document.getElementById('errorMessageAlert');
    const errorMsg = document.getElementById('errorMsg');

    if (!email || !password || !confirmPassword) {
        errorMsg.innerHTML = 'Please enter your email and password';
        if (errorMessageAlert.style.display != 'block'){
            errorMessageAlert.style.display = 'block';
        }
        return;
    }

    const registerData = {
        'email': email.value,
        'password': password.value
    }
    const header = {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(registerData)
    }

    fetch(REGISTER_API, header)
    .then(resp => {
        if(resp.status===201){
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
            let errorMessageAlert = document.getElementById('errorMessageAlert');
            let errorMsg = document.getElementById('errorMsg');
            for (const [key, value] of Object.entries(err)) {
            errorMsg.innerHTML += `${key}: ${value} <br>`;
            }
            if (errorMessageAlert.style.display != 'block'){
                errorMessageAlert.style.display = 'block';
            }
        })
    })

});
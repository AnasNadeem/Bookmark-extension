const BASE_API = 'http://127.0.0.1:8000';
const LOGIN_API = `${BASE_API}/api/user/login`;
const registerBtn = document.getElementById('registerBtn');

const loginFormId = document.getElementById('loginFormId');

if(chrome.storage.local.get('token', (data) => {
    console.log(data, data.token);
    // if(!data){
    //     document.location = 'login.html';
    // } else {
    //     document.location = 'popup.html';
    // }
}));

registerBtn.addEventListener('click', () => {
    document.location = 'register.html';
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
        document.location = 'popup.html';
    })
    .catch((errresp) => {
        errresp.json().then(err => {
            let errorMessageAlert = document.getElementById('errorMessageAlert');
            let errorMsg = document.getElementById('errorMsg');
            errorMsg.innerHTML = err.error;
            if (errorMessageAlert.style.display != 'block'){
                errorMessageAlert.style.display = 'block';
            }
        })
    })

});
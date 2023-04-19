import { OTP_API } from './utils.js';

const otpFormId = document.getElementById('otpFormId');
const otpInput = document.getElementById('otp');
const successMsg = document.getElementById('successMsg');
const messageAlert = document.getElementById('messageAlert');
const errorMsg = document.getElementById('errorMsg');

closeBtn.addEventListener("click", () => {
    window.close();
});

let user = {}
if(chrome.storage.local.get('user', (data) => {
    if(data.user){
        user = data.user;
        successMsg.innerHTML = `OTP sent to ${data.user.email}`;
        messageAlert.style.display = 'block';
    }
}));

otpFormId.addEventListener('submit', (e) => {
    e.preventDefault();
    const otp = otpInput.value;
    const otpData = {
        'email': user.email,
        'otp': otp
    }
    const header = {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(otpData)
    }
    fetch(OTP_API, header)
    .then(resp => {
        if(resp.status===200){
            return resp.json();
        }
        return Promise.reject(resp);
    })
    .then(data => {
        chrome.storage.local.set({'user': data});
        chrome.storage.local.set({'token': data.token});
        document.location = 'popup.html';
    })
    .catch((errresp) => {
        errresp.json().then(err => {
            console.log('error:', err)
            errorMsg.innerHTML = err.error;
            successMsg.innerHTML = '';
            if (messageAlert.style.display != 'block'){
                messageAlert.style.display = 'block';
            }
        })
    })
});

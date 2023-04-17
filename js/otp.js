const BASE_API = 'http://127.0.0.1:8000';
const OTP_API = `${BASE_API}/api/user/verify_otp`;

const otpFormId = document.getElementById('otpFormId');
const otpInput = document.getElementById('otp');

otpFormId.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = chrome.storage.local.get('user', (data) => {
        return data;
    });
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
        chrome.storage.local.set({'token': data.token});
        document.location = 'popup.html';
    })
    .catch((errresp) => {
        errresp.json().then(err => {
            console.log('error:', err)
            let errorMessageAlert = document.getElementById('errorMessageAlert');
            let errorMsg = document.getElementById('errorMsg');
            errorMsg.innerHTML = err.error;
            if (errorMessageAlert.style.display != 'block'){
                errorMessageAlert.style.display = 'block';
            }
        })
    })
});

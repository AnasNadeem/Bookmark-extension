function _0x5f05(){const _0x4222fe=['21824916BhGWQn','get','local','error','3409217RjFwTs','set','status','error:','popup.html','storage','OTP\x20sent\x20to\x20','application/json','preventDefault','log','email','display','user','close','then','block','addEventListener','innerHTML','location','8bQTGwS','json','12169107FVmzPP','951074nhdEtG','10WUqFsm','style','getElementById','20LqIzQk','reject','8227056kMVTWt','190295blzkxi','11HkJWPI','16jnNifu','349047COgmbm'];_0x5f05=function(){return _0x4222fe;};return _0x5f05();}const _0x3e2f1e=_0xa895;(function(_0x4bb5e3,_0x203584){const _0x231a61=_0xa895,_0x10d36e=_0x4bb5e3();while(!![]){try{const _0x3b6583=parseInt(_0x231a61(0x158))/0x1+-parseInt(_0x231a61(0x161))/0x2*(-parseInt(_0x231a61(0x162))/0x3)+parseInt(_0x231a61(0x15c))/0x4*(parseInt(_0x231a61(0x15f))/0x5)+-parseInt(_0x231a61(0x15e))/0x6+parseInt(_0x231a61(0x142))/0x7*(parseInt(_0x231a61(0x155))/0x8)+parseInt(_0x231a61(0x157))/0x9*(parseInt(_0x231a61(0x159))/0xa)+parseInt(_0x231a61(0x160))/0xb*(-parseInt(_0x231a61(0x163))/0xc);if(_0x3b6583===_0x203584)break;else _0x10d36e['push'](_0x10d36e['shift']());}catch(_0x3576a5){_0x10d36e['push'](_0x10d36e['shift']());}}}(_0x5f05,0xb01f4));import{OTP_API}from'./utils.js';function _0xa895(_0x1f8739,_0x31e8c1){const _0x5f055a=_0x5f05();return _0xa895=function(_0xa89559,_0x4ccbdb){_0xa89559=_0xa89559-0x140;let _0x12a797=_0x5f055a[_0xa89559];return _0x12a797;},_0xa895(_0x1f8739,_0x31e8c1);}const otpFormId=document['getElementById']('otpFormId'),otpInput=document[_0x3e2f1e(0x15b)]('otp'),successMsg=document[_0x3e2f1e(0x15b)]('successMsg'),messageAlert=document['getElementById']('messageAlert'),errorMsg=document['getElementById']('errorMsg');closeBtn[_0x3e2f1e(0x152)]('click',()=>{const _0x370f1c=_0x3e2f1e;window[_0x370f1c(0x14f)]();});let user={};chrome[_0x3e2f1e(0x147)][_0x3e2f1e(0x140)][_0x3e2f1e(0x164)](_0x3e2f1e(0x14e),_0x5c80de=>{const _0xc300c3=_0x3e2f1e;_0x5c80de[_0xc300c3(0x14e)]&&(user=_0x5c80de[_0xc300c3(0x14e)],successMsg[_0xc300c3(0x153)]=_0xc300c3(0x148)+_0x5c80de[_0xc300c3(0x14e)]['email'],messageAlert[_0xc300c3(0x15a)][_0xc300c3(0x14d)]='block');}),otpFormId[_0x3e2f1e(0x152)]('submit',_0x5d985a=>{const _0x4abd6b=_0x3e2f1e;_0x5d985a[_0x4abd6b(0x14a)]();const _0x582f28=otpInput['value'],_0x32b6cd={'email':user[_0x4abd6b(0x14c)],'otp':_0x582f28},_0x1de4ad={'method':'POST','headers':{'Content-Type':_0x4abd6b(0x149)},'body':JSON['stringify'](_0x32b6cd)};fetch(OTP_API,_0x1de4ad)[_0x4abd6b(0x150)](_0x2b6a5e=>{const _0xf157af=_0x4abd6b;if(_0x2b6a5e[_0xf157af(0x144)]===0xc8)return _0x2b6a5e[_0xf157af(0x156)]();return Promise[_0xf157af(0x15d)](_0x2b6a5e);})[_0x4abd6b(0x150)](_0x48983d=>{const _0x158114=_0x4abd6b;chrome[_0x158114(0x147)][_0x158114(0x140)][_0x158114(0x143)]({'user':_0x48983d}),document[_0x158114(0x154)]=_0x158114(0x146);})['catch'](_0xf6cc0b=>{const _0x1c5580=_0x4abd6b;_0xf6cc0b[_0x1c5580(0x156)]()[_0x1c5580(0x150)](_0x3ae608=>{const _0x59fb76=_0x1c5580;console[_0x59fb76(0x14b)](_0x59fb76(0x145),_0x3ae608),errorMsg[_0x59fb76(0x153)]=_0x3ae608[_0x59fb76(0x141)],successMsg['innerHTML']='',messageAlert[_0x59fb76(0x15a)][_0x59fb76(0x14d)]!=_0x59fb76(0x151)&&(messageAlert[_0x59fb76(0x15a)][_0x59fb76(0x14d)]='block');});});});
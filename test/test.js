let acky = new AckyStackUtils({debug: true});
acky.EncryptionUtils().md5Encrypt('1234567890');
acky.EncryptionUtils().passwordEncrypt('1234567890', '1234567890');
acky.EncryptionUtils().sha256Encrypt('1234567890');
acky.CodecUtils().base64Encode('1234567890');
acky.CodecUtils().base64Decode('MTIzNDU2Nzg5MA==');
acky.HttpClient().getRequest('test_data.json').then(res => {
    console.log('Request Succeed');
    console.log(res);
}).catch(err => {
    console.log('err log:', err)
})
let v = acky.FormValidationUtils()
const c = [
    {
        elementId: 'username',
        checkPoints: [
            {
                validator: (v) => acky.regexValidator(v,/^\d+$/),
                invalidMessage: 'username must be all numbers.'
            }
        ],
        requiredMessage: 'your username is required'
    }
]
let asyncValidator = v.createAsync(c);
let triggerValidator = v.createTrigger(c);
asyncValidator.init();
document.getElementById('submit-btn').addEventListener('click',ev => {
    ev.preventDefault();
    triggerValidator.validate();
})

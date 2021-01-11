//create instance
let acky = new AckyStackUtils({
    debug: false,
    formValidationCustomFeedback: {
        onValid: r => {
            console.log('[VALIDATION SUCCESS]: ', r.elementId)
        },
        onInvalid: r => {
            console.log('[VALIDATION INVALID]: ', r.elementId)
        }
    }
});

//md5 encryption
acky.EncryptionUtils().md5Encrypt('1234567890');

//password encryption
acky.EncryptionUtils().passwordEncrypt('1234567890', '1234567890');

//sha256 encryption
acky.EncryptionUtils().sha256Encrypt('1234567890');

//base64 encode
acky.CodecUtils().base64Encode('1234567890');

//base64 decode
acky.CodecUtils().base64Decode('MTIzNDU2Nzg5MA==');

//http request utils
acky.HttpClient().getRequest('test_data.json').then(res => {
    console.log('Request Succeed');
    console.log(res);
}).catch(err => {
    console.log('err log:', err)
});

//form validation utils
let v = acky.FormValidationUtils(); //create instance
//define rules and message
const c = [
    {
        elementId: 'username',
        checkPoints: [
            {
                validator: (v) => acky.regexValidator(v, /^\d+$/),
                invalidMessage: 'username must be all numbers.'
            }
        ],
        requiredMessage: 'your username is required'
    }
];
let asyncValidator = v.createAsync(c); //create async validator listener
let triggerValidator = v.createTrigger(c); //create trigger validator instance
asyncValidator.init(); //start async listening

//trigger validation example
document.getElementById('submit-btn').addEventListener('click', ev => {
    ev.preventDefault();
    triggerValidator.validate();
})

let acky = new AckyStackUtils({debug: true});
acky.EncryptionUtils().md5Encrypt('1234567890');
acky.EncryptionUtils().passwordEncrypt('1234567890', '1234567890');
acky.EncryptionUtils().sha256Encrypt('1234567890');
acky.CodecUtils().base64Encode('1234567890');
acky.CodecUtils().base64Decode('MTIzNDU2Nzg5MA==');
acky.HttpClient().getRequest('test_data.json').then(res => {
    alert('success: ' + res);
}).catch(err => {
    console.log('err log:', err)
})
// let v = acky.FormValidationUtils()
// let asyncValidator = v.createAsync([
//     {
//         elementId: 'username',
//         checkPoints: [
//             {
//                 validator: (value) => /^[13579]|[1-9]\d*[13579]$/.test(value),
//                 invalidMessage: 'username must be all numbers.'
//             }
//         ],
//         requiredMessage: 'your username is required'
//     }
// ]);
// asyncValidator.init();

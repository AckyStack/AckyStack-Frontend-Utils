# AckyStack Front End Utilities

[![npm version](https://badge.fury.io/js/%40ackystack%2Fackystack-utils.svg)](https://badge.fury.io/js/%40ackystack%2Fackystack-utils)    [![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@ackystack/ackystack-utils/badge)](https://www.jsdelivr.com/package/npm/@ackystack/ackystack-utils)    [![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/AckyStack/AckyStack-Frontend-Utils/graphs/commit-activity)    [![Website ackystack.com](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://www.ackystack.com/)    [![GitHub license](https://img.shields.io/github/license/AckyStack/AckyStack-Frontend-Utils.svg)](https://github.com/AckyStack/AckyStack-Frontend-Utils/blob/master/LICENSE)    [![GitHub contributors](https://img.shields.io/github/contributors/AckyStack/AckyStack-Frontend-Utils.svg)](https://GitHub.com/AckyStack/AckyStack-Frontend-Utils/graphs/contributors/)

A utility made for AckyStack front end developers. This utilities toolkit cloud help developers to do some AckyStack
special operations more efficiently. It includes but not limit to: `Codec Module`, `Encryption Module`
and `Http Request Module`. Have fun and be free to use this library!!!

## Install Instruction

##### NPM

```npm install @ackystack/ackystack-utils```

WARNING: The latest 3.0 version haven't officially published!!!

##### YARN

```yarn add @ackystack/ackystack-utils```

WARNING: The latest 3.0 version haven't officially published!!!

##### CDN

Add one of the following tag in your HTML document.

WARNING: The latest 3.0 version haven't officially published!!!

```html

<script src="https://cdn.jsdelivr.net/gh/AckyStack/AckyStack-Frontend-Utils/dist/ackystack-utils.min.js"></script>
```

or a specific version (IF YOU WANT USE 3.0 PLEASE USE THIS METHOD)

```html

<script src="https://cdn.jsdelivr.net/gh/AckyStack/AckyStack-Frontend-Utils@dev_3.0/dist/ackystack-utils.min.js"></script>
```

## Usage (for 3.0)

```javascript
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

```

more and more methods coming up ~

## Contributing

**All contributions are super welcome!**

## Contact us

Please contact us if you need any help or just chill out:

- **Skype Group (English support provided):** https://join.skype.com/PSa6F48kLSE9
- **Telegram group (English support provided):** https://t.me/ackystack
- **Discord:** `coming soon~`
- **QQ Group (Chinese):**  `644487246`






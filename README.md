# AckyStack Front End Utilities

[![npm version](https://badge.fury.io/js/%40ackystack%2Fackystack-utils.svg)](https://badge.fury.io/js/%40ackystack%2Fackystack-utils)	[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@ackystack/ackystack-utils/badge)](https://www.jsdelivr.com/package/npm/@ackystack/ackystack-utils)	[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/AckyStack/AckyStack-Frontend-Utils/graphs/commit-activity)	[![Website ackystack.com](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://www.ackystack.com/)	[![GitHub license](https://img.shields.io/github/license/AckyStack/AckyStack-Frontend-Utils.svg)](https://github.com/AckyStack/AckyStack-Frontend-Utils/blob/master/LICENSE)	[![GitHub contributors](https://img.shields.io/github/contributors/AckyStack/AckyStack-Frontend-Utils.svg)](https://GitHub.com/AckyStack/AckyStack-Frontend-Utils/graphs/contributors/)

A utility made for AckyStack front end developers. This utilities toolkit cloud help developers to do some AckyStack special operations more efficiently. It includes but not limit to: `Codec Module`, `Encryption Module` and `Http Request Module`. Have fun and be free to use this library!!!



## Install Instruction

##### NPM

execute the following command

```npm install @ackystack/ackystack-utils```



##### YARN

execute the following command

```yarn add @ackystack/ackystack-utils```



##### CDN

Add one of the following tag in your HTML document.

```<script src="https://cdn.jsdelivr.net/npm/@ackystack/ackystack-utils@latest/dist/ackystack-utils.min.js"></script>```

 or a specific version 

```<script src="https://cdn.jsdelivr.net/npm/@ackystack/ackystack-utils@2.0.0/dist/ackystack-utils.min.js"></script>```



## Usage

```javascript
    // instantiate with default configuration
    let asu = new AckyStackUtils();

    /** Encryption Utils*/

	//This method will do exactly what you think (return a string)
    asu.EncryptionUtils().sha256Encrypt();
	//This method will do exactly what you think (return a string)
    asu.EncryptionUtils().md5Encrypt();     
	//This method will do exactly what you think (return a string)
    asu.EncryptionUtils().passwordEncrypt();


    /** Codec Utils*/

	//This method will do exactly what you think (return a string)
    asu.CodecUtils().base64Encode();
	//This method will do exactly what you think (return a string)
    asu.CodecUtils().base64Decode();


    /** HTTP Request Utils*/
    
    // send a get request with axios
    asu.RequestUtils().get('url', {a: 'hello', b: 1234123}).then(response => {
        //When the request success and also gets feedback from the server...
        console.log(response.ret);
        console.log(response.msg);
        console.log(response.data);
    }).catch(reason => {
        //When the request faild to send, or server send error feedback...
        //the 'reason' will be either a server response, or a Promise error.
        console.log(reason);
    })
    
    //send a post request with axios
    //The post method has three arguments, as you can tell what first and second is. 
	//The third argument is called 'isForm',
    //I'm sure about you can tell what does it do from the name.
    asu.RequestUtils().post('url', {a: 'hello', b: 1234123}, true).then(response => {
        //do something...
    }).catch(reason => {
        //do something else...
    })

```

**more and more methods coming up ~**

---

## Contributing

**All contributions are super welcome!**

---

## Contact us

**Please contact us if you need any help or just chill out:**

- **Skype Group (English support provided):** https://join.skype.com/PSa6F48kLSE9
- **Telegram group (English support provided):** https://t.me/ackystack
- **Discord:** `coming soon~`
- **QQ Group (Chinese):**  `644487246`






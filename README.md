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

## form validation regex

### 数据验证规则类型表

| Key Name  | 说明  | 
| -------------------- | -------------------- |
| **字符基本格式**|  | 
| english              | 纯英文字母 |
| chinese              | 纯中文 |
| alphanum             | 字母和数字组合 |
| upper                | 需有大写 |
| lower                | 需有小写 |
| hasLetter            | 需有字母 |
| hasDigit             | 需有数字 |
| hasSpec              | 需有特殊字符，!@#$%^&*?() |
| nospace              | 不含有空格 |
| nospec               | 不含特殊字符 |
| nodbc                | 不含全角特殊字符 |
| norepeat             | 不含任何重复字符 |
| **数字格式**|  | 
| float                | 可含浮点的数字 |
| integer              | 整数 |
| positivefloat        | 正的数字 |
| positiveint          | 正整数 |
| decimal              | 小数点1位及以上 |
| currency             | 货币，2小数，带分号|
| percent              | 百分数 |
| score                | 考试分数，小数部分只能为.5 |
| even                 | 偶数 |
| odd                  | 奇数 |
| **时间格式** |  | 
| date                 | 日期 2017-7-7或2017/7/7，0补位非必须，含大小月、闰月检测  |
| time                 | 时间 12:12:12，时分秒个位须0补位 |
| datetime             | 日期 + 时间 如2017-07-07 12:02:02, 0补位非必须 |
| year                 | 年份 1900-2099 |
| month                | 月份 1-12，不带补位，下同 |
| day                  | 日 1-31 |
| hour                 | 小时 0-23 |
| minute               | 分钟 0-59 |
| hmt                  | 时分，格式：10:59 |
| **账号信息格式** |  | 
| qq                   | QQ号 5-11位 | 
| age                  | 年龄 0-129岁 | 
| account              | 符合ackystack标准的用户名，仅允许字母、数字、下划线和破折号 |
| password             | 密码，最少1大写字母、1小写字母、1数字，没限制长度 |
| complexPassword      | 复杂密码，最少1大写字母、1小写字母、1数字、1特殊字符，没限制长度 |
| mobile               | 手机13700000000，融合2017新号规则, 即包括16/19等开头的，+86、86可选 |
| telphone             | 电话手机混合 |
| phone                | 固话，可带分机, +86、86可选 |
| idcard               | 身份证，含地区、生日、验证数等规则，不含尾号验证 |
| **区域信息格式** |  | 
| zipcode              | 邮编 | 
| citycode             | 6位地区代码
| address              | 住址，必须含中文、县/区/旗/乡/镇/街道/州的某项名称 ||
| autocard             | 车牌号码，支持新能源车牌号及港澳等 |
| longitude            | 地理位置——经度，度制，小数点1~15位 |
| latitude             | 地理位置——纬度，度制，小数点1~15位 |
| londms               | 地理位置——经度，度分秒制 |
| latdms               | 地理位置——纬度，度分秒制 |
| **网络地址格式** |  | 
| email                | 邮箱地址 |
| url                  | 网址（包括http、ftp、ws） |
| ip                   | IPv4地址 |
| ipv6                 | IPV6地址 |
| port                 | 端口 |
| mac                  | MAC地址 |
| domain               | 合法域名 |
| ftp                  | ftp地址 |
| http                 | http地址 |
| ws                   | websocket地址 |
| thunder              | 迅雷协议地址 |
| ed2k                 | 电驴协议地址 |
| magnet               | 磁力链地址 |
| imgurl               | web网页图片地址 |
| **商业代码格式** |  | 
| bizcode              | 统一信用代码  |
| passport             | 护照代码  |
| ticker               | 股票代码  |
| invoice              | 增值税发票代码 |
| bankcard             | 银行卡号（宽泛型）|
| pbcard               | 银行卡号（仅限国内个人卡）|
| isbn                 | 书号（仅限13位）|
| approval             | 文号 政字〔2004〕第18号 或 政字[2004] 18号 |
| **编码格式**|  | 
| ascii                | ASCII码 |
| base64               | BASE64码 |
| md5                  | md5码 |
| uuid                 | UUID码，连接线-非必须 |
| hex                  | 十六进制字符串 |
| color                | 颜色码，16进制，三位或六位，#非必须 |
| jwt                  | JSON Web Token字符串|
| tag                  | 闭合标签元素|
| **文件格式**|  | 
| file                 | 合法文件名 |
| path                 | 合法文件路径名，含目录 |
| linuxfile            | linux推荐文件名 |
| doc                  | 合法文档文件名 |

All of these copied from https://github.com/wujianqi/qi-validator


------

more and more methods coming up ~

## Contributing

**All contributions are super welcome!**

## Contact us

Please contact us if you need any help or just chill out:

- **Skype Group (English support provided):** https://join.skype.com/PSa6F48kLSE9
- **Telegram group (English support provided):** https://t.me/ackystack
- **Discord:** `coming soon~`
- **QQ Group (Chinese):**  `644487246`






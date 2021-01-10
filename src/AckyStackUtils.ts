import FormValidator from "./ValidationUtils";
import CodecUtils from "./CodecUtils";
import {AxiosInstance, AxiosPromise} from "axios";
import EncryptionUtils from "./EncryptionUtils";
import RequestUtils from "./RequestUtils";
import {rulesRegex} from "./ValidationUtils/rules";

interface Configuration {
    debug?: boolean,
    requestCustomFeedback?: RequestCustomFeedback,
    formValidationCustomFeedback?: FormValidationCustomFeedback
}

interface RequestCustomFeedback {
    onSuccess: onSuccess,

    onError: onError,

    onInfo: onInfo,

    onWarning: onWarning
}

interface FormValidationCustomFeedback {
    onValid: onValid,

    onInvalid: onInvalid
}

export default class AckyStackUtils {
    private configuration: Configuration = {
        debug: false,
        requestCustomFeedback: {
            onError: message => {
                console.error(`错误: ${message}`)
                alert(`错误: ${message}`)
            },
            onInfo: message => {
                console.info(`信息: ${message}`)
                alert(`信息: ${message}`)
            },
            onSuccess: message => {
                console.log(`成功: ${message}`)
                alert(`成功: ${message}`)
            },
            onWarning: message => {
                console.warn(`警告：${message}`)
                alert(`警告: ${message}`)
            }
        },
        formValidationCustomFeedback: {
            onValid: res => {
                console.log(`表单验证成功`);
            },
            onInvalid: res => {
                console.error(`表单验证错误, element ID: ${res.elementId}, message: ${res.message}`);
            }
        }
    };

    constructor(configuration?: Configuration) {
        if (configuration !== undefined || null) {

            if (configuration.debug !== undefined || null) {
                this.configuration.debug = configuration.debug
            }

            if (configuration.requestCustomFeedback !== undefined || null) {
                if (configuration.requestCustomFeedback.onError !== undefined || null) {
                    this.configuration.requestCustomFeedback.onError = configuration.requestCustomFeedback.onError;
                }

                if (configuration.requestCustomFeedback.onWarning !== undefined || null) {
                    this.configuration.requestCustomFeedback.onWarning = configuration.requestCustomFeedback.onWarning;
                }

                if (configuration.requestCustomFeedback.onInfo !== undefined || null) {
                    this.configuration.requestCustomFeedback.onInfo = configuration.requestCustomFeedback.onInfo;
                }

                if (configuration.requestCustomFeedback.onSuccess !== undefined || null) {
                    this.configuration.requestCustomFeedback.onSuccess = configuration.requestCustomFeedback.onSuccess;
                }
            }

            if (configuration.formValidationCustomFeedback !== undefined || null) {
                if (configuration.formValidationCustomFeedback.onInvalid === undefined || null) {
                    this.configuration.formValidationCustomFeedback.onInvalid = configuration.formValidationCustomFeedback.onInvalid;
                }

                if (configuration.formValidationCustomFeedback.onValid === undefined || null) {
                    this.configuration.formValidationCustomFeedback.onValid = configuration.formValidationCustomFeedback.onValid;
                }
            }

        }

        if (this.configuration.debug) {
            console.log('AckyStackUtils 实例初始化成功！');
        }
    }

    FormValidationUtils() {
        return new FormValidator(r => this.configuration.formValidationCustomFeedback.onValid(r), r => this.configuration.formValidationCustomFeedback.onInvalid(r))
    }

    CodecUtils(): CodecUtilsType {
        return <CodecUtilsType>{
            base64Encode: str => {
                const result: string = new CodecUtils(str).base64Encode();
                if (this.configuration.debug) console.log(`Base64 Encode Result: ${result}`)
                return result
            },
            base64Decode: str => {
                const result: string = new CodecUtils(str).base64Decode();
                if (this.configuration.debug) console.log(`Base64 Decode Result: ${result}`)
                return result
            }
        }
    }

    EncryptionUtils(): EncryptionUtilsType {
        return <EncryptionUtilsType>{
            md5Encrypt: str => {
                const result: string = new EncryptionUtils(str).md5();
                if (this.configuration.debug) console.log(`MD5 Encryption Result: ${result}`)
                return result;
            },
            passwordEncrypt: (username: string, password: string) => {
                const result: string = new EncryptionUtils(password).encryptPassword(username);
                if (this.configuration.debug) console.log(`Password Encryption Result: ${result}`)
                return result;
            },
            sha256Encrypt: str => {
                const result: string = new EncryptionUtils(str).sha256();
                if (this.configuration.debug) console.log(`SHA256 Encryption Result: ${result}`)
                return result;
            }
        }
    }

    HttpClient(): HttpClientUtilsType {
        const that = this;
        const client = new RequestUtils({
            success: message => {
                that.configuration.requestCustomFeedback.onSuccess(message);
            },
            error: message => {
                that.configuration.requestCustomFeedback.onError(message);
            },
            info: message => {
                that.configuration.requestCustomFeedback.onInfo(message);
            },
            warn: message => {
                that.configuration.requestCustomFeedback.onWarning(message);
            }
        })
        return <HttpClientUtilsType>{
            postRequest: (url, data, isForm): AxiosPromise => {
                if (!isForm) {
                    client.postWithBody(url, data);
                }
                return client.post(url, data);
            },
            getRequest: (url, data): AxiosPromise => {
                return client.get(url, data);
            },
            instance: (): AxiosInstance => {
                return client.instance();
            }
        }
    }

    regexValidator(value: string, regex: RegExp): boolean {
        return regex.test(value);
    }

    regexRuleSet() {
        return rulesRegex
    }
}

type onSuccess = (message: string) => void;

type onError = (message: string) => void;

type onInfo = (message: string) => void;

type onWarning = (message: string) => void;

type onValid = (res: validationFeedbackResult) => void;

type onInvalid = (res: validationFeedbackResult) => void;

type validationFeedbackResult = {
    elementId: string,
    validationResult: boolean,
    message?: string,
}

type CodecUtilsType = {
    base64Encode(str: string): string,
    base64Decode(str: string): string
}

type EncryptionUtilsType = {
    md5Encrypt(str: string): string;
    passwordEncrypt(username: string, password: string): string;
    sha256Encrypt(str: string): string;
}

type HttpClientUtilsType = {
    postRequest(url: string, data: object, isForm?: boolean): AxiosPromise;
    getRequest(url: string, data?: object): AxiosPromise;
    instance(): AxiosInstance;
}

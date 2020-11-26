import {AxiosInstance, AxiosPromise} from "axios";
import CodecUtilsImpl from "./impl/CodecUtils";
import EncryptionUtilsImpl from "./impl/EncryptionUtils";
import RequestUtilsImpl from "./impl/RequestUtils";


interface RequestUtils {
    /**
     * Send post request to server
     * @param url - The url that you want send request to
     * @param data - The data that you want include in parameter
     * @param isForm - (default true) If true will use header 'content-type: application/x-www-form-urlencoded', otherwise will put json data in body
     */
    post(url: string, data: object, isForm?: boolean): AxiosPromise;

    /**
     * Send get request to server
     * @param url - The url that you want send request to
     * @param data - The data that you want include in url query
     */
    get(url: string, data?: object): AxiosPromise;

    /**
     * Get Axios Instance to customize more things!
     */
    instance(): AxiosInstance
}

interface CodecUtils {
    /**
     * Base64 Encode
     * @param str - the text you want encode
     * @return the encoded string
     */
    base64Encode(str: string): string;

    /**
     * Base64 Decode
     * @param str - the text you want decode
     * @return the decoded string
     */
    base64Decode(str: string): string;
}

interface EncryptionUtils {
    /**
     * MD5 Encryption (32bit lower case)
     * @param str plain text that you want encrypt
     * @return encrypted string
     */
    md5Encrypt(str: string): string;

    /**
     * Calculate Hashed Password
     * @param username - username
     * @param password - plain password
     */
    passwordEncrypt(username: string, password: string): string;

    /**
     * SHA256 Encryption
     * @param str - plain text
     */
    sha256Encrypt(str: string): string;
}

interface OnSuccess {
    (message: string): void;
}

interface OnError {
    (message: string): void;
}

interface OnInfo {
    (message: string): void;
}

interface OnWarning {
    (message: string): void;
}

interface CustomFeedback {
    onSuccess?: OnSuccess;
    onError?: OnError;
    onWarning?: OnWarning;
    onInfo?: OnInfo;
}

type success = (msg: string) => void;
type info = (msg: string) => void;
type error = (msg: string) => void;
type warning = (msg: string) => void;

class AckyStackUtils {
    private readonly _debug: boolean = false;

    /**
     * Constructor of AckyStack Utils
     * @param customFeedback
     * @param debug
     */
    constructor(customFeedback?: CustomFeedback, debug?: boolean) {
        if (customFeedback !== undefined) {
            if (customFeedback.onSuccess !== undefined) {
                this.success = customFeedback.onSuccess;
            }
            if (customFeedback.onError !== undefined) {
                this.error = customFeedback.onError;
            }
            if (customFeedback.onWarning !== undefined) {
                this.warning = customFeedback.onWarning;
            }
            if (customFeedback.onInfo !== undefined) {
                this.info = customFeedback.onInfo;
            }
        }
        if (debug) {
            this._debug = true;
        }
    }


    CodecUtils(): CodecUtils {
        return {
            base64Encode: str => {
                const result: string = new CodecUtilsImpl(str).base64Encode();
                if (this._debug) console.log(`Base64 Encode Result: ${result}`)
                return result;
            },
            base64Decode: str => {
                const result: string = new CodecUtilsImpl(str).base64Decode();
                if (this._debug) console.log(`Base64 Decode Result: ${result}`)
                return result;
            }
        }
    }

    EncryptionUtils(): EncryptionUtils {
        return {
            md5Encrypt: str => {
                const result: string = new EncryptionUtilsImpl(str).md5();
                if (this._debug) console.log(`MD5 Encryption Result: ${result}`)
                return result;
            },
            passwordEncrypt: (username, password) => {
                const result: string = new EncryptionUtilsImpl(password).hashPasswd(username);
                if (this._debug) console.log(`Password Encryption Result: ${result}`)
                return result;
            },
            sha256Encrypt: (str) => {
                const result: string = new EncryptionUtilsImpl(str).sha256();
                if (this._debug) console.log(`SHA256 Encryption Result: ${result}`)
                return result;
            }
        }
    }

    RequestUtils(): RequestUtils {
        const axios = new RequestUtilsImpl({
            error: (message: string) => {
                this.error(message)
            },
            info: (message: string) => {
                this.info(message)
            },
            warn: (message: string) => {
                this.warning(message)
            },
            success: (message: string) => {
                this.success(message)
            }
        });

        return {
            post: (url: string, data: object, isForm?: boolean): AxiosPromise => {
                if (isForm) {
                    return axios.post(url, data);
                }
                return axios.postBody(url, data);
            },
            get: (url: string, data?: object): AxiosPromise => {
                return axios.get(url, data);
            },
            instance: (): AxiosInstance => {
                return axios.instance();
            }
        };
    }

    private readonly success: success = msg => alert(msg);

    private readonly info: info = msg => alert(msg);

    private readonly error: error = msg => alert(msg);

    private readonly warning: warning = msg => alert(msg);

}

export default AckyStackUtils;

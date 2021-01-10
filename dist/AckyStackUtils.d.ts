import FormValidator from "./ValidationUtils";
import { AxiosInstance, AxiosPromise } from "axios";
interface Configuration {
    debug?: boolean;
    requestCustomFeedback?: RequestCustomFeedback;
    formValidationCustomFeedback?: FormValidationCustomFeedback;
}
interface RequestCustomFeedback {
    onSuccess: onSuccess;
    onError: onError;
    onInfo: onInfo;
    onWarning: onWarning;
}
interface FormValidationCustomFeedback {
    onValid: onValid;
    onInvalid: onInvalid;
}
export default class AckyStackUtils {
    private configuration;
    constructor(configuration?: Configuration);
    FormValidationUtils(): FormValidator;
    CodecUtils(): CodecUtilsType;
    EncryptionUtils(): EncryptionUtilsType;
    HttpClient(): HttpClientUtilsType;
    regexValidator(value: string, regex: RegExp): boolean;
    regexRuleSet(): {
        required: RegExp;
        english: RegExp;
        alphanum: RegExp;
        chinese: RegExp;
        upper: RegExp;
        lower: RegExp;
        hasLetter: RegExp;
        hasDigit: RegExp;
        hasSpec: RegExp;
        nospace: RegExp;
        nodbc: RegExp;
        norepeat: RegExp;
        nospec: RegExp;
        qq: RegExp;
        age: RegExp;
        zipcode: RegExp;
        ip: RegExp;
        ipv6: RegExp;
        port: RegExp;
        domain: RegExp;
        bizcode: RegExp;
        invoice: RegExp;
        bankcard: RegExp;
        pbcard: RegExp;
        ticker: RegExp;
        passport: RegExp;
        score: RegExp;
        currency: RegExp;
        float: RegExp;
        positivefloat: RegExp;
        integer: RegExp;
        positiveint: RegExp;
        decimal: RegExp;
        percent: RegExp;
        even: RegExp;
        odd: RegExp;
        email: RegExp;
        url: RegExp;
        ftp: RegExp;
        http: RegExp;
        ws: RegExp;
        account: RegExp;
        password: RegExp;
        hex: RegExp;
        color: RegExp;
        ascii: RegExp;
        base64: RegExp;
        md5: RegExp;
        uuid: RegExp;
        mobile: RegExp;
        telphone: RegExp;
        phone: RegExp;
        year: RegExp;
        month: RegExp;
        day: RegExp;
        hour: RegExp;
        minute: RegExp;
        hmt: RegExp;
        time: RegExp;
        date: RegExp;
        datetime: RegExp;
        idcard: RegExp;
        autocard: RegExp;
        longitude: RegExp;
        latitude: RegExp;
        londms: RegExp;
        latdms: RegExp;
        approval: RegExp;
        citycode: RegExp;
        address: RegExp;
        isbn: RegExp;
        tag: RegExp;
        jwt: RegExp;
        mac: RegExp;
        mask: RegExp;
        thunder: RegExp;
        ed2k: RegExp;
        magnet: RegExp;
        path: RegExp;
        file: RegExp;
        linuxfile: RegExp;
        imgurl: RegExp;
        doc: RegExp;
    };
}
declare type onSuccess = (message: string) => void;
declare type onError = (message: string) => void;
declare type onInfo = (message: string) => void;
declare type onWarning = (message: string) => void;
declare type onValid = (res: validationFeedbackResult) => void;
declare type onInvalid = (res: validationFeedbackResult) => void;
declare type validationFeedbackResult = {
    elementId: string;
    validationResult: boolean;
    message?: string;
};
declare type CodecUtilsType = {
    base64Encode(str: string): string;
    base64Decode(str: string): string;
};
declare type EncryptionUtilsType = {
    md5Encrypt(str: string): string;
    passwordEncrypt(username: string, password: string): string;
    sha256Encrypt(str: string): string;
};
declare type HttpClientUtilsType = {
    postRequest(url: string, data: object, isForm?: boolean): AxiosPromise;
    getRequest(url: string, data?: object): AxiosPromise;
    instance(): AxiosInstance;
};
export {};

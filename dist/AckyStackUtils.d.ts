import { AxiosInstance, AxiosPromise } from "axios";
interface RequestUtils {
    post(url: string, data: object, isForm?: boolean): AxiosPromise;
    get(url: string, data?: object): AxiosPromise;
    instance(): AxiosInstance;
}
interface CodecUtils {
    base64Encode(str: string): string;
    base64Decode(str: string): string;
}
interface EncryptionUtils {
    md5Encrypt(str: string): string;
    passwordEncrypt(username: string, password: string): string;
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
declare class AckyStackUtils {
    private readonly _debug;
    constructor(customFeedback?: CustomFeedback, debug?: boolean);
    CodecUtils(): CodecUtils;
    EncryptionUtils(): EncryptionUtils;
    RequestUtils(): RequestUtils;
    private readonly success;
    private readonly info;
    private readonly error;
    private readonly warning;
}
export default AckyStackUtils;

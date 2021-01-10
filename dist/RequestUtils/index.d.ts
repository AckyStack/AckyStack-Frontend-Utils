import { AxiosInstance, AxiosPromise } from "axios";
declare type onSuccess = (message: string) => void;
declare type onError = (message: string) => void;
declare type onInfo = (message: string) => void;
declare type onWarning = (message: string) => void;
interface FeedbackControl {
    success: onSuccess;
    error: onError;
    info: onInfo;
    warn: onWarning;
}
export declare type ServerResponse = {
    ret: number;
    msg?: string;
    data?: object;
};
export default class RequestUtils {
    private readonly axiosInstance;
    private feedbacks;
    constructor(feedback: FeedbackControl);
    post(url: string, data: object): AxiosPromise;
    postWithBody(url: string, data: object): AxiosPromise;
    get(url: string, data?: object): AxiosPromise;
    instance(): AxiosInstance;
    private configInstance;
    private configInterceptor;
}
export {};

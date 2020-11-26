import { AxiosInstance, AxiosPromise } from 'axios';
interface RequestUtilsInterface {
    post(url: string, data: object): AxiosPromise;
    postBody(url: string, data: object): AxiosPromise;
    get(url: string, data?: object): AxiosPromise;
    instance(): AxiosInstance;
}
export declare type ServerResponse = {
    ret: number;
    msg?: string;
    data?: any;
};
interface FeedbackMethods {
    success(msg: string): void;
    error(msg: string): void;
    warn(msg: string): void;
    info(msg: string): void;
}
export default class RequestUtilsImpl implements RequestUtilsInterface {
    private readonly _axiosInstance;
    private _feedback;
    constructor(feedback: FeedbackMethods);
    post(url: string, data: object): AxiosPromise;
    postBody(url: string, data: object): AxiosPromise;
    get(url: string, data?: object): AxiosPromise;
    instance(): AxiosInstance;
    private setResponseInterceptor;
    private setRequestConfig;
}
export {};

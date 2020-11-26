import Axios, {AxiosInstance, AxiosPromise, AxiosResponse} from 'axios'
import * as QueryString from "qs";

interface RequestUtilsInterface {

    post(url: string, data: object): AxiosPromise;

    postBody(url: string, data: object): AxiosPromise;

    get(url: string, data?: object): AxiosPromise;

    instance(): AxiosInstance
}

export type ServerResponse = {
    ret: number;
    msg?: string;
    data?: any;
}

interface FeedbackMethods {
    success(msg: string): void;

    error(msg: string): void;

    warn(msg: string): void;

    info(msg: string): void;
}

export default class RequestUtilsImpl implements RequestUtilsInterface {
    private readonly _axiosInstance: AxiosInstance;
    private _feedback: FeedbackMethods;

    constructor(feedback: FeedbackMethods) {
        this._feedback = feedback;
        this._axiosInstance = Axios.create({timeout: 12 * 1000});
        this.setRequestConfig();
        this.setResponseInterceptor();
    }

    post(url: string, data: object): AxiosPromise {
        return this._axiosInstance.post(url, QueryString.stringify(data));
    }

    postBody(url: string, data: object): AxiosPromise {
        return this._axiosInstance.post(url, data);
    }

    get(url: string, data?: object): AxiosPromise {
        return this._axiosInstance.get(url, data);
    }

    instance(): AxiosInstance {
        return this._axiosInstance
    }

    private setResponseInterceptor(): void {
        this._axiosInstance.interceptors.response.use((response: AxiosResponse<ServerResponse>): Promise<any> => {
            if (response.status < 200 || response.status >= 300) {
                this._feedback.error(response.statusText);
                return Promise.reject(response);
            }
            const resp: ServerResponse = response.data;
            if (!resp.ret) {
                return Promise.reject(resp);
            }
            if (resp.ret === 0) {
                return Promise.resolve(resp);
            }
            switch (resp.ret) {
                case -1:
                    this._feedback.warn(resp.data[Object.keys(resp.data)[0]]);
                    break;
                case -2:
                    this._feedback.error('访问的资源未找到或不存在');
                    break;
                case -3:
                    this._feedback.error('请求的方法不支持或不正确');
                    break;
                case -4:
                    this._feedback.error('请求的资源未授权或无权限');
                    break;
                case -5:
                    this._feedback.warn('登录状态失效，请您重新登录');
                    break;
                case -6:
                    this._feedback.error('请求的操作被禁止');
                    break;
                case -7:
                    this._feedback.error('您已登录，请勿重复登录');
                    break;
                case -50:
                    this._feedback.error('系统繁忙，请稍后重试');
                    break;
            }
            return Promise.reject(resp)
        }, (error) => {
            if (!error['ret']) {
                this._feedback.error(error.message)
            }
            return Promise.reject(error)
        })
    }

    private setRequestConfig(): void {
        this._axiosInstance.defaults.withCredentials = true;
        this._axiosInstance.defaults.responseType = "json";
    }
}

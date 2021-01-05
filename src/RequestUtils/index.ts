import Axios, {AxiosInstance, AxiosPromise, AxiosResponse} from "axios";
import * as QueryString from "qs";

type onSuccess = (message: string) => void;

type onError = (message: string) => void;

type onInfo = (message: string) => void;

type onWarning = (message: string) => void;

interface FeedbackControl {
    success: onSuccess,

    error: onError,

    info: onInfo,

    warn: onWarning
}

export type ServerResponse = {
    ret: number;
    msg?: string;
    data?: object;
}
export default class RequestUtils {
    private readonly axiosInstance: AxiosInstance;
    private feedbacks: FeedbackControl;

    constructor(feedback: FeedbackControl) {
        this.feedbacks = feedback;
        this.axiosInstance = Axios.create({timeout: 12 * 1000})
        this.configInstance();
        this.configInterceptor();
    }

    post(url: string, data: object): AxiosPromise {
        return this.axiosInstance.post(url, QueryString.stringify(data));
    }

    postWithBody(url: string, data: object): AxiosPromise {
        return this.axiosInstance.post(url, data);
    }

    get(url: string, data?: object): AxiosPromise {
        return this.axiosInstance.get(url, data);
    }

    instance(): AxiosInstance {
        return this.axiosInstance
    }

    private configInstance(): void {
        this.axiosInstance.defaults.withCredentials = true;
        this.axiosInstance.defaults.responseType = "json";
    }

    private configInterceptor(): void {
        this.axiosInstance.interceptors.response.use((response: AxiosResponse<ServerResponse>): Promise<any> => {
            if (response.status < 200 || response.status >= 300) {
                this.feedbacks.error(response.statusText);
                return Promise.reject(response);
            }
            const resp: ServerResponse = response.data;
            if (resp.ret === undefined || resp.ret === null) {
                return Promise.reject(resp);
            }
            if (resp.ret === 0) {
                return Promise.resolve(resp);
            }
            switch (resp.ret) {
                case -1:
                    this.feedbacks.warn(resp.data[Object.keys(resp.data)[0]]);
                    break;
                case -2:
                    this.feedbacks.error('访问的资源未找到或不存在');
                    break;
                case -3:
                    this.feedbacks.error('请求的方法不支持或不正确');
                    break;
                case -4:
                    this.feedbacks.error('请求的资源未授权或无权限');
                    break;
                case -5:
                    this.feedbacks.warn('登录状态失效，请您重新登录');
                    break;
                case -6:
                    this.feedbacks.error('请求的操作被禁止');
                    break;
                case -7:
                    this.feedbacks.error('您已登录，请勿重复登录');
                    break;
                case -50:
                    this.feedbacks.error('系统繁忙，请稍后重试');
                    break;
            }
            return Promise.reject(resp)
        }, (error) => {
            if (!error['ret']) {
                this.feedbacks.error(error.message)
            }
            return Promise.reject(error)
        });
    }
}

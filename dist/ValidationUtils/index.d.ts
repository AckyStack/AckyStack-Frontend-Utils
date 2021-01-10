interface FormInputRules {
    elementId: string;
    checkPoints: rule[];
    requiredMessage: string;
}
declare type customValidator = (value: string) => boolean;
declare type validationFeedbackResult = {
    elementId: string;
    validationResult: boolean;
    message?: string;
};
declare type rule = {
    validator: customValidator;
    invalidMessage: string;
};
declare type onValid = (res: validationFeedbackResult) => void;
declare type onInvalid = (res: validationFeedbackResult) => void;
interface FeedbackStylesControl {
    onValid: onValid;
    onError: onInvalid;
}
export default class FormValidator {
    private readonly feedback;
    constructor(onValid: onValid, onInvalid: onInvalid);
    createAsync(inputs: FormInputRules[]): FormValidatorAsyncBuilder;
    createTrigger(inputs: FormInputRules[]): FormValidatorTriggerBuilder;
}
declare class FormValidatorAsyncBuilder {
    private inputs;
    private result;
    private feedback;
    constructor(inputs: FormInputRules[], feedback: FeedbackStylesControl);
    init(): this;
    destroy(): void;
    getResult(): boolean;
    private onValid;
    private onInvalid;
    private validateHandler;
}
declare class FormValidatorTriggerBuilder {
    private inputs;
    private result;
    private feedback;
    constructor(inputs: FormInputRules[], feedback: FeedbackStylesControl);
    validate(): this;
    private onValid;
    private onInvalid;
    private check;
    getResult(): boolean;
}
export {};

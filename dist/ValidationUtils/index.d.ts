interface FormInputRules {
    elementId: string;
    checkPoints: rule[];
    requiredMessage: string;
}
declare type customValidator = (value: string) => boolean;
declare type rule = {
    validator: customValidator;
    invalidMessage: string;
};
declare type onValid = () => void;
declare type onInvalid = (message: string) => void;
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

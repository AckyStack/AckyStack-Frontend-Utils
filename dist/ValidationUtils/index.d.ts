interface FormInputRules {
    elementId: string;
    checkPoints: rule[];
    requiredMessage: string;
}
declare type rule = {
    validator: (value: string) => boolean;
    invalidMessage: string;
    validMessage: string;
};
interface FeedbackStylesControl {
    onValid(): void;
    onError(msg: string): void;
}
export default class FormValidator {
    private readonly feedback;
    constructor(onValid: () => void, onInvalid: (msg: string) => void);
    createAsync(inputs: FormInputRules[]): FormValidatorAsyncBuilder;
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
export {};

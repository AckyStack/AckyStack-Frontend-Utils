interface FormInputRules {
    elementId: string,
    checkPoints: rule[]
    requiredMessage: string
}

type customValidator = (value: string) => boolean;

type validationFeedbackResult = {
    elementId: string,
    validationResult: boolean,
    message?: string,
}

type rule = {
    validator: customValidator,
    invalidMessage: string,
}

type onValid = (res: validationFeedbackResult) => void;

type onInvalid = (res: validationFeedbackResult) => void;

interface FeedbackStylesControl {
    onValid: onValid,
    onError: onInvalid
}

export default class FormValidator {
    private readonly feedback: FeedbackStylesControl;

    constructor(onValid: onValid, onInvalid: onInvalid) {
        this.feedback = {
            onValid: onValid,
            onError: onInvalid
        }
    }

    createAsync(inputs: FormInputRules[]): FormValidatorAsyncBuilder {
        return new FormValidatorAsyncBuilder(inputs, this.feedback);
    }

    createTrigger(inputs: FormInputRules[]): FormValidatorTriggerBuilder {
        return new FormValidatorTriggerBuilder(inputs, this.feedback);
    }
}

class FormValidatorAsyncBuilder {
    private inputs: FormInputRules[];
    private result: boolean = false;
    private feedback: FeedbackStylesControl;

    constructor(inputs: FormInputRules[], feedback: FeedbackStylesControl) {
        this.inputs = inputs;
        this.feedback = feedback;
    }

    init(): this {
        this.inputs.forEach(value => {
            document.getElementById(value.elementId).addEventListener('input', evt => {
                this.validateHandler(evt, value);
            }, false);
            document.getElementById(value.elementId).addEventListener('propertychange', evt => {
                this.validateHandler(evt, value);
            }, false);
        });
        return this
    }

    destroy(): void {
        this.inputs.forEach(value => {
            document.getElementById(value.elementId).removeEventListener('input', evt => {
                this.validateHandler(evt, value);
            }, false);
            document.getElementById(value.elementId).removeEventListener('propertychange', evt => {
                this.validateHandler(evt, value);
            }, false);
        });
    }

    getResult(): boolean {
        return this.result;
    }

    private onValid(cfg: validationFeedbackResult) {
        this.feedback.onValid(cfg);
        this.result = true;
    }

    private onInvalid(cfg: validationFeedbackResult) {
        this.feedback.onError(cfg);
        this.result = false;
    }

    private validateHandler(evt: Event, fieldRuleSet: FormInputRules): void {
        const that = this;
        console.log('校验事件');
        console.log(evt.target['value']);
        let resObj: validationFeedbackResult = {
            elementId: fieldRuleSet.elementId,
            validationResult: false
        };
        if (evt.target['value'] === undefined || evt.target['value'] === null) {
            resObj.message = fieldRuleSet.requiredMessage;
            this.onInvalid(resObj);
            console.log('错误：undefined 或 null');
            return;
        }
        if (!/.+/.test(evt.target['value'])) {
            resObj.message = fieldRuleSet.requiredMessage;
            this.onInvalid(resObj);
            console.log('错误：required');
            return;
        }
        let r: boolean[] = [];
        for (const cp of fieldRuleSet.checkPoints) {
            that.result = cp.validator(evt.target['value']);
            r.push(that.result);
            if (!that.result) {
                resObj.message = cp.invalidMessage;
                this.onInvalid(resObj);
                break;
            }
        }
        if (!r.includes(false)) {
            resObj.validationResult = that.result;
            this.onValid(resObj);
        }
    }
}

class FormValidatorTriggerBuilder {
    private inputs: FormInputRules[];
    private result: boolean = false;
    private feedback: FeedbackStylesControl;

    constructor(inputs: FormInputRules[], feedback: FeedbackStylesControl) {
        this.inputs = inputs;
        this.feedback = feedback;
    }

    validate(): this {
        this.inputs.forEach(value => {
            this.check(document.getElementById(value.elementId)['value'], value)
        });
        return this;
    }

    private onValid(res: validationFeedbackResult) {
        this.feedback.onValid(res);
        this.result = true;
    }

    private onInvalid(res: validationFeedbackResult) {
        this.feedback.onError(res);
        this.result = false;
    }

    private check(val: string, fieldRuleSet: FormInputRules): void {
        const that = this;
        let resObj: validationFeedbackResult = {
            elementId: fieldRuleSet.elementId,
            validationResult: false
        };
        if (val === undefined || val === null) {
            resObj.message = fieldRuleSet.requiredMessage;
            this.onInvalid(resObj);
            console.log('错误：undefined 或 null');
            return;
        }
        if (!/.+/.test(val)) {
            resObj.message = fieldRuleSet.requiredMessage;
            this.onInvalid(resObj);
            console.log('错误：required');
            return;
        }
        let r: boolean[] = [];
        for (const cp of fieldRuleSet.checkPoints) {
            that.result = cp.validator(val);
            r.push(that.result);
            if (!that.result) {
                resObj.message = cp.invalidMessage;
                this.onInvalid(resObj);
                break;
            }
        }
        if (!r.includes(false)) {
            resObj.validationResult = that.result;
            this.onValid(resObj);
        }
    }

    getResult(): boolean {
        return this.result;
    }
}

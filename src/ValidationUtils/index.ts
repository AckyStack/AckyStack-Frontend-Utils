interface FormInputRules {
    elementId: string,
    checkPoints: rule[]
    requiredMessage: string
}

type customValidator = (value:string)=>boolean;

type rule = {
    validator: customValidator,
    invalidMessage: string,
}
type onValid = () => void;

type onInvalid = (message: string) => void;

interface FeedbackStylesControl {
    onValid:onValid,
    onError:onInvalid
}

export default class FormValidator {
    private readonly feedback: FeedbackStylesControl;

    constructor(onValid:onValid, onInvalid:onInvalid) {
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

    private onValid() {
        this.feedback.onValid();
        this.result = true;
    }

    private onInvalid(msg: string) {
        this.feedback.onError(msg);
        this.result = false;
    }

    private validateHandler(evt: Event, fieldRuleSet: FormInputRules): void {
        const that = this;
        console.log('校验事件');
        console.log(evt.target['value']);
        if (evt.target['value'] === undefined || evt.target['value'] === null) {
            this.onInvalid(fieldRuleSet.requiredMessage);
            console.log('错误：undefined 或 null');
            return;
        }
        if (!/.+/.test(evt.target['value'])) {
            this.onInvalid(fieldRuleSet.requiredMessage);
            console.log('错误：required');
            return;
        }
        let r:boolean[]=[];
        for (const cp of fieldRuleSet.checkPoints) {
            that.result = cp.validator(evt.target['value']);
            r.push(that.result);
            if (!that.result){
                this.onInvalid(cp.invalidMessage);
                break;
            }
        }
        if (!r.includes(false)){
            this.onValid();
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
           this.check(document.getElementById(value.elementId)['value'],value)
        });
        return this;
    }
    private onValid() {
        this.feedback.onValid();
        this.result = true;
    }

    private onInvalid(msg: string) {
        this.feedback.onError(msg);
        this.result = false;
    }
    private check(val:string,fieldRuleSet: FormInputRules):void{
        const that = this;
        if (val === undefined || val === null) {
            this.onInvalid(fieldRuleSet.requiredMessage);
            console.log('错误：undefined 或 null');
            return;
        }
        if (!/.+/.test(val)) {
            this.onInvalid(fieldRuleSet.requiredMessage);
            console.log('错误：required');
            return;
        }
        let r:boolean[]=[];
        for (const cp of fieldRuleSet.checkPoints) {
            that.result = cp.validator(val);
            r.push(that.result);
            if (!that.result){
                this.onInvalid(cp.invalidMessage);
                break;
            }
        }
        if (!r.includes(false)){
            this.onValid();
        }
    }

    getResult(): boolean {
        return this.result;
    }
}

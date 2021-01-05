interface FormInputRules {
    elementId: string,
    checkPoints: rule[]
    requiredMessage: string
}

type rule = {
    validator: (value: string) => boolean,
    invalidMessage: string,
    validMessage: string
}
type onValid = () => void;

type onInvalid = (message: string) => void;

interface FeedbackStylesControl {
    onValid(): void;

    onError(msg: string): void;
}

export default class FormValidator {
    private readonly feedback: FeedbackStylesControl;

    constructor(onValid: () => void, onInvalid: (msg: string) => void) {
        this.feedback = {
            onValid: onValid,
            onError: onInvalid
        }
    }

    createAsync(inputs: FormInputRules[]): FormValidatorAsyncBuilder {
        return new FormValidatorAsyncBuilder(inputs, this.feedback);
    }

    // createTrigger(inputs: FormInputRules[]): FormValidatorTriggerBuilder {
    //     return new FormValidatorTriggerBuilder(inputs, this._feedback);
    // }
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
        console.log('校验事件');
        this.feedback.onError('test invalid');
        return;
        console.log(evt.target['value']);
        if (evt.target['value'] === undefined || evt.target['value'] === null) {
            this.onInvalid(fieldRuleSet.requiredMessage);
            return;
        }
        if (/.+/.test(evt.target['value'])) {
            this.onInvalid(fieldRuleSet.requiredMessage);
            return;
        }
        let a = 0;
        fieldRuleSet.checkPoints.forEach(cp => {
            console.log('规则检查 ' + a);
            const cpResult = cp.validator(evt.target['value']);
            console.log(cpResult)
            if (!cpResult) {
                this.onInvalid(cp.invalidMessage);
                return;
            }
            a++;
        });
    }
}

// class FormValidatorTriggerBuilder {
//     private _inputs: FormInputRules[];
//     private _result: boolean = false;
//     private _feedback: FeedbackStylesControl;
//
//     constructor(inputs: FormInputRules[], feedback: FeedbackStylesControl) {
//         this._inputs = inputs;
//         this._feedback = feedback;
//     }
//
//     valid(): this {
//         return this;
//     }
//
//     getResult(): boolean {
//         return this._result;
//     }
// }

import {Base64} from "js-base64";

export default class CodecUtils {
    private readonly text: string;

    constructor(text: string) {
        if (!text) {
            throw new Error('The parameter \'text\' cannot be empty, you have to provide value');
        }
        this.text = text;
    }

    base64Decode(): string {
        return Base64.decode(this.text);
    }

    base64Encode(): string {
        return Base64.encode(this.text);
    }
}

import { ValueObjectBase } from "src/libs";
import { IsEmpty } from "src/libs/validations";

export class NameValueObject extends ValueObjectBase<string>{

    constructor(value?: string) {
        super(value)
    }

    validateData(): void {
        // if (!this.hasErrors()) {
        //     this.validateName()
        //     this.validateEmpty()
        // }
    }

    private validateName() {
        if (typeof (this.value) !== "string") {
            const error = {
                field: "Name",
                message: `Passed value ${this.value} is not a string`
            }
            this.setError(error)
        }
    }

    private validateEmpty() {
        if (IsEmpty(this.value)) {
            const error = {
                field: "Name",
                message: `Passed value ${this.value} appears to be empty`
            }
            this.setError(error)
        }
    }
}

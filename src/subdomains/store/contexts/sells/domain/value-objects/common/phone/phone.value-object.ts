import { IsPhone, ValueObjectBase } from "src/libs";

export class PhoneValueObject extends ValueObjectBase<number>{
    constructor(value?: number) {
        super(value)
    }

    validateData(): void {
        // if (!this.hasErrors()) {
        //     this.validatePhone()
        // }
    }

    private validatePhone(): void {

        if (this.value && !isNaN(this.value)) {
            const error = {
                field: "Phone",
                message: `${this.value} is not a valid number`
            }
            this.setError(error)
        }

        if (!IsPhone(this.value)) {
            const error = {
                field: "Phone",
                message: `${this.value} is not a valid phone`
            }
            this.setError(error)
        }
    }
}

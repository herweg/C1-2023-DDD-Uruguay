import { ValueObjectBase } from "src/libs";
import { IsNumber } from "src/libs/validations/is-number.validations";

export class PriceValueObject extends ValueObjectBase<number>{
    constructor(value?: number) {
        super(value)
    }

    validateData(): void {
        if (!this.hasErrors()) {
            this.validatePrice()
            this.validatePositive()
        }
    }

    private validatePrice(): void {
        if (this.value && isNaN(this.value)) {
            const error = {
                field: "Price",
                message: `${this.value} is not a valid number`
            }
            this.setError(error)
        }
    }

    private validatePositive(): void {
        if (this.value < 0) {
            const error = {
                field: "Price",
                message: `${this.value} is negative`
            }
            this.setError(error)
        }
    }
}

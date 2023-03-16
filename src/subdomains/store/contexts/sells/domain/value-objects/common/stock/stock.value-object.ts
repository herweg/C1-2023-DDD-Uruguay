import { ValueObjectBase } from "src/libs"

export class StockValueObject extends ValueObjectBase<number>{
    constructor(value?: number) {
        super(value ? value : 3)
    }

    validateData(): void {
        if (!this.hasErrors()) {
            this.validateStock()
            this.validatePositive()
        }
    }

    private validateStock(): void {
        if (this.value && isNaN(this.value)) {
            const error = {
                field: "Stock",
                message: `${this.value} is not a valid number`
            }
            this.setError(error)
        }
    }

    private validatePositive(): void {
        if (this.value < 0) {
            const error = {
                field: "Stock",
                message: `${this.value} is negative`
            }
            this.setError(error)
        }
    }
}
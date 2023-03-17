import { ValueObjectBase } from "src/libs"

export class DateValueObject extends ValueObjectBase<Date>{
    constructor(value?: Date) {
        super(value)
    }

    validateData(): void {
        if (!this.hasErrors()) {
            this.validateDate()
        }
    }

    private validateDate(): void {
        if (isNaN(this.value.getTime())) {
            const error = {
                field: "Date",
                message: `is not a valid date`
            }
            this.setError(error)
        }
    }
}

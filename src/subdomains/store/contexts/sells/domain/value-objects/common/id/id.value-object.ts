import { ValueObjectBase } from "src/libs";
import { IsUUID } from "src/libs/validations";
import { v4 as uuid } from 'uuid';

export class IdValueObject extends ValueObjectBase<string>{
    constructor(value?: string) {
        super(value ? value : uuid())
    }

    validateData(): void {
        // if (!this.hasErrors()) {
        //     this.validateStructure()
        // }
    }

    private validateStructure(): void {
        if (this.value && IsUUID(this.value) === false) {
            const error = {
                field: "CounterID",
                message: "The provided ID is not a valid UUID"
            }
            this.setError(error)
        }
    }
}

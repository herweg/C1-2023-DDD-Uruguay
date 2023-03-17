import { DateValueObject } from "./";

describe("Nombre correcto", () => {
  it("test name", () => {

    const value = new Date("2026-02-15 00:00:00")

    const NameClient = new DateValueObject(value);

    NameClient.validateData();

    expect(NameClient.hasErrors()).toBeFalsy();
    const errors = NameClient.getErrors();

    if (errors.length > 0) {
      expect(errors[0].field).toEqual('Date');
      expect(errors[0].message).toBe('is not a valid date');
    }

  })
})
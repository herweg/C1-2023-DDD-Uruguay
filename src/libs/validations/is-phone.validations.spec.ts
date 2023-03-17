import { IsPhone } from "./";


describe('IsPhone', () => {
    let validador: typeof IsPhone
  
    // Antes de todas las pruebas
    beforeAll(() => {})
  
    // Antes de cada prueba
    beforeEach(() => {
      // Arrange
      validador = IsPhone
    })
  
    it('esto debería definir la función', () => {
      // Assert
      expect(validador).toBeDefined()
    })
  
    it('debería ser verdadero', () => {
      // Arrange
      const phone = 099123456
      const expected = true
  
      // Act
      const result = validador(phone)
  
      // Assert
      expect(result).toEqual(expected)
    })
  
    it('debería ser falso', () => {
      // Arrange
      const phone = 99999050581
      const expected = false
  
      // Act
      const result = validador(phone)
  
      // Assert
      expect(result).toEqual(expected)
    })
  
    // Despues de cada prueba
    afterEach(() => {
      jest.clearAllMocks();
    })
  
    // Despues de todas las pruebas
    afterAll(() => {
      jest.restoreAllMocks();
    })
  })
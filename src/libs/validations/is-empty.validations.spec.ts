import { IsEmpty } from ".";


describe('IsEmpty', () => {
    let validador: typeof IsEmpty
  
    // Antes de todas las pruebas
    beforeAll(() => {})
  
    // Antes de cada prueba
    beforeEach(() => {
      // Arrange
      validador = IsEmpty
    })
  
    it('esto debería definir la función', () => {
      // Assert
      expect(validador).toBeDefined()
    })
  
    it('debería ser verdadero', () => {
      // Arrange
      const empty = ""
      const expected = true
  
      // Act
      const result = validador(empty)
  
      // Assert
      expect(result).toEqual(expected)
    })
  
    it('debería ser falso', () => {
      // Arrange
      const empty = "http:testcom"
      const expected = false
  
      // Act
      const result = validador(empty)
  
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
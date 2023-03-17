import { IsUUID } from ".";


describe('IsUUID', () => {
    let validador: typeof IsUUID
  
    // Antes de todas las pruebas
    beforeAll(() => {})
  
    // Antes de cada prueba
    beforeEach(() => {
      // Arrange
      validador = IsUUID
    })
  
    it('esto debería definir la función', () => {
      // Assert
      expect(validador).toBeDefined()
    })
  
    it('debería ser verdadero', () => {
      // Arrange
      const uuid = "1d8b4c0d-a875-43da-a1bb-c7a17047b81b"
      const expected = true
  
      // Act
      const result = validador(uuid)
  
      // Assert
      expect(result).toEqual(expected)
    })
  
    it('debería ser falso', () => {
      // Arrange
      const uuid = "http:testcom"
      const expected = false
  
      // Act
      const result = validador(uuid)
  
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
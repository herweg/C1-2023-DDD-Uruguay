import { IsUrl } from "./";


describe('IsUrl', () => {
    let validador: typeof IsUrl
  
    // Antes de todas las pruebas
    beforeAll(() => {})
  
    // Antes de cada prueba
    beforeEach(() => {
      // Arrange
      validador = IsUrl
    })
  
    it('esto debería definir la función', () => {
      // Assert
      expect(validador).toBeDefined()
    })
  
    it('debería ser verdadero', () => {
      // Arrange
      const url = "http://test.com"
      const expected = true
  
      // Act
      const result = validador(url)
  
      // Assert
      expect(result).toEqual(expected)
    })
  
    it('debería ser falso', () => {
      // Arrange
      const url = "http:testcom"
      const expected = false
  
      // Act
      const result = validador(url)
  
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
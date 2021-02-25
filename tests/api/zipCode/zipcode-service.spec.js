const zipCodeService = require('../../../src/api/zipCode/zipcode-service')
const zipCodeRepositoryHelper = require('../../../src/api/zipCode/zipcode-repository')
const zipCodeRecord = require('./zipcode-fakeData')
const axios = require('axios')

describe('Tests on zipCode subject at service responsability', () => {

    
    test('Test findZipCode method when zip code is located on first search', async (done) => {
        const mockRepository = jest.spyOn(zipCodeRepositoryHelper, 'findOne')
        mockRepository.mockReturnValue(zipCodeRecord)

        const mockAxios = jest.spyOn(axios, 'get')
        mockAxios.mockResolvedValue({data: { erro : true}} )

        const result = await zipCodeService.findZipCode('14400000')
        expect(result).toBe(zipCodeRecord)
        done()

    })

    test('Test findZipCode method when zip code not is located on first search and can`t find any record', async (done) => {
        const mockRepository = jest.spyOn(zipCodeRepositoryHelper, 'findOne')
        mockRepository.mockReturnValue(null)

        const mockWebSearch = jest.spyOn(zipCodeService, 'webSearch')
        mockWebSearch.mockReturnValue(null)

        const mockAxios = jest.spyOn(axios, 'get')
        mockAxios.mockResolvedValue({data: { erro : true}} )

        const result = await zipCodeService.findZipCode('19999999')
        expect(result).toBe(null)
        done()
    })

    test('Test findZipCode method when zip code not is located on first search and find the last record', async (done) => {
        jest.restoreAllMocks()

        const mockedResult = {
            zipCode : "14403206",
            address : "Rua Ana Maria Pinho Gonçalves",
            district: "Parque do Castelo",
            city: "Franca",
            state: "SP"
        }

        const mockResponse = {
            cep: "14403-206",
            logradouro: "Rua Ana Maria Pinho Gonçalves",
            complemento: "",
            bairro: "Parque do Castelo",
            localidade: "Franca",
            uf: "SP",
            ibge: "3516200",
            gia: "3104",
            ddd: "16",
            siafi: "6425"
          }

        const mockAxios = jest.spyOn(axios, 'get')
        mockAxios.mockResolvedValue({data: mockResponse} )

        const result = await zipCodeService.findZipCode('17777777')
        expect(result).toEqual(mockedResult)

        done()
    })

    test('Test the save and update a zip code', async () =>{
        const mockedResult = {
            zipCode : "11122233",
            address : "Avenida teste",
            district: "Centro",
            city: "Rio de Janeiro",
            state: "RJ"
        }

        let result = zipCodeService.saveZipCode(mockedResult)
        expect(result).toEqual(mockedResult)

        mockedResult.address = 'Avenida alteração'
        result = zipCodeService.saveZipCode(mockedResult)
        expect(result).toEqual(mockedResult)

    })

    test('Test the delete a zip code that does not exist', async () =>{
        const mockRepository = jest.spyOn(zipCodeRepositoryHelper, 'destroy')
        mockRepository.mockReturnValue(false)

        const result = zipCodeService.deleteZipCode('55555555')
        expect(result).toEqual(false)
    })

    it("should do something", function (done) {
        request(app())
        .get('/zipcode/14403206')
        .expect('GET', done)
    })

})
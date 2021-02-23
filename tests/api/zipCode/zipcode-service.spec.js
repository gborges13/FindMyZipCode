const zipCodeService = require('../../../src/api/zipCode/zipcode-service')
const zipCodeRepositoryHelper = require('../../../src/api/zipCode/zipcode-repository')
const zipCodeRecord = require('./zipcode-fakeData')

describe('Tests on zipCode subject at service responsability', () => {

    test('Test findZipCode method when zip code is located on first search', async () => {
        const mockRepository = jest.spyOn(zipCodeRepositoryHelper, 'findOne')
        mockRepository.mockReturnValue(zipCodeRecord)

        const result = zipCodeService.findZipCode('14400000')
        expect(result).toBe(zipCodeRecord)

    })

    test('Test findZipCode method when zip code not is located on first search and can`t find any record', async () => {
        const mockRepository = jest.spyOn(zipCodeRepositoryHelper, 'findOne')
        mockRepository.mockReturnValue(null)

        const result = zipCodeService.findZipCode('19999999')
        expect(result).toBe(null)
    })

    test('Test findZipCode method when zip code not is located on first search and find the last record', async () => {
        jest.restoreAllMocks()        
        const mockedResult = {
            zipCode : "10000000",
            address : "Avenida Paulista",
            district: "Centro",
            city: "São Paulo",
            state: "SP"
        }

        const result = zipCodeService.findZipCode('17777777')
        expect(result).toEqual(mockedResult)
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
        const result = zipCodeService.deleteZipCode('55555555')
        expect(result).toEqual(false)
    })

    test('Test the delete a zip code', async () =>{
        const result = zipCodeService.deleteZipCode('11122233')
        expect(result).toEqual(true)
    })

})
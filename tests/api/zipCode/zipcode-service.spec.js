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

})
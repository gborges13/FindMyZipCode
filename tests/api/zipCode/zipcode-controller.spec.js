const zipCodeController = require('../../../src/api/zipCode/zipcode-controller')
const zipCodeServiceHelper = require('../../../src/api/zipCode/zipcode-service')
const zipCodeRecord = require('./zipCode-fakeData')

describe('Tests on zipCode subject at controller responsability', () => {

    test('Test getZipCode method when zip code not found', async () => {
        const mockZipCodeService = jest.spyOn(zipCodeServiceHelper, 'findZipCode')
        mockZipCodeService.mockReturnValue(null)

        let request = {body : {zipCode : "89403206"}}

        let {response} = require('express')
        response.json = (data) => {
            response.body = JSON.stringify(data)
            return response
        }

        const result = zipCodeController.getZipCode(request, response)
        
        expect(result.statusCode).toEqual(404)
    })


    test('Test getZipCode method when body is invalid', async () => {
        const mockZipCodeService = jest.spyOn(zipCodeServiceHelper, 'findZipCode')
        mockZipCodeService.mockReturnValue(zipCodeRecord)

        let request = {params : {zipCode : "14400000"}, body : {}}

        let {response} = require('express')
        response.json = (data) => {
            response.body = JSON.stringify(data)
            response.statusCode = 200
            return response
        }

        const result = zipCodeController.getZipCode(request, response)
        
        expect(result.statusCode).toEqual(200)
    })


})    
const zipCodeController = require('../../../src/api/zipCode/zipcode-controller')
const zipCodeServiceHelper = require('../../../src/api/zipCode/zipcode-service')
const zipCodeRecord = require('./zipcode-fakeData')
const expressValidator = require('express-validator')

describe('Tests on zipCode subject at controller responsability', () => {

    test('Test getZipCode method when zip code not found', async (done) => {
        const mockZipCodeService = jest.spyOn(zipCodeServiceHelper, 'findZipCode')
        mockZipCodeService.mockReturnValue(null)

        let request = {params : {zipCode : "89403206"}}

        let {response} = require('express')
        response.json = (data) => {
            response.body = JSON.stringify(data)
            return response
        }

        const result = await zipCodeController.getZipCode(request, response)
        
        expect(result.statusCode).toEqual(404)
        done()
    })

    test('Test getZipCode method when body is invalid', async (done) => {
        const mockZipCodeService = jest.spyOn(zipCodeServiceHelper, 'findZipCode')
        mockZipCodeService.mockReturnValue(zipCodeRecord)

        let request = {params : {zipCode : "14400000"}, body : {}}

        let {response} = require('express')
        response.json = (data) => {
            response.body = JSON.stringify(data)
            response.statusCode = 200
            return response
        }

        const result = await zipCodeController.getZipCode(request, response)
        
        expect(result.statusCode).toEqual(200)
        done()
    })

    test('Test getZipCode method when an error occurred', async () => {
        const mockZipCodeService = jest.spyOn(zipCodeServiceHelper, 'findZipCode')
        mockZipCodeService.mockImplementation(() => {
            throw new Error();
        })

        let request = {params : {zipCode : "14400000"}, body : {}}

        let {response} = require('express')
        response.json = (data) => {
            response.body = JSON.stringify(data)
            response.statusCode = 200
            return response
        }

        const result = await zipCodeController.getZipCode(request, response)
        
        expect(result.statusCode).toEqual(200)
    })

    test('Test postZipCode method', async () => {
        let newZipCode = {
            zipCode : '14407123',
            address : 'Av. Princial',
            district: 'Distrito Industrial',
            city: 'Franca',
            state: 'SP'
        }

        const mockZipCodeService = jest.spyOn(zipCodeServiceHelper, 'saveZipCode')
        mockZipCodeService.mockReturnValue(newZipCode)

        let request = {body : newZipCode}

        let {response} = require('express')
        response.json = (data) => {
            response.body = JSON.stringify(data)
            return response
        }

        const result = zipCodeController.postZipCode(request, response)
        
        expect(result.statusCode).toEqual(201)
        expect(JSON.parse(result.body)).toEqual(newZipCode)
    })

    test('Test postZipCode method when an error occurred', async () => {
        let newZipCode = {
            zipCode : '14407123',
            address : 'Av. Princial',
            district: 'Distrito Industrial',
            city: 'Franca',
            state: 'SP'
        }

        const mockZipCodeService = jest.spyOn(zipCodeServiceHelper, 'saveZipCode')
        mockZipCodeService.mockImplementation(() => {
            throw new Error();
        })

        let request = {body : newZipCode}

        let {response} = require('express')
        response.json = (data) => {
            response.body = JSON.stringify(data)
            return response
        }

        const result = zipCodeController.postZipCode(request, response)
        
        expect(result.statusCode).toEqual(500)        
    })

    test('Test deleteZipCode method', async () => {
        const mockZipCodeService = jest.spyOn(zipCodeServiceHelper, 'deleteZipCode')
        mockZipCodeService.mockReturnValue(true)

        let request = {params : {zipcode : '14407123'}}
        let {response} = require('express')
        response.send = (data) => {            
            return response
        }        

        const result = zipCodeController.deleteZipCode(request, response)
       
        expect(result.statusCode).toEqual(204)
    })   

    test('Test deleteZipCode method when record not found', async () => {
        const mockZipCodeService = jest.spyOn(zipCodeServiceHelper, 'deleteZipCode')
        mockZipCodeService.mockReturnValue(false)

        let request = {params : {zipcode : '14407123'}}
        let {response} = require('express')
        response.json = (data) => {
            response.body = JSON.stringify(data)
            return response
        }        

        const result = zipCodeController.deleteZipCode(request, response)
       
        expect(result.statusCode).toEqual(404)        
    })    

    test('Test deleteZipCode method when an error occurred', async () => {
        const mockZipCodeService = jest.spyOn(zipCodeServiceHelper, 'deleteZipCode')
        mockZipCodeService.mockImplementation(() => {
            throw new Error();
        })

        let request = {params : {zipcode : '14407123'}}
        let {response} = require('express')
        response.json = (data) => {
            response.body = JSON.stringify(data)
            return response
        }        

        const result = zipCodeController.deleteZipCode(request, response)
       
        expect(result.statusCode).toEqual(500)
    })

})    
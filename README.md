
# FindMyZipCode

This api find an zipcode and return your address

  

# Stacks

- nodejs
- express framework
- docker
- docker-compose

  

# Installation

Installation is done using the npm install command:

  

`$ npm install express`

  # Docker
Before start the application you need up the redis service, for this in path root you need do command:

`docker-compose up`

# Run application

Start is done using the npm command:

  

`$ npm run local`

  

# Environment variables

    NODO_ENV=development
    
    PORT=3000
    
    SECURITY_ENABLED=false
    SECRET_TOKEN=FindMyZipCodePrivateToken
    
    REDIS_HOST=localhost
    REDIS_PORT=6379
    REDIS_EXPIRATION_MINUTES=360
    
    SEARCH_SERVICE=http://viacep.com.br/ws/

  

# Security

This api use an JWT Token to authenticate all requests, for use insert the key 'Authorization' on headers
  

Valid token example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTM5NDQ5NDF9.XzqVCh8oGa1_rElG1cvBi_JKVH58j0DVNCyH7oEquUs

  

# Swagger documentation

Swagger documentation is acessible on http://host:port/api-docs

Example: http://localhost:3000/api-docs/
  

# Metrics

The application metrics is acessible on [new relic](https://one.newrelic.com/launcher/nr1-core.explorer?pane=eyJlbnRpdHlJZCI6Ik16QTJOelUyTW54QlVFMThRVkJRVEVsRFFWUkpUMDU4T0RFd09EWTFOelkzIiwiaXNPdmVydmlldyI6dHJ1ZSwibmVyZGxldElkIjoiYXBtLW5lcmRsZXRzLm92ZXJ2aWV3In0=&sidebars%5B0%5D=eyJuZXJkbGV0SWQiOiJucjEtY29yZS5hY3Rpb25zIiwiZW50aXR5SWQiOiJNekEyTnpVMk1ueEJVRTE4UVZCUVRFbERRVlJKVDA1OE9ERXdPRFkxTnpZMyIsInNlbGVjdGVkTmVyZGxldCI6eyJuZXJkbGV0SWQiOiJhcG0tbmVyZGxldHMub3ZlcnZpZXciLCJpc092ZXJ2aWV3Ijp0cnVlfX0=&platform%5BtimeRange%5D%5Bduration%5D=1800000&platform%5B$isFallbackTimeRange%5D=false)

![metrics](https://i.ibb.co/Hx65SQQ/New-Realic-Metrics.jpg)

  

# Tests

To run the test, first install the dependencies, then run npm command:

  

`$ npm test`

  

# Architecture

  

In this API the principle of single responsibility was applied, based on SOLID


Defining:

Routes is responsible for defining the routes in the api rest.

Controller is responsible for validating the request information and calling the desired service.

Services is responsible for the business rules of the application.

Repository is responsible for storing application information.
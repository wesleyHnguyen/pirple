/**
 * Request handlers
 */

// Dependencies
const _data = require('./data')
const helpers = require('./helpers');
const config = require('./config')


// Define the handlers
const handlers = {};


// Users
handlers.users = function(data, callback) {

    let acceptableMethods = ['post', 'get', 'put', 'delete']

    if(acceptableMethods.indexOf(data.method) > -1) {
        handlers._users[data.method](data, callback)
    } else {
        callback(405)
    }
}

// Container for the users submethods
handlers._users = {};

// Users - post
// Required data: firstName, lastName, phone, password, tosAgreement
// Optional data: none
handlers._users.post = async function(data) {
    // check that all required fields are filled out
    let firstName = typeof(data.payload.firstName) === 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
    let lastName = typeof(data.payload.lastName) === 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false; 
    let phone = typeof(data.payload.phone) === 'string' && data.payload.phone.trim().length === 10 ? data.payload.phone.trim() : false; 
    let password = typeof(data.payload.password) === 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false; 
    let tosAgreement = typeof(data.payload.tosAgreement) === 'boolean' && data.payload.tosAgreement === true ? true : false; 
    

    if(firstName && lastName && phone && password && tosAgreement) {

       try {
           
            let user = await _data.read('users', phone)

            throw new Error('')

       } catch (error) {
       
            

       }

    }else {
        
        
    }

}

// Ping handler
handlers.ping = function(data, callback) {
    callback(200);
}

// Not found handler
handlers.notfound = function(data, callback) {

    callback(404);

}

// Export the module
module.exports = handlers;
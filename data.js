/**
 * Library for storing and editing data
 */

// Dependencies
const fsPromises = require('fs').promises;
const path = require('path');
const helpers = require('./helpers');

// Container for the module (to be exported)
let lib = {}

// Base directory of the data folder
lib.baseDir = path.join(__dirname, '/../.data/');

// Write data to a file
lib.create = async function(dir, file, data) {
    
    try {
        // Open the file for writing
        const open = await fsPromises.open(lib.baseDir+dir+'/'+file +'.json', 'wx')         
        let stringData = JSON.stringify(data)
        
        // Write the string data to the file
        await fsPromises.writeFile(open, stringData, 'utf8')

    } catch (err) {
        
        throw new Error('Could not create new file, it may already exist');

    }
}


// Read data from a file
lib.read = async function(dir, file) {

    try {

        const result = await  fsPromises.readFile(lib.baseDir+dir+'/'+file+'.json', 'utf8');
        
        return helpers.parseJsonToObject(result);

    } catch (err) {
        throw err;
    } 
}

// Update data inside a file
lib.update = async function(dir, file, data) {
    
    try {
        
        const open = await fsPromises.open(lib.baseDir+dir+'/'+file +'.json', 'wx')         
        
        let stringData = JSON.stringify(data)

        // Truncate the file
        await fsPromises.truncate(open)

        // Write to the file
        await fsPromises.writeFile(open, stringData)

    } catch (error) {

        throw error
        
    }

}

// Delete a file
lib.delete = async function(dir, file) {

    try {
    
        // Unlink the file
        await fsPromises.unlink(lib.baseDir+dir+'/'+file+'.json')

    } catch (error) {
        throw error
    }
    
}

//Export the module 
module.exports = lib;

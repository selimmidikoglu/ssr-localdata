var crypto = require('crypto'); 

  
// Method to set salt and hash the password for a user 
setPassword = function(database_business_id) { 
     
 // Creating a unique salt for a particular user 
    this.salt = crypto.randomBytes(16).toString('hex'); 
  
    // Hashing user's salt and password with 1000 iterations, 
     
    this.hash = crypto.pbkdf2Sync(password, this.salt,  
    1000, 64, `sha512`).toString(`hex`); 
}; 
  
// Method to check the entered password is correct or not 
validPassword = function(password) { 
    var hash = crypto.pbkdf2Sync(password,  
    this.salt, 1000, 64, `sha512`).toString(`hex`); 
    return this.hash === hash; 
}; 
  

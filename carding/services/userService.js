const {v4: uuidv4} = require('uuid');

function User( name, password ) {
   this.id = uuidv4();
   this.name = name;
   this.password = password;
}


let userdb = {
   "bilbo": new User("bilbo", "baggins"),
   "frodo": new User("frodo", "baggins"),
   "gandalf": new User("gandalf", "123")
}


function validateUser( uname, pswd ) {
   let user = userdb[uname];
   if(user && user.password === pswd) {
      return user;
   }
   else {
      return null;
   }
}

function findUser(uname) {
   if(uname) {
      return userdb[uname];
   }
   else {
      return false;
   }
}

module.exports = {validateUser, findUser};
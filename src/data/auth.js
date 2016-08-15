const uuid = require('node-uuid');
const bcrypt = require('bcrypt-nodejs');
const DAL = require("../DAL");
const usersDAL = DAL.usersDAL;
// needs a loginUser(email,password) func to login the user, create a SESSION_ID and USER_ID cookie. returns the sessionid (a uuid);
// needs a terminateSession(sessionId,userId) func to remove that session ID from the user's sessions array in mongoDB
let exportedMethods = {
	
	loginUser(email, password){
		return usersDAL.getUserByEmail(email).then((user)=>{
			bcrypt.compare(password, user.passwd, function(err, res){
				if(res === true){
					//Successful authentication
					var SESSION_ID = uuid.v1();
					var response = {
						SESSION_ID : SESSION_ID,
						USER_ID : user._id
					};
					return usersDAL.updateUserSession(user._id, SESSION_ID).then((success)=>{
						return response;
					},(error)=>{
						throw "Cant update user session";
					});
					//Store cookie
				}else{
					//Incorrect password
					throw "Invalid login. Please try again";
				}
			});
		});
	},

	terminateSession(sessionId, userId){
		var user = usersDAL.getUserByID(userId);
		//Remove cookies
	}
}
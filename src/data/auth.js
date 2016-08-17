const uuid = require('node-uuid');
const bcrypt = require('bcrypt-nodejs');
const DAL = require("../DAL");
const usersDAL = DAL.usersDAL;
// needs a loginUser(email,password) func to login the user, create a SESSION_ID and USER_ID cookie. returns the sessionid (a uuid);
// needs a terminateSession(sessionId,userId) func to remove that session ID from the user's sessions array in mongoDB
let exportedMethods = {
	
	loginUser(email, password){
		return usersDAL.getUserByEmail(email).then((user)=>{
			if(!user){
				throw {message: "Unable to find user."}
			}
			console.log("COMPARING: "+password+"  -   "+ user.passwd);
			//TODO: FIGURE THIS OUT!!!!!!!!!!!!!!!!!! ALWAYS FAILING
			return bcrypt.compare(password, user.passwd, function(err, res){
				if(res === true){
					console.log("successful bcrypt");
					//Successful authentication
					var SESSION_ID = uuid.v1();
					var response = {
						SESSION_ID : SESSION_ID,
						USER_ID : user._id
					};
					console.log(response);
					return usersDAL.updateUserSession(response.USER_ID, response.SESSION_ID).then((success)=>{
						return response;
					},(error)=>{
						throw "Cant update user session";
					});
					//Store cookie
				}else{
					console.log("unsuccessful bcrypt"+res);
					//Incorrect password
					var error = {
						message: "Invalid Login. Please Try Again"
					}
					throw error;
				}
			});
		},(error)=>{
			throw "Unable to find user. "+error;
		});
	},

	terminateSession(sessionId, userId){
		var user = usersDAL.getUserByID(userId);
		//Remove cookies
	}
}
function bcryptCallback(err, res){
	if(res === true){
		console.log("successful bcrypt");
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
		console.log("unsuccessful bcrypt"+res);
		//Incorrect password
		var error = {
			message: "Invalid Login. Please Try Again"
		}
		throw error;
	}
}
module.exports = exportedMethods;


			/* syncronous - bad.  Keep this code
			var success = bcrypt.compareSync(password,user.passwd);
			if(success === true){
				console.log("successful bcrypt");
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
				console.log("unsuccessful bcrypt");
				//Incorrect password
				throw "Invalid login. Please try again :(";
			}
			*/

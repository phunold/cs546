const uuid = require('node-uuid');
const bcrypt = require('bcrypt-nodejs');
const DAL = require("../DAL");
const usersDAL = DAL.usersDAL;
// needs a loginUser(email,password) func to login the user, create a SESSION_ID and USER_ID cookie. returns the sessionid (a uuid);
// needs a terminateSession(sessionId,userId) func to remove that session ID from the user's sessions array in mongoDB
let exportedMethods = {

	loginUser(email, password) {
		return usersDAL.getUserByEmail(email).then((user) => {
			if (!user) {
				throw "Unable to find user with that login.";
			}
			return new Promise((fulfill, reject) => {
				bcrypt.compare(password, user.passwd, function (err, res) {
					if (res === true) {
						//Successful authentication
						var SESSION_ID = uuid.v1();
						var response = {
							SESSION_ID: SESSION_ID,
							USER_ID: user._id.toString(),
							USER_ID_OBJ: user._id
						};
						fulfill(response);

					} else {
						//Incorrect password

						reject("Invalid Login. Please Try Again");
					}
				});
			}).then((sessionResponse) => {
				return usersDAL.updateUserSession(sessionResponse.USER_ID_OBJ, sessionResponse.SESSION_ID).then((response) => {
					return response;
				}, (error) => {
					throw "Cant update user session";
				});
			}, (error) => {
				throw error;
			});

		}, (error) => {
			throw "Unable to find user. " + error;
		});
	},

	terminateSession(sessionId, userId) {
		return usersDAL.getUserByID(userId).then((user) => {
			if (!user) {
				throw { message: "Unable to find user." };
			}
			return usersDAL.removeUserSession(user._id, sessionId).then((response) => {
				return response;
			}, (error) => {
				throw "Cant update user session";
			});
		}, (error) => {
			throw "Unable to find user. " + error;
		});
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

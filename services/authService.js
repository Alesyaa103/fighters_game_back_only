const UserService = require('./userService');

class AuthService {
    login(userData) {
        const user = UserService.search(userData);
        if(!user) {
            return null;
        }
        return user;
    }
}

module.exports = new AuthService();
const { UserRepository } = require('../repositories/userRepository');

class UserService {
    search(search) {
        const item = UserRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }
    createUser(user) {
        if (this.search({email: user.email})) {
            return null;
        }
        if (this.search({phoneNumber: user.phoneNumber})) {
            return null
        }
        return UserRepository.create(user)
    }
    getAllUsers() {
        const items = UserRepository.getAll()
        if (items.length === 0) {
            return null
        }
        return items
    }

    deleteUser(id) {
        const item = this.search({id})
        if (!item) {
            return null
        }
        return UserRepository.delete(id)
    }
    isOriginalUser(id, user) {
        const userNumber = this.search({phoneNumber: user.phoneNumber})
        const userEmail = this.search({email: user.email})
        if (userNumber) {
            if (id !== userNumber.id ) {
                return null
            }
        }
        if (userEmail) {
            if ( id !== userEmail.id) {
                return null
            }
        }
        return true
    }
    updateUser(id, user) {
        const item = this.search({id})
        if (!item) {
            return null
        }
        return UserRepository.update(id, user)
    }
}

module.exports = new UserService();
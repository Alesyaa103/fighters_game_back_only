const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
    search(search) {
        const item = FighterRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }
    createFighter(fighter) {
        if (this.search({name: fighter.name})) {
            return null;
        };
        return FighterRepository.create(fighter)
    }
    getAllFighters() {
        const items = FighterRepository.getAll()
        if (items.length === 0) {
            return null
        }
        return items
    }

    deleteFighter(id) {
        const item = this.search({id})
        if (!item) {
            return null
        }
        return FighterRepository.delete(id)
    }

    updateFighter(id, fighter) {
        const item = this.search({id})
        if (!item) {
            return null
        }
        return FighterRepository.update(id, fighter)
    }
}

module.exports = new FighterService();
const Users = require('./users');
const Tasks = require('./tasks');

const makeRelations = () => {
    Users.hasMany(Tasks, {
        foreignKey: {
            name: 'userId'
        }
    });

  
    Tasks.belongsTo(Users, {
        foreignKey: {
            name: 'userId'
        },
        as: 'user',
    });

    Tasks.belongsTo(Users, {
        foreignKey: {
            name: 'friendId'
        },
        as: 'friend',
    });
}

module.exports = makeRelations;

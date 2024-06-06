const Tasks = require('../models/tasks');
const Users = require('../models/users');

module.exports.login = (req, res) => {

    Users.findOne(
        {
            where: {
                password: req.body.password,
                email: req.body.email
            }
        })
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        })
}
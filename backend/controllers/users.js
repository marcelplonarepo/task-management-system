const Tasks = require('../models/tasks');
const Users = require('../models/users');
const Sequelize = require('sequelize');


module.exports.showUsers = (req, res) => {

    Users.findAll({})
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        })
}

module.exports.createUsers = (req, res) => {

    Users.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    })
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        })
}


module.exports.deleteUsers = (req, res) => {

    Users.findOne(
        {
            where: {
                email: req.body.email,
                password: req.body.password
            }
        })
        .then(user => {
            if (user) {
                user.destroy()
                    .then(result => {
                        res.json(result);
                    })
                    .catch(err => {
                        console.log(err);
                        res.json(err);
                    })
            }
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        })

}


module.exports.showUserTasks = (req, res) => {

    Users.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: Tasks,
            include: {
                model: Users,
                as: "friend",
            }
        }
    })
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        })

}

module.exports.createUserTasks = (req, res) => {

    Tasks.create({
        deadline: req.body.deadline,
        points: parseInt(req.body.points),
        text: req.body.text,
        status: 0,
        userId: req.params.id,
        reward: req.body.reward,
        friendId: parseInt(req.body.friendId)
    })
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        })
}


module.exports.deleteUserTasks = (req, res) => {


    Tasks.findOne({
        where: {
            id: req.params.subId
        }
    })
        .then(task => {
            if (task) {
                task.destroy()
                    .then(result => {
                        res.json(result);
                    })
                    .catch(err => {
                        console.log(err);
                        res.json(err);
                    })
            }
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        })
}

module.exports.patchUserTasks = (req, res) => {


    Tasks.findOne({
        where: {
            id: req.params.subId
        }
    })
        .then(task => {
            if (task) {
                if (req.body.status === 1) {
                    task.status = 1;
                }
                task.save()
                    .then(result => {
                        console.log("suckes!")
                        res.json(result);
                    })
                    .catch(err => {
                        console.log(err);
                        res.json(err);
                    })
            }
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        })
}


module.exports.othersUserTasks = (req, res) => {


    Tasks.findAll({
        where: {
            userId: {
                [Sequelize.Op.not]: req.params.id
            }
        },
        include: [
            {
                model: Users,
                as: "user"
            },
            {
                model: Users,
                as: "friend",
                where: {
                    id: req.params.id
                }
            }

        ]

    })
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        })
}

//wyszukuje innych uzytkownikow od wyszukujacego

module.exports.otherUser = (req, res) => {


    Users.findAll({
        where: {
            id: {
                [Sequelize.Op.not]: req.params.id
            },
            username: {
                [Sequelize.Op.like]: '%' + req.params.search + '%'
            }
        }
    })
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        })
}


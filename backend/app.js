const express = require('express');
const sequelize = require('./utils/databaseConnection');
const app = express();
const cors = require('cors');
const PORT = 5000;

app.use(express.json());
app.use(cors());

const usersRoutes = require('./routes/users');
const loginRoutes = require('./routes/login');
app.use('/users', usersRoutes);
app.use('/login', loginRoutes);

const makeRelations = require('./models/relations');
makeRelations();

//aby nadpisac bazę danych można dodac parametr {force: true} do funkcji sync()

// sequelize.sync({force: true})
sequelize.sync()
    .then(result => {
        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`);
        })
    })
    .catch(err => {
        console.log(err);
    })
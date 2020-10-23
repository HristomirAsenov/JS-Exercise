const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const getUserModel = require('./User');
const getShoeModel = require('./Shoe');

module.exports = {
    User: getUserModel(mongoose, bcrypt),
    Shoe: getShoeModel(mongoose)
};
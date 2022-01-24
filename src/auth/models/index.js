'use strict';

const userModel = require('./users.js');
const clothesModel = require('./clothes/model.js');
const foodModel = require('./food/model.js');
const productsModel=require('./product.js')
const Collection = require('./data-collection.js');


const { Sequelize, DataTypes } = require('sequelize');
const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;


let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
} : {};

const sequelize = new Sequelize(DATABASE_URL,sequelizeOptions);
const food = foodModel(sequelize, DataTypes);
const clothes = clothesModel(sequelize, DataTypes);
const product =productsModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  users: userModel(sequelize, DataTypes),
  food: new Collection(food),
  clothes: new Collection(clothes),
  product: new Collection(product),

}
/**
 * * import sequelize
 */
const sequelize = require('sequelize');
/**
 * * import dotenv
 */
const dotenv = require('dotenv');
/**
 * * menghubungkan dengan database
 */

/**
 * * inisiasi database
 */
const connection = new sequelize(process.env.DB_NAME, process.env.DB_USER, '', {
  dialect: 'mysql',
  define: {
    timestamps: false
  }
});
connection.sync({});

const initDB = async () => {
  try {
    await connection.authenticate();
    console.log(
      `MySql connected pada database : ${process.env.DB_NAME}`.green.bold
    );
  } catch (err) {
    console.log(`Error : ${err.message}`.red.bold);
    process.exit(1);
  }
};

module.exports = { initDB, connection };

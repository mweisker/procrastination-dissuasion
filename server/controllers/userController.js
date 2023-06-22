
const db = require('../models/procrastinationModels');

const userController = {};

userController.newUser = async (req, res, next) => {
  const { UserName, Password } = req.body;
  console.log('invoking new user with a username of ', UserName)

  try {
    const text = `
      INSERT INTO Users (UserName, Password)
      VALUES ($1, $2)
      RETURNING *
    `;
    const params = [ UserName, Password ];
    const result = await db.query(text, params);
    console.log('result ', result);
    res.locals.newUser = result;
    return next();
  } catch (err) {
    next({
      log: `userController.newUser: ERROR: ${err}`,
      message: { err: 'Error occured in userController.newUser.  Check server logs for more details.'}
    });
  }
}

userController.findUser = async (req, res, next) => {
  const { UserName, Password } = req.body;
  console.log('invoking find user with a username of ', UserName)

  try {
    const text = `
      SELECT *
      FROM  Users
      WHERE UserName=$1 AND Password=$2 
    `;
    const params = [ UserName, Password ];
    const result = await db.query(text, params);
    console.log('result ', result);
    res.locals.result = result;
    return next();
  } catch (err) {
    next({
      log: `userController.findUser: ERROR: ${err}`,
      message: { err: 'Error occured in userController.findUser.  Check server logs for more details.'}
    });
  }
}




module.exports = userController;
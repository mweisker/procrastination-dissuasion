const db = require('../models/procrastinationModels');

const taskController = {};

taskController.newTask = async (req, res, next) => {
  console.log('new task invoked');
  const { Title, Description, Status, DueDate, UserId } = req.body;
  try {
    const text = `
      INSERT INTO Tasks (Title, Description, Status, DueDate, UserId) 
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `
    const params = [Title, Description, Status, DueDate, UserId]
    const result = await db.query(text, params);
    console.log(result);
    res.locals.newTask = result.rows[0];
    return next();

  } catch (err) {
    next({
      log: `taskController.newTask: ERROR: ${err}`,
      message: { err: 'Error occured in taskController.newTask.  Check server logs for more details.'}
    })
  }
}

taskController.getTasks = async (req, res, next) => {
  console.log('get Tasks invoked');
  const { id } = req.params;
  try {
    const text = `
      SELECT *
      FROM Tasks
      WHERE UserId = $1
    `;
    const params = [ id ];
    const result = await db.query(text, params);
    console.log(result.rows);
    res.locals.allTasks = result.rows;
    return next();
  } catch (err) {
    next({
      log: `taskController.getTasks: ERROR: ${err}`,
      message: { err: 'Error occured in taskController.getTasks.  Check server logs for more details.'}
    })
  }
}

module.exports = taskController;
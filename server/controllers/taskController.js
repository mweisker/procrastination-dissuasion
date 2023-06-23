const db = require('../models/procrastinationModels');

const taskController = {};

taskController.newTask = async (req, res, next) => {
  const { Title, Description, Status, DueDate, UserId } = req.body;
  try {
    const text = `
      INSERT INTO Tasks (Title, Description, Status, DueDate, UserId) 
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `
    const params = [Title, Description, Status, DueDate, UserId]
    const result = await db.query(text, params);
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
  const { id } = req.params;
  try {
    const text = `
      SELECT *
      FROM Tasks
      WHERE UserId = $1
    `;
    const params = [ id ];
    const result = await db.query(text, params);
    res.locals.allTasks = result.rows;
    return next();
  } catch (err) {
    next({
      log: `taskController.getTasks: ERROR: ${err}`,
      message: { err: 'Error occured in taskController.getTasks.  Check server logs for more details.'}
    })
  }
}

taskController.updateTask = async (req, res, next) => {
  const { id } = req.params;
  const { Title, Description, Status, DueDate } = req.body;

  try {
    const text = `
      UPDATE Tasks
      SET Title = $1, Description = $2, Status = $3, DueDate = $4
      WHERE TaskId = $5
    `;
    const params = [ Title, Description, Status, DueDate, id ];
    const result = await db.query(text, params);
    const updated = { updated: 'updated'};
    res.locals.updated = updated;
    return next();
  } catch (err) {
    next({
      log: `taskController.updateTask: ERROR: ${err}`,
      message: { err: 'Error occured in taskController.updateTask.  Check server logs for more details.'}
    })
  }
}

taskController.deleteTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    const text = `
      DELETE FROM Tasks
      WHERE TaskId = $1
    `
    const params = [ id ];
    const result = await db.query(text, params);
    let deleted = false;
    if (result.rowCount) deleted = true;
    res.locals.deleted = deleted;
    return next();
  } catch (err) {
    next({
      log: `taskController.deleteTask: ERROR: ${err}`,
      message: { err: 'Error occured in taskController.deleteTask.  Check server logs for more details.'}
    })
  }
}

module.exports = taskController;
const { Router} = require('express');
const { getAllTask, getById, createTask, updateTask, deleteTask} = require('../controllers/tasks.controllers')
//const pool = require('../db');

const router = Router();

router.get("/tasks", getAllTask
    //const result = await pool.query('SELECT NOW()')
    //console.log(result.rows[0].now);
    //res.json(result.rows[0].now)
)

router.get("/tasks/:id", getById)

router.post("/tasks", createTask)

router.put("/tasks/:id", updateTask)

router.delete("/tasks/:id", deleteTask) 

module.exports = router;
const { Router} = require('express');
//const pool = require('../db');

const router = Router();

router.get("/tasks", async (req, res) => {
    res.send("Retornando una lista de tareas")
    //const result = await pool.query('SELECT NOW()')
    //console.log(result.rows[0].now);
    //res.json(result.rows[0].now)
})

router.get("/tasks/10", (req, res) => {
    res.send("Retornando una tarea")
})

router.post("/tasks", (req, res) => {
    res.send("Creando una tarea")
})

router.put("/tasks", (req, res) => {
    res.send("Actualizando una tarea")
})

router.delete("/tasks", (req, res) => {
    res.send("Eliminando una tarea")
}) 

module.exports = router;
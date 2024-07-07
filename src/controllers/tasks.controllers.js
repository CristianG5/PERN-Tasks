const pool = require('../db')

const getAllTask = async (req, res, next) => {
    try {
        const allTasks = await pool.query('SELECT * FROM task')
        res.json(allTasks.rows)
    } catch (error) {
        //console.log(error.message);
        next(error);
    }
}

const getById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await pool.query('SELECT * FROM task WHERE id = $1', [id])

    if(result.rows.length === 0)
        return res.status(404).json({
            message: "Tarea no encontrada"
    });

    res.json(result.rows[0]);
    } catch (error) {
        //console.log(error.message); 
        next(error);
    }
};

const createTask = async (req, res, next) => {
  const { title, description } = req.body
  try {
    const result = await pool.query('INSERT INTO task(title, description) VALUES ($1, $2) RETURNING *', [
        title, 
        description
    ])
    
    res.json(result.rows[0]);
  } catch (error) {
    //res.json({error: error.message})
    next(error);
  }
  
};

const updateTask = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {title, description} = req.body;

    const result = await pool.query('UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *',
        [title, description, id]
    );

    if(result.rows.length === 0)
        return res.status(400).json({
            message: "Tarea no encontrada"
    })

    return res.json(result.rows[0])
    } catch (error) {
        next(error);
    }
};

const deleteTask = async (req, res, next) => {    
    try {
        const  {id} = req.params;
        const result = await pool.query('DELETE FROM task WHERE id = $1', [id])

    if(result.rowCount === 0)
        return res.status(404).json({
            message: "No se encontro el registro"
        })

    return res.sendStatus(204)
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllTask,
    getById,
    createTask,
    updateTask,
    deleteTask
}
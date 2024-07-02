const pool = require('../db')

const getAllTask = async (req, res) => {
    try {
        const allTasks = await pool.query('SELECT * FROM task')
        res.json(allTasks.rows)
    } catch (error) {
        console.log(error.message);
    }
}

const getById = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await pool.query('SELECT * FROM task WHERE id = $1', [id])

    if(result.rows.length === 0)
        return res.status(404).json({
            message: "Tarea no encontrada"
    });

    res.json(result.rows[0]);
    } catch (error) {
        console.log(error.message); 
    }
};

const createTask = async (req, res) => {
  const { title, description } = req.body
  try {
    const result = await pool.query('INSERT INTO task(title, description) VALUES ($1, $2) RETURNING *', [
        title, 
        description
    ])
    
    res.json(result.rows[0]);
  } catch (error) {
    res.json({error: error.message})
  }
  
};

const updateTask = (req, res) => {
    res.send("Actualizando una tarea")
}

const deleteTask = async (req, res) => {
    const  {id} = req.params;
    const result = await pool.query('DELETE FROM task WHERE id = $1', [id])

    if(result.rowCount === 0)
        return res.status(404).json({
            message: "No se encontro el registro"
        })

    return res.sendStatus(204)
}

module.exports = {
    getAllTask,
    getById,
    createTask,
    updateTask,
    deleteTask
}
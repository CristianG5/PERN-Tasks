import {Grid, Typography, Card, CardContent, TextField, Button, CircularProgress} from '@mui/material'
import {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

export default function TasksForm() {
  
  const [task, setTask] = useState({
    title:'',
    description:'',
  })

  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)
  

  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if(editing){
      await fetch(`http://localhost:4000/tasks/${params.id}`, {
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task),
      })
    }else{
    await fetch('http://localhost:4000/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }
    setLoading(false)
    navigate('/');

  }

  const handleChange = e => 
    //console.log(e.target.name, e.target.value)
    setTask({...task, [e.target.name]: e.target.value});
  
  const loadTask =  async (id) => {
    const res = await fetch(`http://localhost:4000/tasks/${id}`)
    const data = await res.json()
    setTask({title:data.title, description: data.description})
    setEditing(true)
  }

  useEffect(() => {
    if (params.id){
      loadTask(params.id)
    }
  }, [])
  
  
  return (
    <Grid 
      container
      direction="column" 
      alignItems="center"
      justifyContent="center"
    >
      <Grid item x3={3}>
        <Card
          sx={{mt:5}}
          style={{
            backgroundColor:'#1e272e',
            padding: '1rem'
          }}
        >
          <Typography
            variant='5'
            textAlign='center'
            color='white'
          >
            {editing ? 'Edit task' : 'Create Task'}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField 
                variant='filled'
                label='Write your title'
                sx={{
                  display:'block',
                  margin:'.5rem 0'
                }}

                name='title'
                value={task.title}  
                onChange={handleChange} 
                inputProps={{
                  style:{
                    color:'white'
                  }
                }}

                InputLabelProps={{
                  style:{
                      color:'white'
                  }
                }}

              />

              <TextField 
                variant='filled'
                label='Write your description'
                multiline
                rows={4}
                sx={{
                  display:'block',
                  margin:'.5rem 0'
                }}
                
                name='description' 
                value={task.description} 
                onChange={handleChange}
                inputProps={{
                  style:{
                    color:'white'
                  }
                }}

                InputLabelProps={{
                  style:{
                      color:'white'
                  }
                }}
              />

              <Button 
                variant="contained" 
                color='primary' 
                type='submit'
                disabled={!task.title || !task.description}
              >
                {loading ? 
                <CircularProgress 
                  color='inherit'
                  size={24}
                /> : 'Save'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

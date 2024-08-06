import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import TasksList from './components/TasksList'
import TasksForm from './components/TasksForm';
import Navbar from './components/Navbar'
import {Container} from '@mui/material'

export default function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Container>
      <Routes>
        <Route path='/' element={<TasksList />}/>
        <Route path='/tasks/new' element={<TasksForm />}/>
        <Route path='/tasks/:id/edit' element={<TasksForm />}/>
      </Routes>
      </Container>
    </BrowserRouter>
  )
}


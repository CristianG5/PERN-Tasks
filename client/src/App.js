import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import TasksList from './components/TasksList'
import TasksForm from './components/TasksForm';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TasksList />}/>
        <Route path='/task/new' element={<TasksForm />}/>
      </Routes>
    </BrowserRouter>
  )
}


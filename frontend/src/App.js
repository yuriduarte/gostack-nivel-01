import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css';

import Header from './components/Header';


const App = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/projects').then(response => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddProject() {
    // setProjects([ ...projects, `Novo projeto ${Date.now()}` ]);

    const response = await api.post('/projects', {
      title: `Novo projeto ${Date.now()}`,
	    owner: "Pedro"
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  return (
    <>
      <Header title="Projects" />

      <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
      
      <ul>
        {projects.map(project => (
          <li key={project.id}>{project.title}</li>
          ))}
      </ul>

    </>
  )
}

export default App;
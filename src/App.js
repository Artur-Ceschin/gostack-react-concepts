import React, { useEffect, useState } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
        title: `New Repository ${Date.now()}`,
        url: 'https://api.github',
        techs: ['React', 'Python'],
    })

    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    setRepositories(repositories.filter(repo => repo.id !== id))
  }

  useEffect(() => {
    api.get('/repositories').then(response => setRepositories(response.data))
  }, [])

  return (
    <div>``
      <ul data-testid="repository-list">
          {repositories.map((repo) => (
            <li key={repo.id}>
              <p>{repo.title}</p>
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          ) )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

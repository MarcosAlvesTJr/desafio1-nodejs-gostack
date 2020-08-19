const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body
  const repository = {
    id: uuid(),
    title,
    techs,
    url,
    likes: 0,
  }
  repositories.push(repository)
  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body
  const { id } = request.params

  const foundIndex = repositories.findIndex(repository => repository.id === id)

  if (foundIndex < 0) {
    return response.status(400).json({error: "Repository not found."})
  }

  let foundRepository = repositories[foundIndex]
  
  foundRepository = {
    ...foundRepository,
    title,
    url,
    techs
  }

  repositories[foundIndex] = foundRepository

  return response.json(foundRepository)
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const foundIndex = repositories.findIndex(repository => repository.id === id)

  if (foundIndex < 0) {
    return response.status(400).json({error: "Repository not found."})
  }

  repositories.splice(foundIndex, 1)

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  const foundIndex = repositories.findIndex(repository => repository.id === id)

  if (foundIndex < 0) {
    return response.status(400).json({error: "Repository not found."})
  }

  let foundRepository = repositories[foundIndex]
  
  foundRepository = {
    ...foundRepository,
    likes: foundRepository.likes + 1
  }

  repositories[foundIndex] = foundRepository

  return response.json(foundRepository)
});

module.exports = app;

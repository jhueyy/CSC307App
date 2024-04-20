// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};
app.use(cors());
app.use(express.json());

const addUser = (user) => {
  const userWithID = generateID(user);
  //users["users_list"].push(user);
  users["users_list"].push(userWithID);
  //return user;

  return userWithID;
};


const generateID = (user) => {
  let randomID;
  let idExists = false;
  
  while (!idExists) {
    const alphabeticPart = Math.random().toString(36).substr(2, 3);
    const numericPart = Math.floor(Math.random() * 1000).toString().padStart(3, '0');

    randomID = alphabeticPart + numericPart;

    const existingUser = users["users_list"].find(u => u.id === randomID);
    if (!existingUser) {
      idExists = true;
    }
  }
  const userWithID = {
    id: randomID,
    name: user.name,
    job: user.job
  };
  
  return userWithID;
};


app.post("/users", (req, res) => {
  const userToAdd = req.body;
  //addUser(userToAdd);
  const userWithID = addUser(userToAdd);
  //res.send();
  res.status(201).json(userWithID);
});

const deleteUserById = (id) => {
  const indexToDelete = users.users_list.findIndex((user) => user.id === id);
  if (indexToDelete !== -1) {
    users.users_list.splice(indexToDelete, 1);
  }
};


app.delete("/users", (req, res) =>{
  const userToDelete = req.body;
  deleteUser(userToDelete);
  res.send("User Deleted Successfully");
});

// DELETE endpoint to delete user by ID
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  deleteUserById(id);
  res.status(204).send();
});


const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});


app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});


app.get("/users", (req, res) => {
  res.send(users);
});



app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});



const express = require('express')
const cors = require("cors");

const app = express()

app.use(express.json());  // When we want to be able to accept JSON.
app.use(cors());

const userList = [
  {
    id: 0,
    name: 'Garrett'
  },
  {
    id: 1,
    name: 'Matt'
  },
  {
    id: 2,
    name: 'Nathan'
  },
  {
    id: 3,
    name: 'Rachel'
  },
]

app.get('/api/users', (req, res) => {
  let resData = userList;
  if(req.query.userId){
    resData = userList.find(
      (user) => user.id === +req.query.userId
    );
  }
  res.status(200).send(resData);
})
// ****FRONT END CODE****
// axios.get('/api/users')
// .then((res) => res.data /*[users]*/)
// ******ALTERNATIVE*********
// axios.get('/api/users?userId=2')
// .then((res) => res.data  /*{ id: 2, name: 'Nathan'}*/)

app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const selectedUser = userList.find((user) => user.id === +id);
  res.status(200).send(selectedUser);
})

// ****FRONT END CODE****
// axios.get('/api/users/3')
// .then((res) => res.data /*{ id: 3, name: 'Rachel'}*/)

app.post('/api/users', (req, res) => {
  const { name } = req.body;
  userList.push({
    id: userList.length,
    name,
  })
  res.status(200).send(userList);
})

// axios.post('/api/users', { name: 'Jeremy'})
// .then((res) => res.data /*[users]*/)

app.listen(3001, () => console.log('Server running on 3001'))
const express = require('express')
const router = express.Router();

const users = require('../data/users')

// router.get('/:id', () => {})
// router.patch('/:id', () => {})
// router.delete('/:id', () => {})

// router.route('/:id')
// .get(() => {})
// .patch(() => {})
// .delete(() => {})

router.route('/')
.get ((req, res) => {
    res.json(users);
})
.post((req, res) => {
    console.log(req.body);
    if (req.body.name && req.body.username && req.body) {
        if (users.find((u)=> u.username === req.body.username)) {
            return res.json({ error: "Username Already Taken"})
        }

        const user = {
            id: Number(users[users.length -1].id) +1,
            ...req.body
        }

        users.push(user);
        res.json(users[users.length -1]);
    } else res.json({error: "Insufficient Data"});
})

router.route('/:id')
.get((req, res) => {
  const user = users.find((user) => user.id === Number(req.params.id))
  if (user) res.json(user);
  else res.status(404).json({ error: "User Not Found"})

})

.patch((req, res) => {
  const user = users.find((user, idx) => {
    if (user.id === Number(req.params.id)) {
        for ( const key in req.body) {
            users[idx][key] = req.body[key]
        }
        return true;
    }
   })
   if (user) res.json(user);
   else res.status(404).json({ error: "user Not Found"})
})

.delete((req, res) => {
  const user = users.find((user, idx) => {
        if (user.id === Number(req.params.id)) {
            users.splice(idx, 1);
            return true;
        }
    });
    if (user) res.json(user);
    else res.status(404).json({ error: "User Not Found"})
});

module.exports = router;
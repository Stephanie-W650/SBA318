const express = require('express');
const router = express.Router();

const posts = require('../data/posts');

router.get('/', (req, res) => {
    res.json(posts)
})

router.post('/', (req, res) => {
    if (req.body.userId && req.body.title && req.body.content && req.body.genre) {
        const post = {
            id: posts[posts.length -1].id + 1,
            userId: Number(req.body.userId),
            title: req.body.title,
            content: req.body.content,
            genre: req.body.genre
        };

        posts.push(post)
        res.json(posts[posts.length -1])
    } else res.json({error: " Insufficient Data"})
})

router.get('/:id', (req, res) => {
    const post = posts.find((post) => post.id === Number(req.params.id));
    if (post) res.json(post);
    else res.status(404).json({ error: "Post Not Found" })

});

router.patch('/:id', (req, res) => {
    const post = posts.find((post, idx) => {
        if (post.id === Number(req.params.id)) {
            for (const key in req.body) {
                posts[idx][key] = req.body[key];

            }
            return true
        }
    });
    if (post) res.json(post);
    else res.status(404).json({ error: "Post Not Found"})

});

router.delete('/:id', (req, res) => {
    const post = posts.find((post, idx)=> {
        if (post.id === Number(req.params.id)) {
            posts.splice(idx, 1);
            return true;
        }
    })
    if (post) res.json(post);
    else res.status(404).json({ error: "Post Not Found"})
})

module.exports = router;

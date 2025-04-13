const express = require('express');
const router = express.Router();

const comments = require('../data/comments');

router.get('/', (req, res) => {
    res.json(comments)
})

router.post('/', (req, res) => {
    if (req.body.userId && req.body.postId && req.body.body) {
        const comment = {
            id: comments[comments.length -1].id + 1,
            userId: Number(req.body.userId),
            postId: Number(req.body.postId),
            body: req.body.body,
            
        };

        comments.push(comment)
        res.json(comment[comment.length -1])
    } else res.json({error: " Insufficient Data"})
})

router.get('/:id', (req, res) => {
    const comment = comments.find((comment) => comment.id === Number(req.params.id));
    if (comment) res.json(comment);
    else res.status(404).json({ error: "Comment Not Found" })

});

router.patch('/:id', (req, res) => {
    const comment = comments.find((comment, idx) => {
        if (comment.id === Number(req.params.id)) {
            for (const key in req.body) {
                comments[idx][key] = req.body[key];

            }
            return true
        }
    });
    if (comment) res.json(comment);
    else res.status(404).json({ error: "Comment Not Found"})

});

router.delete('/:id', (req, res) => {
    const comment = comments.find((comment, idx)=> {
        if (comment.id === Number(req.params.id)) {
            comments.splice(idx, 1);
            return true;
        }
    })
    if (comment) res.json(comment);
    else res.status(404).json({ error: "Comment Not Found"})
})

module.exports = router;

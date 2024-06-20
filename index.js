const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port =  process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

let posts = [];

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/features", (req, res) => {
    res.render("features.ejs");
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.get('/create', (req, res) => {
    res.render('create.ejs',{ posts: posts });
}); 
app.post('/create', (req, res) => {
    const newPost = {
        id: Date.now(),
        title: req.body.title,
        content: req.body.content
    };
    posts.push(newPost);
    res.redirect('/create');
});

app.get('/edit-post/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    res.render('edit-post', { post: post });
});

app.post('/edit-post/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    post.title = req.body.title;
    post.content = req.body.content;
    res.redirect('/create');
});


app.post('/delete-post/:id', (req, res) => {
    posts = posts.filter(p => p.id != req.params.id);
    res.redirect('/create');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});
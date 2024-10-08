const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

let posts = [
  { id: 1, title: 'First Post', content: 'This is my first post.' },
  { id: 2, title: 'Second Post', content: 'This is another post.' },
];

app.get('/api/posts', (req, res) => {
  res.json(posts);
});

app.post('/api/posts', (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content,
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

app.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const post = posts.find((p) => p.id == id);

  if (post) {
    post.title = title;
    post.content = content;
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

app.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  posts = posts.filter((post) => post.id != id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Sever is running on port is ${port}`);
});

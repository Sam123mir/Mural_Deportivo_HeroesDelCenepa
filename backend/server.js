const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

const DB_PATH = path.join(__dirname, 'db.json');

const readPosts = () => {
  if (!fs.existsSync(DB_PATH)) {
    return [];
  }
  const data = fs.readFileSync(DB_PATH);
  return JSON.parse(data);
};

const writePosts = (posts) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(posts, null, 2));
};

app.get('/api/posts', (req, res) => {
  const posts = readPosts();
  res.json(posts);
});

app.post('/api/posts', upload.single('image'), (req, res) => {
  const posts = readPosts();
  const { description, date, sport, gender, category, subcategory, contentType, rival, result } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

  const newPost = {
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    description,
    date,
    sport,
    gender,
    category,
    subcategory,
    contentType,
    rival,
    result,
    imageUrl,
  };

  posts.unshift(newPost);
  writePosts(posts);
  res.status(201).json(newPost);
});

app.delete('/api/posts/:id', (req, res) => {
  let posts = readPosts();
  const { id } = req.params;
  const postIndex = posts.findIndex((p) => p.id === id);

  if (postIndex > -1) {
    const post = posts[postIndex];
    if (post.imageUrl) {
      const imagePath = path.join(__dirname, post.imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    posts.splice(postIndex, 1);
    writePosts(posts);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
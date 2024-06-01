import express from 'express';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './database/Database.js';
import router from './routes/index.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const pool = db;

const getConnection = async () => {
  return await pool.getConnection();
};

const start = async function () {
  try {
    console.log('Database Connected');
  } catch (e) {
    console.log(e);
  }
};

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(cookieParser());
app.use(express.json());
app.use(fileUpload());
app.use(express.static('public'));

app.options('*', cors());

app.use(async (req, res, next) => {
  let connection;
  try {
    connection = await getConnection();
    req.db = connection;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

app.use(router);

start();

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});

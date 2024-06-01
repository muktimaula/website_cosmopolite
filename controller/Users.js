import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../database/Database.js';

export const getUsers = async (req, res) => {
  try {
    const [rows, fields] = await db.query('SELECT * FROM tbl_users');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const Register = async (req, res) => {
  const { name, username, email, no_telp, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.status(400).json({
      msg: 'Password dan Confirm Password Tidak Cocok',
    });
  }

  const [user] = await db.query('SELECT * FROM tbl_users WHERE username = ?', [username]);
  if (user.length > 0) {
    return res.status(404).json({ msg: 'Username sudah ada! Ganti username!' });
  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    await db.query('INSERT INTO tbl_users (name, username, email, no_telp, password) VALUES (?, ?, ?, ?, ?)', [
      name,
      username,
      email,
      no_telp,
      hashPassword,
    ]);
    res.json({ msg: 'Register Berhasil' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const Login = async (req, res) => {
  try {
    const [user] = await db.query('SELECT * FROM tbl_users WHERE email = ?', [req.body.email]);

    if (user.length === 0) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) {
      return res.status(400).json({ msg: 'Wrong Password' });
    }

    const userId = user[0].id;
    const name = user[0].name;
    const username = user[0].username;
    const email = user[0].email;
    const no_telp = user[0].no_telp;
    const alamat = user[0].alamat
    const image = user[0].image
    const nik = user[0].nik
    const jk = user[0].jk
    const tgl = user[0].tanggal_lahir
    const role = user[0].role

    const accessToken = jwt.sign(
      { userId, name, username, email, no_telp, alamat, image, nik, jk, tgl, role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1d' }
    );
    const refreshToken = jwt.sign(
      { userId, name, username, email, no_telp },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    await db.query('UPDATE tbl_users SET refresh_token = ? WHERE id = ?', [refreshToken, userId]);

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
        // secure: true ## for https
    })

    res.json({ accessToken, role });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ msg: error.message });
  }
};

export const Me = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(204);
    const [user] = await db.query('SELECT * FROM tbl_users WHERE refresh_token = ?', [refreshToken]);

    if (!user[0]) {
      return res.sendStatus(204);
    }

    const [response] = await db.query('SELECT * FROM tbl_users WHERE id = ?', [user[0].id]);
    res.json(response[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(204);
  const [user] = await db.query('SELECT * FROM tbl_users WHERE refresh_token = ?', [refreshToken]);

  if (!user[0]) {
    return res.sendStatus(204);
  }

  const userId = user[0].id;

  await db.query('UPDATE tbl_users SET refresh_token = NULL WHERE id = ?', [userId]);
  res.clearCookie('refreshToken');
  return res.sendStatus(200);
};

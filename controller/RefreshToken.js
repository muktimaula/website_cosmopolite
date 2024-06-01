import jwt from 'jsonwebtoken';
import db from '../database/Database.js';

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ status: false, message: 'Refresh token is required' });

    const [user] = await db.query('SELECT * FROM tbl_users WHERE refresh_token = ?', [refreshToken]);

    if (!user[0]) {
      return res.sendStatus(403);
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      }

      const userId = user[0].id;
      const name = user[0].name;
      const username = user[0].username;
      const email = user[0].email;
      const no_telp = user[0].no_telp;
      const alamat = user[0].alamat;
      const image = user[0].image;
      const role = user[0].role;

      const accessToken = jwt.sign(
        { userId, name, username, email, no_telp, alamat, image, role },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: '1d',
        }
      );

      res.json({ accessToken });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

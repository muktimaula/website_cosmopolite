import db from '../database/Database.js';

export const getCategorie = async (req, res) => {
  try {
    const response = await db.query(`
      SELECT * FROM tbl_categories
    `);
    res.json(response[0]);
  } catch (error) {
    console.log(error.message);
    res.status(401).json({
      msg: error.message,
    });
  }
};

export const getCategorieById = async (req, res) => {
  try {
    const response = await db.query(`
    SELECT * FROM tbl_categories
      WHERE id = ?
    `, [req.params.id]);
    res.json(response[0][0]);
  } catch (error) {
    console.log(error.message);
    res.status(401).json({
      msg: error.message,
    });
  }
};

export const saveCategories = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(204);

    const user = await db.query('SELECT * FROM tbl_users WHERE refresh_token = ?', [refreshToken]);

    if (!user[0][0]) {
      return res.status(204).json({
        msg: 'User Tidak Ditemukan',
      });
    }

    const title = req.body.title;
    const subtitle = req.body.subtitle;

    await db.query('INSERT INTO tbl_categories (title, subtitle) VALUES (?, ?)', [title, subtitle]);
    res.status(201).json({ msg: 'Categorie Berhasil Dibuat' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};

export const updateCategorie = async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) return res.status(204).json({ msg: 'Refresh token is required' });
  
      const user = await db.query('SELECT * FROM tbl_users WHERE refresh_token = ?', [refreshToken]);
  
      if (!user[0][0]) {
        return res.status(204).json({
          msg: 'User Tidak Ditemukan',
        });
      }
  
      const categorie = await db.query('SELECT * FROM tbl_categories WHERE id = ?', [req.params.id]);
  
      if (!categorie[0][0]) {
        res.status(404).json({ msg: 'Data Tidak Ditemukan' });
      }
  
      const title = req.body.title;
      const subtitle = req.body.subtitle;
  
      try {
        await db.query('UPDATE tbl_categories SET title = ?, subtitle = ? WHERE id = ?', [title, subtitle, req.params.id]);
        res.status(201).json({ msg: 'Categorie Berhasil Diupdate' });
      } catch (error) {
        res.status(401).json({
          msg: error.message,
        });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  };

export const deleteCategorie = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(204);

    const user = await db.query('SELECT * FROM tbl_users WHERE refresh_token = ?', [refreshToken]);

    if (!user[0][0]) {
      return res.status(204).json({
        msg: 'User Tidak Ditemukan',
      });
    }

    const categori = await db.query('SELECT * FROM tbl_categories WHERE id = ?', [req.params.id]);

    if (!categori[0][0]) {
      res.status(404).json({ msg: 'Data Tidak Ditemukan' });
    }

    try {
      await db.query('DELETE FROM tbl_categories WHERE id = ?', [req.params.id]);
      res.status(200).json({
        msg: 'Categorie Berhasil Dihapus',
      });
    } catch (error) {
      console.log(error.message);
      res.status(401).json({
        msg: error.message,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};

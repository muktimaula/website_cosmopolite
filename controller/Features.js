import db from '../database/Database.js';
import path from 'path';
import fs from 'fs';

export const getFeatures = async (req, res) => {
  try {
    const response = await db.query('SELECT * FROM tbl_features');
    res.json(response[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};

export const getFeaturesById = async (req, res) => {
  try {
    const features = await db.query(
      'SELECT * FROM tbl_features WHERE category_id = ?',
      [req.params.id]
    );
    res.json(features[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};

export const saveFeatures = async (req, res) => {
  try {
    if (req.files === null) return res.status(400).json({ msg: 'Tidak Ada File yang Diupload' });
    
    const id_kategori = req.body.category_id;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLowerCase())) {
      return res.status(422).json({ msg: 'Gambar Invalid' });
    }

    if (fileSize > 8000000) {
      return res.status(422).json({ msg: 'Max Image Sized 8MB' });
    }

    file.mv(`./public/images/${fileName}`, async (err) => {
      if (err) {
        return res.status(500).json({ msg: err.message });
      }

      try {
        await db.query('INSERT INTO tbl_features (category_id, image, url) VALUES (?, ?, ?)', [id_kategori, fileName, url]);
        res.status(201).json({ msg: 'Features Berhasil Dibuat' });
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: 'Internal Server Error dalam', error: error.message });
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Internal Server Error luar', error: error.message });
  }
};
  export const updateFeatures = async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) return res.status(204).json({ msg: 'Tidak Mempunyai Akses' });
  
      const user = await db.query('SELECT * FROM tbl_users WHERE refresh_token = ?', [refreshToken]);
  
      if (!user[0][0]) {
        return res.status(204).json({
          msg: 'User Tidak Ditemukan',
        });
      }
  
      const feature = await db.query('SELECT * FROM tbl_features WHERE id = ?', [req.params.id]);
  
      if (!feature[0][0]) {
        res.status(404).json({ msg: 'Data Tidak Ditemukan' });
      }
  
      let fileName = feature[0][0].image;

        if (req.files !== null) {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png', '.jpg', '.jpeg'];

        if (!allowedType.includes(ext.toLowerCase())) {
            return res.status(422).json({ msg: 'Gambar Invalid' });
        }
        if (fileSize > 8000000) {
            return res.status(422).json({ msg: 'Max Image Sized 8MB' });
        }

        if (feature[0][0].image) {
            const filePath = `./public/images/${feature[0][0].image}`;
            fs.unlinkSync(filePath);
        }

        file.mv(`./public/images/${fileName}`, (err) => {
            if (err) {
            return res.status(500).json({ msg: err.message });
            }
        });
        }
  
      const category_id = req.body.category_id;
      const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;
  
      try {
        await db.query('UPDATE tbl_features SET category_id = ?, url = ?, image_url = ? WHERE id = ?', [
          category_id,
          url,
          fileName,
          req.params.id,
        ]);
        res.status(200).json({
          msg: 'Features Telah Diupdate',
        });
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: 'Internal Server Error' });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  };
  

  export const deleteFeatures = async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) return res.status(204).json({ msg: 'Tidak Mempunyai Akses' });
  
      const user = await db.query('SELECT * FROM tbl_users WHERE refresh_token = ?', [refreshToken]);
  
      if (!user[0][0]) {
        return res.status(204).json({
          msg: 'User Tidak Ditemukan',
        });
      }
  
      const feature = await db.query('SELECT * FROM tbl_features WHERE id = ?', [req.params.id]);
  
      if (!feature[0][0]) {
        res.status(404).json({ msg: 'Data Tidak Ditemukan' });
      }
  
      try {
        if (feature[0][0].image) {
          const filePath = `./public/images/${feature[0][0].image}`;
          fs.unlinkSync(filePath);
        }
        await db.query('DELETE FROM tbl_features WHERE id = ?', [req.params.id]);
        res.status(200).json({
          msg: 'Features Berhasil Dihapus',
        });
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: 'Internal Server Error' });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  };
  
import db from '../database/Database.js';

export const getFeedback = async (req, res) => {
  try {
    const response = await db.query(`
      SELECT tbl_feedbacks.*, tbl_users.name AS userName, tbl_users.email AS userEmail
      FROM tbl_feedbacks
      JOIN tbl_users ON tbl_feedbacks.user_id = tbl_users.id
    `);
    res.json(response[0]);
  } catch (error) {
    console.log(error.message);
    res.status(401).json({
      msg: error.message,
    });
  }
};

export const getFeedbackById = async (req, res) => {
  try {
    const response = await db.query(`
      SELECT tbl_feedbacks.*, tbl_users.name AS userName, tbl_users.email AS userEmail
      FROM tbl_feedbacks
      JOIN tbl_users ON tbl_feedbacks.user_id = tbl_users.id
      WHERE tbl_feedbacks.id = ?
    `, [req.params.id]);
    res.json(response[0][0]);
  } catch (error) {
    console.log(error.message);
    res.status(401).json({
      msg: error.message,
    });
  }
};

export const saveFeedback = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(204);

    const user = await db.query('SELECT * FROM tbl_users WHERE refresh_token = ?', [refreshToken]);

    if (!user[0][0]) {
      return res.status(204).json({
        msg: 'User Tidak Ditemukan',
      });
    }

    const type = req.body.feedback;
    const userId = user[0][0].id; 

    await db.query('INSERT INTO tbl_feedbacks (user_id, feedback) VALUES (?, ?)', [userId, type]);
    res.status(201).json({ msg: 'Feedback Berhasil Dibuat' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};

export const updateFeedback = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(204);

    const user = await db.query('SELECT * FROM tbl_users WHERE refresh_token = ?', [refreshToken]);

    if (!user[0][0]) {
      return res.status(204).json({
        msg: 'User Tidak Ditemukan',
      });
    }

    const feedback = await db.query('SELECT * FROM tbl_feedbacks WHERE id = ?', [req.params.id]);

    if (!feedback[0][0]) {
      res.status(404).json({ msg: 'Data Tidak Ditemukan' });
    }

    const type = req.body.feedback;
    const userId = user[0][0].id; // Ambil id user dari hasil query

    try {
      await db.query('UPDATE tbl_feedbacks SET user_id = ?, feedback = ? WHERE id = ?', [userId, type, req.params.id]);
      res.status(201).json({ msg: 'Feedback Berhasil Diupdate' });
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


export const deleteFeedback = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(204);

    const user = await db.query('SELECT * FROM tbl_users WHERE refresh_token = ?', [refreshToken]);

    if (!user[0][0]) {
      return res.status(204).json({
        msg: 'User Tidak Ditemukan',
      });
    }

    const feedback = await db.query('SELECT * FROM tbl_feedbacks WHERE id = ?', [req.params.id]);

    if (!feedback[0][0]) {
      res.status(404).json({ msg: 'Data Tidak Ditemukan' });
    }

    try {
      await db.query('DELETE FROM tbl_feedbacks WHERE id = ?', [req.params.id]);
      res.status(200).json({
        msg: 'Feedback Berhasil Dihapus',
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

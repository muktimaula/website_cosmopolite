import express from 'express';
import { deleteCategorie, getCategorie, getCategorieById, saveCategories, updateCategorie } from '../controller/Categories.js';
import { deleteFeatures, getFeatures, getFeaturesById, saveFeatures, updateFeatures } from '../controller/Features.js';
import { deleteFeedback, getFeedback, getFeedbackById, saveFeedback, updateFeedback } from '../controller/Feedback.js';
import { refreshToken } from '../controller/RefreshToken.js';
import { getUsers, Login, Logout, Me, Register } from '../controller/Users.js';
import { verifyToken } from '../middleware/VerifyToken.js';

const router = express.Router();

router.get('/users', getUsers);
router.post('/register', Register);
router.post('/login', Login);
router.get('/me/:id', verifyToken, Me);
router.delete('/logout', Logout);
router.get('/token', refreshToken)

router.get('/feedback', getFeedback);
router.post('/feedbackId', getFeedbackById);
router.post('/saveFeed',verifyToken, saveFeedback);
router.patch('/updateFeed/:id', verifyToken, updateFeedback);
router.delete('/deleteFeed/:id',verifyToken, deleteFeedback);

router.get('/kategori', getCategorie);
router.post('/kategoriId', getCategorieById);
router.post('/savekategori',verifyToken, saveCategories);
router.patch('/updatekategori/:id', verifyToken, updateCategorie);
router.delete('/deletekategori/:id',verifyToken, deleteCategorie);

router.get('/fitur', getFeatures);
router.post('/fiturId', getFeaturesById);
router.post('/savefitur',verifyToken, saveFeatures);
router.patch('/updatefitur/:id', verifyToken, updateFeatures);
router.delete('/deletefitur/:id',verifyToken, deleteFeatures);


export default router;

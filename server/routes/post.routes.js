import express from 'express';
import { upload, comment, getComments, create, allPostUID, getByID } from '../controllers/post.controller.js';

const router = express.Router();

// Usa la configuración de Multer desde el controlador
router.post('/create', upload.single('image'), create);
router.post('/allPostUID', allPostUID)
router.post('/getByID', getByID)
router.post('/comment', comment)
router.post('/getComments', getComments)

export default router;
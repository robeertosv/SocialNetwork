import express from 'express';
import { upload, create, allPostUID, getByID } from '../controllers/post.controller.js';

const router = express.Router();

// Usa la configuración de Multer desde el controlador
router.post('/create', upload.single('image'), create);
router.post('/allPostUID', allPostUID)
router.post('/getByID', getByID)

export default router;
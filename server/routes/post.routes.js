import express from 'express';
import { upload, create } from '../controllers/post.controller.js';

const router = express.Router();

// Usa la configuración de Multer desde el controlador
router.post('/create', upload.single('image'), create);

export default router;
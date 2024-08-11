import express from 'express';
import { upload, create, allPostUID } from '../controllers/post.controller.js';

const router = express.Router();

// Usa la configuración de Multer desde el controlador
router.post('/create', upload.single('image'), create);
router.post('/allPostUID', allPostUID)

export default router;
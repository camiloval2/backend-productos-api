import { Router } from 'express';
import { ProductoController } from '../controllers/producto.controller.js';

const router = Router();
const controller = new ProductoController();

// Definición de rutas asociadas a los verbos HTTP correspondientes
router.get('/', controller.listar);
router.get('/:id', controller.buscarPorId);
router.post('/', controller.crear);
router.put('/:id', controller.actualizar);
router.delete('/:id', controller.eliminar);

export default router;

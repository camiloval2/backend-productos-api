import { Request, Response } from 'express';
import { ProductoService } from '../services/producto.service.js';

export class ProductoController {
  private service: ProductoService;

  constructor() {
    this.service = new ProductoService();
  }

  // 1. GET /api/productos
  public listar = async (req: Request, res: Response): Promise<void> => {
    try {
      const productos = await this.service.listarProductos();
      res.status(200).json(productos);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  // 2. GET /api/productos/:id
  public buscarPorId = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      const producto = await this.service.buscarProductoPorId(id);
      res.status(200).json(producto);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  };

  // 3. POST /api/productos
  public crear = async (req: Request, res: Response): Promise<void> => {
    try {
      const nuevoProducto = await this.service.registrarProducto(req.body);
      res.status(201).json(nuevoProducto);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  // 4. PUT /api/productos/:id
  public actualizar = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      const productoModificado = await this.service.modificarProducto(id, req.body);
      res.status(200).json(productoModificado);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  // 5. DELETE /api/productos/:id
  public eliminar = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      await this.service.removerProducto(id);
      res.status(204).send(); // 204 significa Exito sin contenido de respuesta
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  };
}

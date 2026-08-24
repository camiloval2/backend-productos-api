import { Producto } from '../entities/producto.entity.js';

export class ProductoRepository {
  // 1. Obtener todos los productos
  async obtenerTodos(): Promise<Producto[]> {
    return await Producto.findAll();
  }

  // 2. Obtener un producto por su ID
  async obtenerPorId(id: number): Promise<Producto | null> {
    return await Producto.findByPk(id);
  }

  // 3. Crear un nuevo producto
  async crear(datos: { nombre: string; descripcion?: string; precio: number }): Promise<Producto> {
    return await Producto.create(datos);
  }

  // 4. Actualizar un producto existente
  async actualizar(id: number, datos: { nombre?: string; descripcion?: string; precio?: number }): Promise<Producto | null> {
    const producto = await Producto.findByPk(id);
    if (!producto) return null;
    return await producto.update(datos);
  }

  // 5. Eliminar un producto
  async eliminar(id: number): Promise<boolean> {
    const producto = await Producto.findByPk(id);
    if (!producto) return false;
    await producto.destroy();
    return true;
  }
}

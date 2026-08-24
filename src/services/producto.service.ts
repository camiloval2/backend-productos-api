import { ProductoRepository } from '../repositories/producto.repository.js';
import { Producto } from '../entities/producto.entity.js';

export class ProductoService {
  private repository: ProductoRepository;

  constructor() {
    this.repository = new ProductoRepository();
  }

  // 1. Lógica para obtener todos los productos
  async listarProductos(): Promise<Producto[]> {
    return await this.repository.obtenerTodos();
  }

  // 2. Lógica para obtener un producto con validación de existencia
  async buscarProductoPorId(id: number): Promise<Producto> {
    const producto = await this.repository.obtenerPorId(id);
    if (!producto) {
      throw new Error(`Producto con ID ${id} no encontrado`);
    }
    return producto;
  }

  // 3. Lógica para crear un producto con validaciones de datos
  async registrarProducto(datos: { nombre: string; descripcion?: string; precio: number }): Promise<Producto> {
    if (!datos.nombre || datos.nombre.trim() === '') {
      throw new Error('El nombre del producto es obligatorio');
    }
    if (datos.precio === undefined || datos.precio < 0) {
      throw new Error('El precio no puede ser negativo o estar vacío');
    }
    return await this.repository.crear(datos);
  }

  // 4. Lógica para actualizar validando que el producto exista previamente
  async modificarProducto(id: number, datos: { nombre?: string; descripcion?: string; precio?: number }): Promise<Producto> {
    if (datos.precio !== undefined && datos.precio < 0) {
      throw new Error('El precio modificado no puede ser negativo');
    }
    
    const productoActualizado = await this.repository.actualizar(id, datos);
    if (!productoActualizado) {
      throw new Error(`No se pudo actualizar: Producto con ID ${id} no encontrado`);
    }
    return productoActualizado;
  }

  // 5. Lógica para eliminar validando existencia
  async removerProducto(id: number): Promise<void> {
    const eliminado = await this.repository.eliminar(id);
    if (!eliminado) {
      throw new Error(`No se pudo eliminar: Producto con ID ${id} no encontrado`);
    }
  }
}

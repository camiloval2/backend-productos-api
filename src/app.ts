import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './config/database.js';
import productoRoutes from './routes/producto.routes.js';

// Cargamos variables de entorno (.env)
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para que Express entienda el cuerpo de las peticiones en formato JSON
app.use(express.json());

// Enlazamos la Capa de Rutas bajo el prefijo universal /api/productos
app.use('/api/productos', productoRoutes);

// Función principal para arrancar la base de datos y luego el servidor
async function iniciarServidor() {
  try {
    // Autenticamos conexión física con Render
    await sequelize.authenticate();
    console.log('Conexión exitosa a la base de datos de Render.');

    // Sincronizamos los modelos: Sequelize crea las tablas en la nube si no existen
    await sequelize.sync({ alter: true });
    console.log('Tablas sincronizadas correctamente en Render.');

    // Encendemos el servidor de Express
    app.listen(PORT, () => {
      console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error crítico al iniciar la aplicación:', error);
  }
}

iniciarServidor();

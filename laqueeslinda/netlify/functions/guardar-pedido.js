// netlify/functions/guardar-pedido.js

const fs = require('fs');
const path = require('path');

// Crear carpeta de datos si no existe
const dataDir = path.join('/tmp', 'pedidos');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

exports.handler = async (event, context) => {
  try {
    // Solo aceptar POST
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Método no permitido' })
      };
    }

    const data = JSON.parse(event.body);
    const action = data.action;

    if (action === 'guardar_pedido') {
      return await guardarPedido(data.pedido);
    } else if (action === 'guardar_imagen') {
      return await guardarImagen(data.base64, data.filename);
    } else if (action === 'obtener_pedidos') {
      return await obtenerPedidos();
    }

    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Acción no válida' })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: error.message,
        success: false 
      })
    };
  }
};

async function guardarPedido(pedido) {
  try {
    const dataDir = path.join('/tmp', 'pedidos');
    const fecha = new Date().toISOString().slice(0, 10);
    const filename = `pedido_${pedido.id}_${fecha}.json`;
    const filepath = path.join(dataDir, filename);

    const contenido = {
      id: pedido.id,
      cliente: pedido.cliente,
      telefono: pedido.tel,
      productos: pedido.items,
      total: pedido.total,
      fecha: pedido.date,
      entrega: pedido.entrega,
      pago: pedido.pago,
      guardado_en: new Date().toLocaleString('es-MX')
    };

    fs.writeFileSync(filepath, JSON.stringify(contenido, null, 2));

    console.log('✅ Pedido guardado:', filename);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Pedido guardado exitosamente',
        filename: filename
      })
    };
  } catch (error) {
    console.error('Error guardando pedido:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
}

async function guardarImagen(base64Data, filename) {
  try {
    const dataDir = path.join('/tmp', 'imagenes');
    
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Decodificar base64
    const buffer = Buffer.from(base64Data, 'base64');
    const filepath = path.join(dataDir, filename);

    fs.writeFileSync(filepath, buffer);

    console.log('✅ Imagen guardada:', filename);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Imagen guardada exitosamente',
        filename: filename,
        url: `/imagenes/${filename}`
      })
    };
  } catch (error) {
    console.error('Error guardando imagen:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
}

async function obtenerPedidos() {
  try {
    const dataDir = path.join('/tmp', 'pedidos');
    
    if (!fs.existsSync(dataDir)) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          pedidos: [],
          total: 0
        })
      };
    }

    const files = fs.readdirSync(dataDir);
    const pedidos = [];

    files.forEach(file => {
      try {
        const filepath = path.join(dataDir, file);
        const content = fs.readFileSync(filepath, 'utf8');
        pedidos.push(JSON.parse(content));
      } catch (e) {
        console.error('Error leyendo:', file);
      }
    });

    // Ordenar por fecha descendente
    pedidos.sort((a, b) => b.id - a.id);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        pedidos: pedidos,
        total: pedidos.length
      })
    };
  } catch (error) {
    console.error('Error obteniendo pedidos:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
}

// server.js - Backend simple para guardar pedidos e imágenes
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Crear carpetas si no existen
const datosDir = path.join(__dirname, 'datos');
const pedidosDir = path.join(datosDir, 'pedidos');
const imagenesDir = path.join(datosDir, 'imagenes');

[datosDir, pedidosDir, imagenesDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// ========================================
// RUTA PRINCIPAL
// ========================================
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
    endpoints: {
      guardarPedido: 'POST /api/pedidos',
      obtenerPedidos: 'GET /api/pedidos',
      subirImagen: 'POST /api/imagenes',
      obtenerImagen: 'GET /imagenes/:filename'
    }
  });
});

// ========================================
// GUARDAR PEDIDO
// ========================================
app.post('/api/pedidos', (req, res) => {
  try {
    const pedido = req.body;

    if (!pedido || !pedido.id) {
      return res.status(400).json({ 
        success: false, 
        error: 'Pedido inválido' 
      });
    }

    const fecha = new Date().toISOString().slice(0, 10);
    const filename = `pedido_${pedido.id}_${fecha}.json`;
    const filepath = path.join(pedidosDir, filename);

    const contenido = {
      id: pedido.id,
      cliente: pedido.cliente,
      telefono: pedido.tel,
      productos: pedido.items,
      total: pedido.total,
      fecha: pedido.date,
      entrega: pedido.entrega,
      pago: pedido.pago,
      guardado_en: new Date().toLocaleString('es-MX'),
      estado: 'Completado'
    };

    fs.writeFileSync(filepath, JSON.stringify(contenido, null, 2));

    console.log(`✅ Pedido guardado: ${filename}`);

    res.json({
      success: true,
      message: 'Pedido guardado exitosamente',
      filename: filename,
      id: pedido.id
    });
  } catch (error) {
    console.error('❌ Error guardando pedido:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ========================================
// OBTENER TODOS LOS PEDIDOS
// ========================================
app.get('/api/pedidos', (req, res) => {
  try {
    if (!fs.existsSync(pedidosDir)) {
      return res.json({
        success: true,
        total: 0,
        pedidos: []
      });
    }

    const files = fs.readdirSync(pedidosDir);
    const pedidos = [];

    files.forEach(file => {
      try {
        const filepath = path.join(pedidosDir, file);
        const content = fs.readFileSync(filepath, 'utf8');
        pedidos.push(JSON.parse(content));
      } catch (e) {
        console.error(`Error leyendo ${file}`);
      }
    });

    // Ordenar por ID descendente
    pedidos.sort((a, b) => b.id - a.id);

    res.json({
      success: true,
      total: pedidos.length,
      pedidos: pedidos
    });
  } catch (error) {
    console.error('❌ Error obteniendo pedidos:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ========================================
// SUBIR IMAGEN (base64)
// ========================================
app.post('/api/imagenes', (req, res) => {
  try {
    const { base64, filename } = req.body;

    if (!base64 || !filename) {
      return res.status(400).json({
        success: false,
        error: 'Faltan datos (base64 y filename)'
      });
    }

    // Decodificar base64
    const buffer = Buffer.from(base64.split(',')[1] || base64, 'base64');
    
    // Crear nombre único
    const timestamp = Date.now();
    const ext = path.extname(filename);
    const name = path.basename(filename, ext);
    const nuevoFilename = `${name}_${timestamp}${ext}`;
    
    const filepath = path.join(imagenesDir, nuevoFilename);

    fs.writeFileSync(filepath, buffer);

    console.log(`✅ Imagen guardada: ${nuevoFilename}`);

    res.json({
      success: true,
      message: 'Imagen guardada exitosamente',
      filename: nuevoFilename,
      url: `/imagenes/${nuevoFilename}`
    });
  } catch (error) {
    console.error('❌ Error guardando imagen:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ========================================
// OBTENER IMAGEN
// ========================================
app.get('/imagenes/:filename', (req, res) => {
  try {
    const filename = req.params.filename;
    const filepath = path.join(imagenesDir, filename);

    // Seguridad: evitar directory traversal
    if (!filepath.startsWith(imagenesDir)) {
      return res.status(403).json({ error: 'Acceso denegado' });
    }

    if (!fs.existsSync(filepath)) {
      return res.status(404).json({ error: 'Imagen no encontrada' });
    }

    // Detectar tipo MIME
    const ext = path.extname(filename).toLowerCase();
    const mimeTypes = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.webp': 'image/webp'
    };

    const mimeType = mimeTypes[ext] || 'application/octet-stream';
    res.setHeader('Content-Type', mimeType);
    res.sendFile(filepath);
  } catch (error) {
    console.error('❌ Error obteniendo imagen:', error);
    res.status(500).json({ error: error.message });
  }
});

// ========================================
// SERVIR ARCHIVOS ESTÁTICOS
// ========================================
app.use(express.static('public'));

// Catch-all para SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'), (err) => {
    if (err) {
      res.status(404).json({ error: 'Not found' });
    }
  });
});

// ========================================
// INICIAR SERVIDOR
// ========================================
app.listen(PORT, () => {
  console.log(`✅ Servidor ejecutándose en puerto ${PORT}`);
  console.log(`📁 Pedidos guardados en: ${pedidosDir}`);
  console.log(`📁 Imágenes guardadas en: ${imagenesDir}`);
  console.log(`🌐 Abre: http://localhost:${PORT}`);
});

module.exports = app;


# 🚀 LA QUE ES LINDA - TIENDA ONLINE COMPLETA

## 📋 Descripción

Tienda online completa con:
- ✅ Frontend (HTML/CSS/JS)
- ✅ Backend (Node.js/Express)
- ✅ Guardado de pedidos en servidor
- ✅ Guardado de imágenes en servidor
- ✅ Panel admin completo
- ✅ Carrito funcional
- ✅ Checkout con validaciones

---

## 📁 Estructura del Proyecto

```
la-que-es-linda/
├── server.js              # Servidor Express
├── package.json           # Dependencias Node
├── Procfile              # Para deploy en Render/Heroku
├── .gitignore            # Archivos a ignorar
├── public/
│   ├── index.html        # Frontend
│   └── (assets)
└── datos/
    ├── pedidos/          # Pedidos guardados (se crea automáticamente)
    └── imagenes/         # Imágenes guardadas (se crea automáticamente)
```

---

## 🛠️ INSTALACIÓN LOCAL

### PASO 1: Clonar/Descargar el proyecto
```bash
git clone https://github.com/tu-usuario/laqueeslinda.git
cd laqueeslinda
```

### PASO 2: Instalar dependencias
```bash
npm install
```

### PASO 3: Iniciar servidor local
```bash
npm start
```

O en desarrollo (con recarga automática):
```bash
npm run dev
```

### PASO 4: Abrir en navegador
```
http://localhost:5000
```

---

## 🚀 DEPLOY EN RENDER (RECOMENDADO)

### PASO 1: Crear cuenta en Render
- Ve a: https://render.com
- Registrate o inicia sesión

### PASO 2: Conectar GitHub
1. Haz push de tu proyecto a GitHub
2. En Render → New → Web Service
3. Conecta tu repositorio de GitHub

### PASO 3: Configuración
```
Build Command: npm install
Start Command: npm start
Node Version: 18
```

### PASO 4: Variables de entorno
```
PORT=5000 (Render lo configura automáticamente)
```

### PASO 5: Deploy
- Click "Deploy"
- Espera 2-3 minutos
- ✅ Tu tienda estará en vivo

---

## 🌐 DEPLOY EN HEROKU (Alternativo)

### PASO 1: Instalar Heroku CLI
```bash
npm install -g heroku
heroku login
```

### PASO 2: Crear app
```bash
heroku create tu-app-name
```

### PASO 3: Push a Heroku
```bash
git push heroku main
```

### PASO 4: Verificar
```bash
heroku logs --tail
```

---

## 📂 ESTRUCTURA DE CARPETAS GUARDADAS

### Pedidos (`datos/pedidos/`)
```json
{
  "id": 1234567890,
  "cliente": "Juan Pérez",
  "telefono": "+5215512345678",
  "productos": [
    {
      "name": "Sérum Vitamina C",
      "qty": 1,
      "subtotal": 389
    }
  ],
  "total": 389,
  "fecha": "18/3/2026 14:30:00",
  "entrega": "domicilio",
  "pago": "efectivo",
  "estado": "Completado"
}
```

### Imágenes (`datos/imagenes/`)
```
imagen1_1234567890.jpg
imagen2_1234567890.png
producto_foto_1234567890.jpeg
```

---

## 🔌 ENDPOINTS DE API

### Guardar Pedido
```
POST /api/pedidos
Body: { id, cliente, tel, items, total, date, entrega, pago }
Response: { success, message, filename, id }
```

### Obtener Pedidos
```
GET /api/pedidos
Response: { success, total, pedidos: [...] }
```

### Subir Imagen
```
POST /api/imagenes
Body: { base64, filename }
Response: { success, message, filename, url }
```

### Obtener Imagen
```
GET /imagenes/:filename
Response: (archivo de imagen)
```

---

## 🔐 CREDENCIALES ADMIN

```
Usuario: admin
Contraseña: linda2024
```

---

## 📊 CARACTERÍSTICAS

### Frontend
- ✅ Tienda completa con productos
- ✅ Carrito funcional
- ✅ Checkout con validaciones
- ✅ Panel admin
- ✅ Búsqueda y filtrado
- ✅ Responsive design

### Backend
- ✅ API REST
- ✅ Guardado de pedidos
- ✅ Guardado de imágenes
- ✅ CORS habilitado
- ✅ Manejo de errores

---

## 🧪 TESTING

### Test local
```bash
npm start
# Abre http://localhost:5000
# Haz un pedido de prueba
```

### Verificar datos
```bash
# Los pedidos están en: datos/pedidos/
# Las imágenes están en: datos/imagenes/
# Usa el panel admin para ver todo
```

---

## 🛡️ SEGURIDAD

- ✅ CORS configurado
- ✅ Límite de tamaño de archivo (10MB)
- ✅ Validación de rutas (evita directory traversal)
- ✅ HTTPS en production (automático en Render)

---

## 🚨 PROBLEMAS COMUNES

### Problema 1: Puerto en uso
```bash
# Cambiar puerto
PORT=3000 npm start
```

### Problema 2: Carpeta datos no se crea
- El servidor la crea automáticamente
- Si hay error, verifica permisos

### Problema 3: Imágenes no se guardan
- Verifica que la carpeta datos/imagenes existe
- Verifica que el archivo base64 es válido
- Revisa el console del servidor

---

## 📝 VARIABLES DE ENTORNO

```
PORT=5000                    # Puerto del servidor
NODE_ENV=production          # Modo producción
```

---

## 🔄 ACTUALIZAR DESPUÉS DE CAMBIOS

### En local
```bash
git add .
git commit -m "Mi cambio"
git push
```

### Render deploy automáticamente
- Solo haz push a GitHub
- Render detecta automáticamente cambios
- Deploy en 1-2 minutos

### Heroku
```bash
git push heroku main
```

---

## 📞 SOPORTE

### Errores en servidor
```bash
# Ver logs en Render
# Ve a Project → Logs

# O con Heroku
heroku logs --tail
```

### Errores en navegador
```bash
# Abre F12 → Console
# Busca mensajes de error
```

---

## ✅ CHECKLIST DE DEPLOY

- [ ] Crear cuenta en Render
- [ ] Conectar repositorio GitHub
- [ ] Configurar variables de entorno
- [ ] Deploy
- [ ] Abrir URL del proyecto
- [ ] Hacer un pedido de prueba
- [ ] Verificar en panel admin
- [ ] Verificar que pedido está en `/datos/pedidos/`

---

## 🎉 ¡LISTO!

Tu tienda está lista para:
- ✅ Recibir pedidos
- ✅ Guardar imágenes
- ✅ Gestionar admin
- ✅ ¡VENDER!

---

**¡Éxito con tu tienda!** 💜

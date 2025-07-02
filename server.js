const express = require('express');
const path = require('path');

const app = express();

// Cambia la ruta al subdirectorio browser
app.use(express.static(path.join(__dirname, 'dist/SkyNet_desa_f/browser')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/SkyNet_desa_f/browser/index.html'));
});

// Configuración del puerto
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
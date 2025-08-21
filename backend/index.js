const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

// Endpoint para obtener el listado de dispositivos
app.get('/api/dispositivos', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM Dispositivos ORDER BY nombre');
        res.json(rows);
        await connection.end();
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los dispositivos: ' + error.message });
    }
});

// Endpoint para obtener los detalles de UN solo dispositivo
app.get('/api/dispositivos/:id', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [dispositivos] = await connection.execute('SELECT * FROM Dispositivos WHERE dispositivoId = ?', [req.params.id]);

        if (dispositivos.length > 0) {
            const [mediciones] = await connection.execute(
                'SELECT * FROM Mediciones WHERE dispositivoId = ? ORDER BY fecha DESC LIMIT 1',
                [req.params.id]
            );
            const response = {
                ...dispositivos[0],
                ultimaMedicion: mediciones.length > 0 ? mediciones[0] : null
            };
            res.json(response);
        } else {
            res.status(404).json({ error: 'Dispositivo no encontrado' });
        }
        await connection.end();
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el dispositivo: ' + error.message });
    }
});

// Endpoint para obtener el historial de mediciones
app.get('/api/dispositivos/:id/mediciones', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM Mediciones WHERE dispositivoId = ? ORDER BY fecha DESC', [req.params.id]);
        res.json(rows);
        await connection.end();
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las mediciones: ' + error.message });
    }
});

// Endpoint para abrir/cerrar la válvula
app.post('/api/electrovalvulas/:id/accionar', async (req, res) => {
    try {
        const { apertura, dispositivoId } = req.body;
        const nuevaMedicionValor = Math.floor(Math.random() * 101);

        const connection = await mysql.createConnection(dbConfig);
        
        await connection.execute(
            'INSERT INTO Log_Riegos (apertura, fecha, electrovalvulaId) VALUES (?, NOW(), ?)',
            [apertura, req.params.id]
        );

        await connection.execute(
            'INSERT INTO Mediciones (fecha, valor, dispositivoId) VALUES (NOW(), ?, ?)',
            [nuevaMedicionValor.toString(), dispositivoId]
        );
        
        await connection.end();
        res.json({ success: true, message: 'Acción registrada correctamente.' });
    } catch (error) {
        res.status(500).json({ error: 'Error al accionar la válvula: ' + error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🎉 Servidor Backend iniciado en el puerto ${PORT}`);
});
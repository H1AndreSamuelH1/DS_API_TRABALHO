const express = require('express');
const cors = require('cors');
const db = require('./config/banco'); // Corrigido para apontar para o ficheiro 'banco.js'

const app = express();
app.use(express.json());
app.use(cors());

// Testagem
app.get('/', (req, res) => {
    res.json({ mensagem: 'API da Loja online em funcionamento!' });
});

// Listagem de Produtos
app.get('/produtos', (req, res) => {
    db.query('SELECT * FROM produtos', (err, results) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json(results); // Adicionado para devolver os resultados ao cliente
    });
});

// Cadastramento de clientes
app.post('/clientes', (req, res) => {
    const { nome, altura, nascimento, cidade_id } = req.body;
    const query = 'INSERT INTO clientes (nome, altura, nascimento, cidade_id) VALUES (?, ?, ?, ?)';

    db.query(query, [nome, altura, nascimento, cidade_id], (err, results) => {
        if (err) return res.status(400).json({ erro: err.message });
        res.status(201).json({ id: results.insertId, nome, altura, nascimento, cidade_id });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT}`);
});
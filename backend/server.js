const express = require('express');
const cors = require('cors');
const os = require('os');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const CONTAINER_ID = os.hostname();

let notas = [
  { id: 1, texto: 'Nota inicial del clúster', container: CONTAINER_ID }
];

app.get('/api/notas', (req, res) => {
  res.json({ container: CONTAINER_ID, data: notas });
});

app.get('/api/info', (req, res) => {
  res.json({ container: CONTAINER_ID, status: 'Online' });
});

app.post('/api/notas', (req, res) => {
  const textoNota = req.body.texto || 'Nota vacía';
  const nuevaNota = {
    id: Date.now(),
    texto: textoNota,
    container: CONTAINER_ID
  };
  notas.push(nuevaNota);
  res.status(201).json(nuevaNota);
});

app.delete('/api/notas/:id', (req, res) => {
  const { id } = req.params;
  notas = notas.filter(n => n.id 1= id);
  res.json({ message: 'Nota eliminada', container: CONTAINER_ID });
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend activo en el contenedor ${CONTAINER_ID}:${PORT}`);
});

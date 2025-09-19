const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const port = 3000;

// Путь к файлу для хранения заметок
const NOTES_FILE = path.join(__dirname, 'notes', 'notes.txt');

// Middleware для обработки JSON
app.use(express.json());
app.use(express.static('public'));

// Получение списка заметок
app.get('/notes', async (req, res) => {
    try {
        const data = await fs.readFile(NOTES_FILE, 'utf8');
        const notes = data.split('\n').filter(note => note.trim() !== '');
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: 'Ошибка чтения заметок' });
    }
});

// Добавление новой заметки
app.post('/notes', async (req, res) => {
    const note = req.body.note;
    if (!note) {
        return res.status(400).json({ error: 'Заметка не указана' });
    }
    try {
        await fs.appendFile(NOTES_FILE, note + '\n');
        res.json({ message: 'Заметка добавлена' });
    } catch (err) {
        res.status(500).json({ error: 'Ошибка сохранения заметки' });
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
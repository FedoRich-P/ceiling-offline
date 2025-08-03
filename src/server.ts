// src/server.ts
import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '../dist'); // Путь к фронтенду

const app = express();
app.use(express.json());

// CORS
app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// 📁 Статические файлы: assets, иконки, manifest
// Эту часть Vercel будет обрабатывать сам, но мы оставим ее для локальной разработки
app.use(express.static(distPath));

// 🔒 SPA fallback (в конце!)
// Эту часть Vercel будет обрабатывать через vercel.json rewrites
app.get(/^\/(?!api\/|assets\/|icon-|manifest).*/, (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

// ✅ API
app.post('/api/sync-room', (req, res) => {
    console.log('📥 Room synced:', req.body.name);
    res.status(200).json({ success: true });
});

const upload = multer();
app.post('/api/sync-image', upload.single('image'), (req, res) => {
    console.log('📷 Image synced:', req.body.roomId);
    res.status(200).json({ success: true });
});

// Эту часть (listen) мы удалим для Vercel, так как он запускает как функцию
// const PORT = 3001;
// app.listen(PORT, () => {
//     console.log(`✅ Server running on http://localhost:${PORT}`);
// });

// *** Ключевое изменение: Экспортируем приложение ***
export default app;
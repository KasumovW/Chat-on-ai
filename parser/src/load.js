const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

// Конфигурация
const apiUrl = 'http://127.0.0.1:8001/v1/ingest';
const dataDirectory = path.join(__dirname, '..','data');

// Функция для получения списка загруженных документов
async function getIngestedDocuments() {
    try {
        const response = await axios.get(`${apiUrl}/list`);
        return response.data.data.map(doc => doc.doc_metadata.file_name);
    } catch (error) {
        console.error('Error fetching ingested documents:', error);
        return [];
    }
}

// Функция для загрузки файла в систему
async function ingestFile(filePath) {
    try {
        const formData = new FormData();
        formData.append('file', fs.createReadStream(filePath));

        await axios.post(`${apiUrl}/file`, formData, {
            headers: formData.getHeaders()
        });

        console.log(`File ${path.basename(filePath)} ingested successfully.`);
    } catch (error) {
        console.error(`Error ingesting file ${path.basename(filePath)}:`, error);
    }
}

// Основная функция для чтения директории и загрузки недостающих файлов
async function processFiles() {
    // Получаем список загруженных документов
    const ingestedDocuments = await getIngestedDocuments();

    // Читаем директорию data синхронно
    try {
        const files = fs.readdirSync(dataDirectory);

        // Фильтруем файлы .md, которые еще не загружены
        const mdFiles = files.filter(file => file.endsWith('.md') && !ingestedDocuments.includes(file));

        // Загружаем недостающие файлы
        for (const file of mdFiles) {
            const filePath = path.join(dataDirectory, file);
            await ingestFile(filePath);
        }
    } catch (err) {
        console.error('Unable to scan directory:', err);
    }
}

// Запускаем процесс
processFiles();


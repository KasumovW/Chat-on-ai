// const fs = require("fs");
// const path = require("path");
// const express = require("express");

// const app = express();
// const port = 8002;

// app.get("/map", (_req, res) => {
//   const filePath = path.join(__dirname, "..", "map.json");
//   fs.readFile(filePath, "utf8", (err, data) => {
//     if (err) {
//       res.status(500).json({ error: "Failed to read file" });
//     } else {
//       res.json(JSON.parse(data));
//     }
//   });
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

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

// const fs = require("fs");
// const path = require("path");
// const cheerio = require("cheerio");
// const TurndownService = require("turndown");
// const puppeter = require("./puppeter");

// const turndownService = new TurndownService();

// // Функция для загрузки HTML с указанной страницы
// async function fetchHTML(url) {
//   try {
//     const { page } = await puppeter.getPageContent(url);
//     await new Promise((res) => setTimeout(res, 1000));
//     const content = await page.content();
//     await puppeter.releasePage(page);
//     return content;
//   } catch (error) {
//     console.error("Ошибка при загрузке страницы:", error);
//     return null;
//   }
// }

// // Функция для парсинга HTML и создания Markdown
// function parseHTML(html) {
//   const $ = cheerio.load(html); // Загрузка HTML с помощью Cheerio

//   // Пример: извлечение заголовка страницы
//   const title = $("title")
//     .text()
//     .replace(/[<>:"/\\|?*]+/g, "");

//   // Пример: извлечение основного контента страницы
//   const content = $("main").html();

//   // Генерация Markdown
//   let markdownContent = `# ${title}\n\n`; // Заголовок в Markdown
//   markdownContent += `${turndownService.turndown(content)}\n`; // Основной контент

//   return { markdownContent, title };
// }

// const links = Object.values(
//   JSON.parse(fs.readFileSync(path.join(__dirname, "..", "links.json"), "utf-8"))
// ).flat(Infinity);

// async function main() {

//   for (const url of links) {

//     let data = fs.readFileSync("map.json", "utf8");
//     let obj = JSON.parse(data);

//     if (Object.values(obj).includes(url)) {
//       console.log(url, 'skipped');
//       continue
//     };

//     const html = await fetchHTML(url);
//     if (!html) return;

//     const { markdownContent, title } = parseHTML(html);

//     const dir = path.join(__dirname, "..", "data", title + ".md");

//     fs.writeFileSync(dir, markdownContent, "utf-8");
//     console.log("Контент успешно записан в " + title + ".md");
    
//     try {
//       obj[title + ".md"] = url;

//       let newData = JSON.stringify(obj, null, 2);

//       fs.writeFileSync("map.json", newData, "utf8");

//       console.log("Файл успешно обновлен.");
//     } catch (err) {
//       console.error("Ошибка:", err);
//     }
//   }
// }

// main();

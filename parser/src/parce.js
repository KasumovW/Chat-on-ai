
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const TurndownService = require("turndown");
const puppeter = require("./puppeter");

const turndownService = new TurndownService();

// Функция для загрузки HTML с указанной страницы
async function fetchHTML(url) {
  try {
    const { page } = await puppeter.getPageContent(url);
    await new Promise((res) => setTimeout(res, 1000));
    const content = await page.content();
    await puppeter.releasePage(page);
    return content;
  } catch (error) {
    console.error("Ошибка при загрузке страницы:", error);
    return null;
  }
}

// Функция для парсинга HTML и создания Markdown
function parseHTML(html) {
  const $ = cheerio.load(html); // Загрузка HTML с помощью Cheerio

  // Пример: извлечение заголовка страницы
  const title = $("title")
    .text()
    .replace(/[<>:"/\\|?*]+/g, "");

  // Пример: извлечение основного контента страницы
  const content = $("main").html();

  // Генерация Markdown
  let markdownContent = `# ${title}\n\n`; // Заголовок в Markdown
  markdownContent += `${turndownService.turndown(content)}\n`; // Основной контент

  return { markdownContent, title };
}

const links = Object.values(
  JSON.parse(fs.readFileSync(path.join(__dirname, "..", "links.json"), "utf-8"))
).flat(Infinity);

async function main() {

  for (const url of links) {

    let data = fs.readFileSync("map.json", "utf8");
    let obj = JSON.parse(data);

    if (Object.values(obj).includes(url)) {
      console.log(url, 'skipped');
      continue
    };

    const html = await fetchHTML(url);
    if (!html) return;

    const { markdownContent, title } = parseHTML(html);

    const dir = path.join(__dirname, "..", "data", title + ".md");

    fs.writeFileSync(dir, markdownContent, "utf-8");
    console.log("Контент успешно записан в " + title + ".md");
    
    try {
      obj[title + ".md"] = url;

      let newData = JSON.stringify(obj, null, 2);

      fs.writeFileSync("map.json", newData, "utf8");

      console.log("Файл успешно обновлен.");
    } catch (err) {
      console.error("Ошибка:", err);
    }
  }
}

main();
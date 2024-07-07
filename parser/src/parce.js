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
  //   const title = $("title")
  //     .text()
  //     .replace(/[<>:"/\\|?*]+/g, "");

  // Пример: извлечение основного контента страницы
  const content = $("div").html();

  // Генерация Markdown
  let markdownContent = ``; // Заголовок в Markdown
  markdownContent += `${turndownService.turndown(content)}\n`; // Основной контент

  return { markdownContent /* title */ };
}

const links = Object.values(
  JSON.parse(fs.readFileSync(path.join(__dirname, "..", "links.json"), "utf-8"))
).flat(Infinity);

async function main() {
  for (const url of links) {
    let data = fs.readFileSync("map.json", "utf8");
    let obj = JSON.parse(data);

    if (Object.values(obj).includes(url)) {
      console.log(url, "skipped");
      continue;
    }

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

// main();
fs.writeFileSync(
  "red.txt",
  parseHTML(`
    <div class="markdown prose w-full break-words dark:prose-invert dark"><h1>README</h1><h2>Общая информация о проекте</h2><p>Современная документация RuStore охватывает множество инструментов и методов для разработки и публикации мобильных приложений. С ростом количества доступных инструментов и объема документации, разработчики сталкиваются с проблемами поиска нужной информации и оперативного решения вопросов. Это может существенно замедлить процесс разработки и снизить эффективность работы.</p><h3>Цель проекта</h3><p>Создание веб-чат-бота для автоматического ответа на вопросы пользователей и разрешения ошибок в программном коде, направляемом разработчиками, опираясь на документацию RuStore. Такой подход упростит доступ к необходимой информации и ускорит процесс решения проблем, улучшая общую производительность разработчиков.</p><h3>Основные компоненты проекта</h3><ol><li><p><strong>Парсер (parser)</strong></p><ul><li>Компонент для парсинга документации RuStore.</li><li>Извлекает и структурирует информацию для последующего анализа и использования в чат-боте.</li></ul></li><li><p><strong>Фронтенд (frontend)</strong></p><ul><li>Веб-интерфейс для взаимодействия с пользователями.</li><li>Позволяет пользователям задавать вопросы и получать ответы от чат-бота.</li><li>Обеспечивает удобный и интуитивно понятный интерфейс.</li></ul></li><li><p><strong>Бэкенд (backend)</strong></p><ul><li>Серверная часть, обрабатывающая запросы от фронтенда.</li><li>Включает в себя логику обработки вопросов, взаимодействие с парсером и генерацию ответов.</li><li>Обеспечивает интеграцию с базой данных для хранения и поиска информации.</li></ul></li></ol><h3>Установка и настройка</h3><p>Для установки и настройки проекта выполните следующие шаги:</p><ol><li><p>Клонируйте репозиторий и перейдите в директорию проекта:</p><pre><div class="dark bg-gray-950 rounded-md border-[0.5px] border-token-border-medium"><div class="flex items-center relative text-token-text-secondary bg-token-main-surface-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>bash</span><div class="flex items-center"><span class="" data-state="closed"><button class="flex gap-1 items-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="icon-sm"><path fill="currentColor" fill-rule="evenodd" d="M7 5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-2v2a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h2zm2 2h5a3 3 0 0 1 3 3v5h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1zM5 9a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1z" clip-rule="evenodd"></path></svg>Копировать код</button></span></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="!whitespace-pre hljs language-bash">git <span class="hljs-built_in">clone</span> &lt;репозиторий&gt;
<span class="hljs-built_in">cd</span> &lt;папка проекта&gt;
</code></div></div></pre></li><li><p>Настройте виртуальное окружение для Python:</p><pre><div class="dark bg-gray-950 rounded-md border-[0.5px] border-token-border-medium"><div class="flex items-center relative text-token-text-secondary bg-token-main-surface-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>bash</span><div class="flex items-center"><span class="" data-state="closed"><button class="flex gap-1 items-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="icon-sm"><path fill="currentColor" fill-rule="evenodd" d="M7 5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-2v2a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h2zm2 2h5a3 3 0 0 1 3 3v5h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1zM5 9a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1z" clip-rule="evenodd"></path></svg>Копировать код</button></span></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="!whitespace-pre hljs language-bash">py -3.11 -m venv <span class="hljs-built_in">env</span>
<span class="hljs-built_in">env</span>\Scripts\activate
</code></div></div></pre></li><li><p>Установите зависимости для каждого компонента, следуя инструкциям в соответствующих README файлах:</p><ul><li><a rel="noreferrer">Парсер (parser)</a></li><li><a rel="noreferrer">Фронтенд (frontend)</a></li><li><a rel="noreferrer">Бэкенд (backend)</a></li></ul></li><li><p>Запустите каждый компонент согласно инструкциям в их README файлах.</p></li></ol><h3>Запуск проекта</h3><ol><li>Убедитесь, что все компоненты установлены и настроены правильно.</li><li>Запустите сервер бэкенда:<pre><div class="dark bg-gray-950 rounded-md border-[0.5px] border-token-border-medium"><div class="flex items-center relative text-token-text-secondary bg-token-main-surface-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>bash</span><div class="flex items-center"><span class="" data-state="closed"><button class="flex gap-1 items-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="icon-sm"><path fill="currentColor" fill-rule="evenodd" d="M7 5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-2v2a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h2zm2 2h5a3 3 0 0 1 3 3v5h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1zM5 9a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1z" clip-rule="evenodd"></path></svg>Копировать код</button></span></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="!whitespace-pre hljs language-bash"><span class="hljs-built_in">cd</span> backend
python app.py
</code></div></div></pre></li><li>Запустите фронтенд:<pre><div class="dark bg-gray-950 rounded-md border-[0.5px] border-token-border-medium"><div class="flex items-center relative text-token-text-secondary bg-token-main-surface-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>bash</span><div class="flex items-center"><span class="" data-state="closed"><button class="flex gap-1 items-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="icon-sm"><path fill="currentColor" fill-rule="evenodd" d="M7 5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-2v2a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h2zm2 2h5a3 3 0 0 1 3 3v5h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1zM5 9a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1z" clip-rule="evenodd"></path></svg>Копировать код</button></span></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="!whitespace-pre hljs language-bash"><span class="hljs-built_in">cd</span> frontend
npm start
</code></div></div></pre></li></ol><h3>Контрибьюция</h3><p>Если вы хотите внести вклад в проект, пожалуйста, следуйте этим шагам:</p><ol><li>Форкните репозиторий.</li><li>Создайте новую ветку:<pre><div class="dark bg-gray-950 rounded-md border-[0.5px] border-token-border-medium"><div class="flex items-center relative text-token-text-secondary bg-token-main-surface-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>bash</span><div class="flex items-center"><span class="" data-state="closed"><button class="flex gap-1 items-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="icon-sm"><path fill="currentColor" fill-rule="evenodd" d="M7 5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-2v2a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h2zm2 2h5a3 3 0 0 1 3 3v5h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1zM5 9a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1z" clip-rule="evenodd"></path></svg>Копировать код</button></span></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="!whitespace-pre hljs language-bash">git checkout -b my-feature-branch
</code></div></div></pre></li><li>Внесите свои изменения и закоммитьте их:<pre><div class="dark bg-gray-950 rounded-md border-[0.5px] border-token-border-medium"><div class="flex items-center relative text-token-text-secondary bg-token-main-surface-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>bash</span><div class="flex items-center"><span class="" data-state="closed"><button class="flex gap-1 items-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="icon-sm"><path fill="currentColor" fill-rule="evenodd" d="M7 5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-2v2a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h2zm2 2h5a3 3 0 0 1 3 3v5h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1zM5 9a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1z" clip-rule="evenodd"></path></svg>Копировать код</button></span></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="!whitespace-pre hljs language-bash">git commit -m <span class="hljs-string">"Добавлено новое улучшение"</span>
</code></div></div></pre></li><li>Отправьте изменения на ваш форк:<pre><div class="dark bg-gray-950 rounded-md border-[0.5px] border-token-border-medium"><div class="flex items-center relative text-token-text-secondary bg-token-main-surface-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>bash</span><div class="flex items-center"><span class="" data-state="closed"><button class="flex gap-1 items-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="icon-sm"><path fill="currentColor" fill-rule="evenodd" d="M7 5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-2v2a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h2zm2 2h5a3 3 0 0 1 3 3v5h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1zM5 9a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1z" clip-rule="evenodd"></path></svg>Копировать код</button></span></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="!whitespace-pre hljs language-bash">git push origin my-feature-branch
</code></div></div></pre></li><li>Создайте Pull Request на оригинальный репозиторий.</li></ol><h3>Лицензия</h3><p>Этот проект лицензирован под лицензией MIT. Подробности см. в файле LICENSE.</p><h3>Контакты</h3><p>Если у вас есть вопросы или предложения, пожалуйста, свяжитесь с нами по адресу: <a rel="noreferrer">support@rustore.com</a>.</p><hr><p>Этот README файл охватывает общую информацию о проекте и инструкции по его установке и запуску. Подробности по каждому компоненту можно найти в соответствующих README файлах в директориях <code>parser</code>, <code>frontend</code>, и <code>backend</code>.</p></div>
    `).markdownContent
);

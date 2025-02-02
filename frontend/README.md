## Описание UI

Этот проект является фронтенд-частью для чат-хакатона, разработанного с использованием Vite. Он взаимодействует с парсером, который предоставляет карту документов, и позволяет пользователям просматривать и навигировать по этим документам.

## Структура проекта

- `src/`: Директория с исходным кодом проекта.
- `public/`: Публичная директория для статических файлов.
- `index.html`: Основной HTML файл.
- `vite.config.ts`: Конфигурация Vite.

## Скрипты

В проекте определены следующие скрипты для разработки и сборки проекта:

- `"dev"`: Запуск сервера разработки.
- `"build"`: Сборка проекта для продакшн.
- `"lint"`: Запуск линтера для проверки кода.
- `"preview"`: Предпросмотр собранного проекта.

## Установка

Перед началом работы убедитесь, что у вас установлены Node.js и npm. Затем выполните следующие шаги:

1.  Склонируйте репозиторий:

    bash

    `git clone <URL репозитория>`

2.  Перейдите в директорию проекта:

    bash

    `cd <имя директории проекта>`

3.  Установите зависимости:

    bash

    `npm install`

## Использование

### Запуск сервера разработки

Для запуска сервера разработки выполните следующую команду:

bash

Копировать код

`npm run dev`

### Сборка проекта

Чтобы собрать проект для продакшн, используйте команду:

bash

Копировать код

`npm run build`

### Предпросмотр собранного проекта

Для предпросмотра собранного проекта выполните команду:

bash

Копировать код

`npm run preview`

### Линтинг кода

Для проверки кода на соответствие стандартам используйте команду:

bash

Копировать код

`npm run lint`

## Зависимости

Проект использует следующие зависимости:

- `@emotion/react`: Для стилизации компонентов.
- `@emotion/styled`: Для стилизации компонентов.
- `@mui/icons-material`: Иконки Material UI.
- `@mui/material`: Компоненты Material UI.
- `axios`: Для HTTP запросов.
- `markdown-to-jsx`: Для рендеринга Markdown.
- `prettier`: Для форматирования кода.
- `react`: Основная библиотека React.
- `react-dom`: Библиотека для работы с DOM в React.
- `react-notifications`: Для отображения уведомлений.

Проект использует следующие dev-зависимости:

- `@trivago/prettier-plugin-sort-imports`: Плагин для сортировки импортов.
- `@types/react`: Типы для React.
- `@types/react-dom`: Типы для React DOM.
- `@typescript-eslint/eslint-plugin`: Плагин ESLint для TypeScript.
- `@typescript-eslint/parser`: Парсер ESLint для TypeScript.
- `@vitejs/plugin-react`: Плагин Vite для React.
- `eslint`: Линтер для JavaScript и TypeScript.
- `eslint-plugin-react-hooks`: Плагин ESLint для хуков React.
- `eslint-plugin-react-refresh`: Плагин ESLint для React Refresh.
- `typescript`: Язык программирования TypeScript.
- `vite`: Бандлер для веб-приложений.
- `vite-tsconfig-paths`: Плагин Vite для поддержки путей из tsconfig.

## Дополнительная информация

Этот проект предназначен для работы с бекендом, который предоставляет карту документов. Убедитесь, что бекенд запущен и доступен перед запуском фронтенда.

Если у вас возникнут вопросы или проблемы, пожалуйста, создайте issue в репозитории.

## Установка

Перед началом установки важно ознакомиться с основными концепциями.

### Основные требования для запуска PrivateGPT

1.  **Клонируйте репозиторий PrivateGPT и перейдите в него:**
2.  **Установите Python 3.11** (если он у вас еще не установлен). Желательно использовать менеджер версий Python, такой как pyenv. Более ранние версии Python не поддерживаются.

    - OSX/Linux: pyenv
    - Windows: pyenv-win

    bash

    `pyenv install 3.11 pyenv local 3.11`

3.  **Установите Poetry для управления зависимостями.**
4.  **Установите make для возможности выполнения различных скриптов:**

    - OSX: (с помощью homebrew) `brew install make`
    - Windows: (с помощью chocolatey) `choco install make`

### Настройка окружения

Для настройки виртуального окружения на Windows выполните следующие команды:

bash

`py -3.11 -m venv <name> <name>Scriptsactivate`

### Установка и запуск желаемой конфигурации

PrivateGPT позволяет настраивать конфигурацию от полностью локальной до облачной, выбирая используемые модули. Доступные опции:

- **LLM**: “llama-cpp”, “ollama”, “sagemaker”, “openai”, “openailike”, “azopenai”
- **Embeddings**: “huggingface”, “openai”, “sagemaker”, “azopenai”
- **Vector stores**: “qdrant”, “chroma”, “postgres”
- **UI**: включение UI (Gradio) или использование только API

Для установки необходимых зависимостей PrivateGPT предлагает различные дополнительные пакеты, которые можно комбинировать:

bash

`poetry install --extras "<extra1> <extra2>..."`

Где `<extra>` может быть одним из следующих:

- ui: поддержка UI с использованием Gradio
- llms-ollama: поддержка Ollama LLM, требуется локально запущенный Ollama
- llms-llama-cpp: поддержка локального LLM с использованием LlamaCPP
- llms-sagemaker: поддержка Amazon Sagemaker LLM, требуются конечные точки Sagemaker
- llms-openai: поддержка OpenAI LLM, требуется ключ API OpenAI
- llms-openai-like: поддержка сторонних провайдеров LLM, совместимых с API OpenAI
- llms-azopenai: поддержка Azure OpenAI LLM, требуются конечные точки Azure OpenAI
- embeddings-ollama: поддержка Ollama Embeddings, требуется локально запущенный Ollama
- embeddings-huggingface: поддержка локальных Embeddings с использованием HuggingFace
- embeddings-sagemaker: поддержка Amazon Sagemaker Embeddings, требуются конечные точки Sagemaker
- embeddings-openai: поддержка OpenAI Embeddings, требуется ключ API OpenAI
- embeddings-azopenai: поддержка Azure OpenAI Embeddings, требуются конечные точки Azure OpenAI
- vector-stores-qdrant: поддержка Qdrant vector store
- vector-stores-chroma: поддержка Chroma DB vector store
- vector-stores-postgres: поддержка Postgres vector store

### Рекомендуемые конфигурации

Некоторые примеры рекомендуемых конфигураций. Вы можете комбинировать различные опции в зависимости от ваших потребностей. Дополнительная информация находится в разделе "Manual" документации.

### Важно для Windows

В приведенных ниже примерах или при запуске PrivateGPT с помощью `make run`, переменная окружения `PGPT_PROFILES` устанавливается inline, следуя синтаксису командной строки Unix (работает на MacOS и Linux). Если вы используете Windows, вам потребуется установить переменную окружения другим способом, например:

#### Powershell

powershell

`$env:PGPT_PROFILES="ollama" make run`

#### CMD

cmd

`set PGPT_PROFILES=ollama make run`

### Локальная настройка с Ollama - РЕКОМЕНДУЕМАЯ

Самый простой способ запустить PrivateGPT полностью локально - использовать Ollama для LLM. Ollama предоставляет локальный LLM и Embeddings, легко устанавливаемые и используемые, абстрагируя сложность поддержки GPU. Это рекомендуемая настройка для локальной разработки.

1.  Перейдите на [ollama.ai](https://ollama.ai) и следуйте инструкциям для установки Ollama на ваш компьютер.
2.  После установки убедитесь, что приложение Ollama закрыто.
3.  Установите модели для использования, настройки по умолчанию `settings-ollama.yaml` настроены для использования LLM mistral 7b (~4GB) и Embeddings nomic-embed-text (~275MB). Следовательно:

    bash

    `ollama pull mistral ollama pull nomic-embed-text`

4.  Запустите сервис Ollama (он запустит локальный сервер вывода, обслуживающий LLM и Embeddings):

    bash

    `ollama serve`

5.  В другом терминале установите PrivateGPT с помощью следующей команды:

    bash

    `poetry install --extras "ui llms-ollama embeddings-ollama vector-stores-qdrant"`

6.  После установки вы можете запустить PrivateGPT. Убедитесь, что Ollama работает локально перед запуском следующей команды.

    bash

    `PGPT_PROFILES=ollama make run`

PrivateGPT будет использовать уже существующий файл настроек `settings-ollama.yaml`, который настроен для использования Ollama LLM и Embeddings, а также Qdrant. Проверьте и адаптируйте его под свои нужды (разные модели, разные порты Ollama и т.д.).

UI будет доступен по адресу [http://localhost:8001](http://localhost:8001).

### Приватная настройка с Sagemaker

Если вам требуется больше производительности, вы можете запустить версию PrivateGPT, которая использует мощные машины AWS Sagemaker для обслуживания LLM и Embeddings.

1.  Вам необходимо иметь доступ к конечным точкам вывода Sagemaker для LLM и/или Embeddings, а также правильно настроенные AWS учетные данные.
2.  Отредактируйте файл `settings-sagemaker.yaml`, чтобы включить правильные конечные точки Sagemaker.
3.  Установите PrivateGPT с помощью следующей команды:

    bash

    `poetry install --extras "ui llms-sagemaker embeddings-sagemaker vector-stores-qdrant"`

4.  После установки вы можете запустить PrivateGPT. Убедитесь, что Ollama работает локально перед запуском следующей команды.

    bash

    `PGPT_PROFILES=sagemaker make run`

PrivateGPT будет использовать уже существующий файл настроек `settings-sagemaker.yaml`, который настроен для использования конечных точек Sagemaker LLM и Embeddings, а также Qdrant.

UI будет доступен по адресу [http://localhost:8001](http://localhost:8001).

### Неприватная настройка с использованием OpenAI для тестирования

Если вы хотите протестировать PrivateGPT с LLM и Embeddings от OpenAI (имейте в виду, что ваши данные будут отправляться в OpenAI!), выполните следующую команду:

1.  Вам понадобится ключ API OPENAI для запуска этой настройки.
2.  Отредактируйте файл `settings-openai.yaml`, чтобы включить правильный ключ API. Никогда не коммитьте его! Это секрет! В качестве альтернативы редактированию `settings-openai.yaml`, вы можете просто установить переменную окружения `OPENAI_API_KEY`.
3.  Установите PrivateGPT с помощью следующей команды:

    bash

    `poetry install --extras "ui llms-openai embeddings-openai vector-stores-qdrant"`

4.  После установки вы можете запустить PrivateGPT.

    bash

    `PGPT_PROFILES=openai make run`

PrivateGPT будет использовать уже существующий файл настроек `settings-openai.yaml`, который настроен для использования конечных точек LLM и Embeddings от OpenAI, а также Qdrant.

UI будет доступен по адресу [http://localhost:8001](http://localhost:8001).

### Неприватная настройка с использованием Azure OpenAI для тестирования

Если вы хотите протестировать PrivateGPT с LLM и Embeddings от Azure OpenAI (имейте в виду, что ваши данные будут отправляться в Azure OpenAI!), выполните следующую команду:

1.  Вам необходимо иметь доступ к конечным точкам вывода Azure OpenAI для LLM и/или Embeddings, а также правильно настроенные учетные данные Azure OpenAI.
2.  Отредактируйте файл `settings-azopenai.yaml`, чтобы включить правильные конечные точки Azure OpenAI.
3.  Установите PrivateGPT с помощью следующей команды:

    bash

    `poetry install --extras "ui llms-azopenai embeddings-azopenai vector-st`

Для запуска проекта необходимо:

1. Скопировать env-файл ```.env.dev .env```, и осуществить настройку, если необходимо.
2. Выполнить команду для сборки образа и запуска контейнеров:

```js
docker-compose up -d --build
```
В случае ошибки установки образа попробовать:
```js
DOCKER_BUILDKIT=0 docker-compose up -d --build
```

Приложение будет доступно через localhost(127.0.0.1)
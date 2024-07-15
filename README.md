<br/>
<p align="center">
  <h3 align="center">Приложение gh-pub</h3>
  <p align="center">
    CLI приложение для публикации проекта на GithHub Pages.
    <br/>
    <br/>
  </p>
</p>

[![Check, Build and Publish npm package](https://github.com/SergeyAkkuratov/OTUS_homework_lesson52/actions/workflows/pull_request_check.yml/badge.svg?branch=sakkuratov)](https://github.com/SergeyAkkuratov/OTUS_homework_lesson52/actions/workflows/pull_request_check.yml)
![Contributors](https://img.shields.io/github/contributors/SergeyAkkuratov/OTUS_homework_lesson52?color=dark-green) ![Issues](https://img.shields.io/github/issues/SergeyAkkuratov/OTUS_homework_lesson52)

## Содержание

- [О проекте](#о-проекте)
- [Тербования](#требования)
- [Использование](#использование)
- [Ошибки](#Ошибки)
- [Структура проекта](#структура-проекта)

## О проекте

Приложение gh-pub предназанчено для публикации ваших статических файлов (frontend-приложений) на GitHub Pages. Оно использует базовые команды Git для коммита и отправки файлов на определённую ветку удаленного репозитория.

## Требования

Для корректной работы прриложения вам потребуется:
1. Настроенный репозиторий GitHub:
    В репозитории должны быть настроены Pages на определённую ветку репощитория.

    ![github](https://github.com/SergeyAkkuratov/OTUS_homework_lesson52/blob/sakkuratov/images/github.jpg)

    Подробности можно узнать [здесь](https://docs.github.com/ru/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
1. Установленый и настроенный Git для выполнения операций.

    В вашем окружении должна быть доступна команда *git* и при выполнении операций с репозиторием Git не должен запрашивать дополнительных данных (например, логин или пароль).

## Использование

Приложение gh-pub может работать в двух режимах: Wizard и используя аргументы командой строки.

1. Запуск в режиме Wizard:

    В данном режме gh-pub будет задавать пользователю ворпросы для настройки запуска.
    После получения всех необходимых настроеу будет запущен деплой данных на gitHub Pages.

    ### Запуск:

    `npx @sergey.akkuratov/gh-pub`

    ### Демонстрация:

    ![wizard](https://github.com/SergeyAkkuratov/OTUS_homework_lesson52/blob/sakkuratov/images/Wizard_default.gif)

1. Запуск с использованием аргументов командой строки:

    В данном режиме gh-pub ожидает, что все необхдимы настройки будут переданы в виде аргументов командой строки.
    На данный момет в gh-pub есть только один обязательный аргумет: --repository (-r)

    ### Запуск:

    `npx @sergey.akkuratov/gh-pub -r <url to GitHub repository>`
    
    ### Демонстрация:

    ![options](https://github.com/SergeyAkkuratov/OTUS_homework_lesson52/blob/sakkuratov/images/options.gif)

    ### Справка по аргументам:

    ```
    Usage: gh-pub [options]

    CLI to publish files to GitHub Pages.

    Options:
    -V, --version           output the version number
    -r, --repository <url>  set URL of GitHub Git repository in https://github.com/<your profile>/<your repository>.git
                            format
    -b, --branch <name>     set branch name of repository to deploy (default: "gh-pages")
    -d, --deploy <dir>      set dir with files to deploy (default: "./")
    -e, --exec <command>    exec some comand before deploy
    -s, --silence           switch off info messages (default: false)
    -h, --help              display help for command
    ```

## Ошибки
При возникновении каких-либо ошибок gh-pub сообщит об этом фразой:

`Something went wrong, deploy haven't done:`

После неё выведется текст ошибки:

![error](https://github.com/SergeyAkkuratov/OTUS_homework_lesson52/blob/sakkuratov/images/error.jpg)

В данном случае мы попытались опудликовать файлы, которые уже и так содержатся в GitHub Pages без каких-либо изменений.

## Структура проекта

- github
  - workflows - настройки для GitHub Actions
- .husky - настройки для подготовки файлов согласно правилам линта перед коммитом
- images - скриншоты и .gif файлы для файла README.md
- src - исходный код проекта
  - gh-pub.ts - точка входа в приложения, выбор режима запуска
  - gitApi.ts - запуск git команд для публикации файлов
  - wizard.ts - реализации системы вопрос-ответ для настройки запуска
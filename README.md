# Тестовое на вакансию Frontend (React / Vue.js) Developer

[Тестовое задание](https://www.notion.so/fundraiseup/4c2121dc756f41d9abbe569d9d36d1f8). Прочитайте его до конца перед началом выполнения. Если возникли вопросы, вы можете их задать рекрутеру, он передаст их разработчикам.


# Установка

Для установки приложения, выполните следующие шаги:

1. Клонируйте репозиторий:

   ```shell
   git clone https://github.com/fundraiseup-test/40980349-Krushenitskii-Vladislav.git

2. Перейдите в каталог проекта:
   
    cd 40980349-Krushenitskii-Vladislav

3. Установите необходимые зависимости:
    
    npm install

# Запуск

Чтобы запустить приложение, выполните следующую команду:

npm start


# Пояснение решения

## CreateProxy()

Для разработки этого решения был выбран подход, основанный на использовании new Proxy. Этот выбор обеспечивает мне уникальные возможности взаимодействия с приложением при каждом нажатии клавиши на клавиатуре или взаимодействии с элементами на странице. С помощью механизма Proxy, я могу легко выполнять различные проверки, изменять состояния приложения и перерисовывать интерфейс в соответствии с этими изменениями. Это позволяет мне создавать динамичные и отзывчивые приложения, способные адаптироваться к действиям пользователя в реальном времени. ( ##### Это своего рода аналог стора)

## Render()
Кроме того, была разработана функция render, которая отвечает за отображение и заполнение элементов интерфейса на каждом этапе работы приложения. Манипулируя этой функцией, мы имеем возможность влиять на состояние нашего приложения в зависимости от того, как изменяется внутренний state. Это дает нам контроль над тем, какие данные и элементы интерфейса отображаются на экране, и как пользователь взаимодействует с нашим приложением. Этот механизм динамического рендера делает наше приложение гибким и адаптивным к различным ситуациям и действиям пользователя.

## initInterfaceManager()

Эта функция предназначена для управления элементами интерфейса, а также обработки всех событий, которые могут быть инициированы пользователем. Все обработчики событий, клики, и другие события, которые могут возникнуть во время взаимодействия пользователя с приложением, управляются здесь. Это упрощает логику приложения и делает ее более легкой для понимания. Хотя существуют и другие способы организации архитектуры, данный подход является наглядным и легко читаемым, поэтому было решено использовать именно его.


## app.helpers.ts

Тут все просто и понятно, вынес все функции которые используются для вспомогательный моментов.

## app.start.ts

Было принято решение создать данную функцию чтобы обернуть все решение в проверку на то, что мы взяли и получили все элементы с которыми будем работать и это точно.

## Promise.all для imports

```
const [
{ WORDS_LIST, TRASH_ERROR_NOTIFICATION },
{ shuffleArray, shuffleWord, drawEndTable },
{ createProxy },
] = await Promise.all([
import("./data/app.constants"),
import("./app.helpers"),
import("./store/app.store"),
]);
```
данное решение было сделанно, чтобы получать все необходимое до старта приложения и формирования нашего стейта, иначе могут быть ошибки. В Одном файле все четко, мы можем котролировать местоположение,  что и когда вызывать.


## localCash

```
export const localCash = {
  getDataFromStore: function (): IAppState | null {
    const savedStateJSON = localStorage.getItem("appState");

    return savedStateJSON && JSON.parse(savedStateJSON);
  },
  removeDataFromStorage: function (): void {
    localStorage.removeItem("appState");
  },
  saveDataInStorage: function (state: IAppState): void {
    const stateJSON = JSON.stringify(state);
    localStorage.setItem("appState", stateJSON);
  },
};

```

Для бонусного пункта я решил сохранять все в localStorage - так как в целом, данный фунционал пока действует в рамках нашего задания, это можно расширить в дальнейшем, используя webworkers по крайней мере, чтобы релизовать пункт с другими вкладками если я правильно понял условие. 

# Online Store - Design Patterns Demo

Прототип интернет-магазина, демонстрирующий применение паттернов проектирования.

## 🎯 Реализованные паттерны

### 1. Abstract Factory (Абстрактная фабрика)
**Файл:** `js/patterns/abstractFactory.js`

Паттерн используется для создания семейств связанных продуктов без указания конкретных классов.

**Структура:**
- `ProductFactory` - абстрактная фабрика
- `ElectronicsFactory` - фабрика электроники
- `ClothingFactory` - фабрика одежды  
- `FoodFactory` - фабрика продуктов питания
- `FactoryRegistry` - реестр фабрик

**Использование в UI:** Кнопки "Электроника", "Одежда", "Продукты питания"

```javascript
const factory = factoryRegistry.getFactory('electronics');
const product = factory.createRandomProduct();
```

---

### 2. Builder (Строитель)
**Файл:** `js/patterns/builder.js`

Паттерн позволяет создавать сложные объекты пошагово с различными конфигурациями.

**Структура:**
- `ProductBuilder` - интерфейс строителя
- `ElectronicsBuilder` - строитель электроники
- `ClothingBuilder` - строитель одежды
- `FoodBuilder` - строитель продуктов питания
- `ProductDirector` - директор, управляющий процессом сборки

**Использование в UI:** Форма "Конструктор продукта"

```javascript
const director = new ProductDirector();
const product = director.buildCustomProduct({
    name: 'iPhone',
    price: 99990,
    category: 'electronics',
    isPremium: true
});
```

---

### 3. Strategy (Стратегия)
**Файл:** `js/patterns/strategy.js`

Паттерн определяет семейство алгоритмов сортировки и делает их взаимозаменяемыми.

**Структура:**
- `SortStrategy` - интерфейс стратегии
- `PriceAscendingStrategy` - сортировка по цене ↑
- `PriceDescendingStrategy` - сортировка по цене ↓
- `NameStrategy` - сортировка по названию
- `RatingStrategy` - сортировка по рейтингу
- `CategoryStrategy` - сортировка по категории
- `SortContext` - контекст, хранящий текущую стратегию

**Использование в UI:** Кнопки сортировки

```javascript
const context = new SortContext();
context.setStrategy('rating');
const sorted = context.executeSort(products);
```

---

## 📁 Структура проекта

```
Lab4/
├── index.html              # Главная страница
├── styles.css              # Стили
├── README.md               # Документация
└── js/
    ├── app.js              # Главный модуль приложения
    ├── api/
    │   └── fakeApi.js      # Имитация REST API
    └── patterns/
        ├── abstractFactory.js  # Abstract Factory Pattern
        ├── builder.js          # Builder Pattern
        └── strategy.js         # Strategy Pattern
```

## 🚀 Запуск

1. Откройте проект в VS Code
2. Установите расширение "Live Server"
3. Кликните правой кнопкой на `index.html` → "Open with Live Server"

Или используйте любой локальный сервер:
```bash
# Python
python -m http.server 8080

# Node.js (npx)
npx serve
```

## 🔧 Fake API

**Файл:** `js/api/fakeApi.js`

Имитация REST API с задержкой 500мс:

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/api/products` | Все продукты |
| GET | `/api/products/:id` | Продукт по ID |
| GET | `/api/products/category/:cat` | По категории |
| GET | `/api/products/search?q=` | Поиск |
| GET | `/api/products/featured` | Рекомендуемые |
| POST | `/api/products` | Создание |
| GET | `/api/stats` | Статистика |

## 📋 Лог паттернов

В нижней части экрана отображается лог всех операций с указанием:
- Использованного паттерна
- Выполненного действия
- Деталей операции

## 🎨 Возможности

- ✅ Создание продуктов через Abstract Factory
- ✅ Кастомное создание через Builder
- ✅ 5 стратегий сортировки
- ✅ Загрузка данных из Fake API
- ✅ Визуализация товаров с иконками
- ✅ Метки "Скидка" и "Premium"
- ✅ Лог операций паттернов

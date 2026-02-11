export class Product {
    constructor(name, price, category) {
        this.rating = 0;
        this.brand = '';
        this.hasDiscount = false;
        this.isPremium = false;
        this.id = Date.now() + Math.random().toString(36).substr(2, 9);
        this.name = name;
        this.price = price;
        this.category = category;
    }
}
export class ElectronicsProduct extends Product {
    constructor(name, price) {
        super(name, price, 'electronics');
        this.warranty = 12;
        this.voltage = 220;
    }
    getInfo() {
        return `${this.name} (Гарантия: ${this.warranty} мес.)`;
    }
    getIcon() {
        const icons = ['💻', '📱', '🎧', '📺', '🎮', '⌚', '📷'];
        return icons[Math.floor(Math.random() * icons.length)];
    }
}
export class ClothingProduct extends Product {
    constructor(name, price) {
        super(name, price, 'clothing');
        this.size = 'M';
        this.material = 'Cotton';
    }
    getInfo() {
        return `${this.name} (Размер: ${this.size}, Материал: ${this.material})`;
    }
    getIcon() {
        const icons = ['👕', '👖', '👗', '👟', '🧥', '👒', '🧣'];
        return icons[Math.floor(Math.random() * icons.length)];
    }
}
export class FoodProduct extends Product {
    constructor(name, price) {
        super(name, price, 'food');
        this.expirationDays = 7;
        this.calories = 0;
    }
    getInfo() {
        return `${this.name} (Срок годности: ${this.expirationDays} дней)`;
    }
    getIcon() {
        const icons = ['🍎', '🍞', '🧀', '🥩', '🥛', '🍕', '🍰'];
        return icons[Math.floor(Math.random() * icons.length)];
    }
}
export class ProductFactory {
}
export class ElectronicsFactory extends ProductFactory {
    constructor() {
        super(...arguments);
        this.defaultProducts = [
            { name: 'Смартфон Galaxy Pro', price: 45990, brand: 'Samsung' },
            { name: 'Ноутбук ThinkPad', price: 89990, brand: 'Lenovo' },
            { name: 'Наушники AirPods', price: 15990, brand: 'Apple' },
            { name: 'Умные часы Watch 5', price: 24990, brand: 'Samsung' },
            { name: 'Игровая консоль PS5', price: 54990, brand: 'Sony' },
        ];
    }
    createProduct(name, price) {
        const product = new ElectronicsProduct(name, price);
        product.warranty = Math.floor(Math.random() * 24) + 12;
        return product;
    }
    createRandomProduct() {
        const template = this.defaultProducts[Math.floor(Math.random() * this.defaultProducts.length)];
        const product = this.createProduct(template.name, template.price);
        product.brand = template.brand;
        product.rating = parseFloat((Math.random() * 2 + 3).toFixed(1));
        product.isPremium = Math.random() > 0.7;
        product.hasDiscount = Math.random() > 0.6;
        return product;
    }
    getCategoryName() {
        return 'Электроника';
    }
}
export class ClothingFactory extends ProductFactory {
    constructor() {
        super(...arguments);
        this.defaultProducts = [
            { name: 'Футболка Classic', price: 1990, brand: 'Nike' },
            { name: 'Джинсы Slim Fit', price: 4990, brand: 'Levis' },
            { name: 'Кроссовки Air Max', price: 8990, brand: 'Nike' },
            { name: 'Куртка Puffer', price: 12990, brand: 'Adidas' },
            { name: 'Платье Summer', price: 3990, brand: 'Zara' },
        ];
        this.sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
        this.materials = ['Cotton', 'Polyester', 'Wool', 'Silk', 'Denim'];
    }
    createProduct(name, price) {
        const product = new ClothingProduct(name, price);
        product.size = this.sizes[Math.floor(Math.random() * this.sizes.length)];
        product.material = this.materials[Math.floor(Math.random() * this.materials.length)];
        return product;
    }
    createRandomProduct() {
        const template = this.defaultProducts[Math.floor(Math.random() * this.defaultProducts.length)];
        const product = this.createProduct(template.name, template.price);
        product.brand = template.brand;
        product.rating = parseFloat((Math.random() * 2 + 3).toFixed(1));
        product.isPremium = Math.random() > 0.8;
        product.hasDiscount = Math.random() > 0.5;
        return product;
    }
    getCategoryName() {
        return 'Одежда';
    }
}
export class FoodFactory extends ProductFactory {
    constructor() {
        super(...arguments);
        this.defaultProducts = [
            { name: 'Яблоки Голден', price: 199, brand: 'Farm Fresh' },
            { name: 'Хлеб Бородинский', price: 89, brand: 'Пекарня' },
            { name: 'Сыр Пармезан', price: 890, brand: 'Parmalat' },
            { name: 'Молоко 3.2%', price: 79, brand: 'Простоквашино' },
            { name: 'Шоколад Swiss', price: 249, brand: 'Lindt' },
        ];
    }
    createProduct(name, price) {
        const product = new FoodProduct(name, price);
        product.expirationDays = Math.floor(Math.random() * 30) + 3;
        product.calories = Math.floor(Math.random() * 500) + 50;
        return product;
    }
    createRandomProduct() {
        const template = this.defaultProducts[Math.floor(Math.random() * this.defaultProducts.length)];
        const product = this.createProduct(template.name, template.price);
        product.brand = template.brand;
        product.rating = parseFloat((Math.random() * 2 + 3).toFixed(1));
        product.isPremium = Math.random() > 0.85;
        product.hasDiscount = Math.random() > 0.4;
        return product;
    }
    getCategoryName() {
        return 'Продукты питания';
    }
}
export class FactoryRegistry {
    constructor() {
        this.factories = {
            electronics: new ElectronicsFactory(),
            clothing: new ClothingFactory(),
            food: new FoodFactory()
        };
    }
    getFactory(type) {
        const factory = this.factories[type];
        if (!factory) {
            throw new Error(`Unknown factory type: ${type}`);
        }
        return factory;
    }
    getAllFactoryTypes() {
        return Object.keys(this.factories);
    }
}
//# sourceMappingURL=abstractFactory.js.map
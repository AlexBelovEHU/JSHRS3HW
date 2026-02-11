

import { 
    IProduct, 
    IElectronicsProduct, 
    IClothingProduct, 
    IFoodProduct,
    IProductFactory,
    IFactoryRegistry,
    ProductCategory,
    ProductTemplate
} from '../types/index.js';

export abstract class Product implements IProduct {
    id: string;
    name: string;
    price: number;
    category: ProductCategory;
    rating: number = 0;
    brand: string = '';
    hasDiscount: boolean = false;
    isPremium: boolean = false;

    constructor(name: string, price: number, category: ProductCategory) {
        this.id = Date.now() + Math.random().toString(36).substr(2, 9);
        this.name = name;
        this.price = price;
        this.category = category;
    }

    abstract getInfo(): string;
    abstract getIcon(): string;
}


export class ElectronicsProduct extends Product implements IElectronicsProduct {
    warranty: number = 12;
    voltage: number = 220;

    constructor(name: string, price: number) {
        super(name, price, 'electronics');
    }

    getInfo(): string {
        return `${this.name} (Гарантия: ${this.warranty} мес.)`;
    }

    getIcon(): string {
        const icons = ['💻', '📱', '🎧', '📺', '🎮', '⌚', '📷'];
        return icons[Math.floor(Math.random() * icons.length)];
    }
}


export class ClothingProduct extends Product implements IClothingProduct {
    size: string = 'M';
    material: string = 'Cotton';

    constructor(name: string, price: number) {
        super(name, price, 'clothing');
    }

    getInfo(): string {
        return `${this.name} (Размер: ${this.size}, Материал: ${this.material})`;
    }

    getIcon(): string {
        const icons = ['👕', '👖', '👗', '👟', '🧥', '👒', '🧣'];
        return icons[Math.floor(Math.random() * icons.length)];
    }
}


export class FoodProduct extends Product implements IFoodProduct {
    expirationDays: number = 7;
    calories: number = 0;

    constructor(name: string, price: number) {
        super(name, price, 'food');
    }

    getInfo(): string {
        return `${this.name} (Срок годности: ${this.expirationDays} дней)`;
    }

    getIcon(): string {
        const icons = ['🍎', '🍞', '🧀', '🥩', '🥛', '🍕', '🍰'];
        return icons[Math.floor(Math.random() * icons.length)];
    }
}


export abstract class ProductFactory implements IProductFactory {
    abstract createProduct(name: string, price: number): IProduct;
    abstract createRandomProduct(): IProduct;
    abstract getCategoryName(): string;
}


export class ElectronicsFactory extends ProductFactory {
    private defaultProducts: ProductTemplate[] = [
        { name: 'Смартфон Galaxy Pro', price: 45990, brand: 'Samsung' },
        { name: 'Ноутбук ThinkPad', price: 89990, brand: 'Lenovo' },
        { name: 'Наушники AirPods', price: 15990, brand: 'Apple' },
        { name: 'Умные часы Watch 5', price: 24990, brand: 'Samsung' },
        { name: 'Игровая консоль PS5', price: 54990, brand: 'Sony' },
    ];

    createProduct(name: string, price: number): ElectronicsProduct {
        const product = new ElectronicsProduct(name, price);
        product.warranty = Math.floor(Math.random() * 24) + 12;
        return product;
    }

    createRandomProduct(): ElectronicsProduct {
        const template = this.defaultProducts[
            Math.floor(Math.random() * this.defaultProducts.length)
        ];
        const product = this.createProduct(template.name, template.price);
        product.brand = template.brand;
        product.rating = parseFloat((Math.random() * 2 + 3).toFixed(1));
        product.isPremium = Math.random() > 0.7;
        product.hasDiscount = Math.random() > 0.6;
        return product;
    }

    getCategoryName(): string {
        return 'Электроника';
    }
}


export class ClothingFactory extends ProductFactory {
    private defaultProducts: ProductTemplate[] = [
        { name: 'Футболка Classic', price: 1990, brand: 'Nike' },
        { name: 'Джинсы Slim Fit', price: 4990, brand: 'Levis' },
        { name: 'Кроссовки Air Max', price: 8990, brand: 'Nike' },
        { name: 'Куртка Puffer', price: 12990, brand: 'Adidas' },
        { name: 'Платье Summer', price: 3990, brand: 'Zara' },
    ];
    private sizes: string[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    private materials: string[] = ['Cotton', 'Polyester', 'Wool', 'Silk', 'Denim'];

    createProduct(name: string, price: number): ClothingProduct {
        const product = new ClothingProduct(name, price);
        product.size = this.sizes[Math.floor(Math.random() * this.sizes.length)];
        product.material = this.materials[Math.floor(Math.random() * this.materials.length)];
        return product;
    }

    createRandomProduct(): ClothingProduct {
        const template = this.defaultProducts[
            Math.floor(Math.random() * this.defaultProducts.length)
        ];
        const product = this.createProduct(template.name, template.price);
        product.brand = template.brand;
        product.rating = parseFloat((Math.random() * 2 + 3).toFixed(1));
        product.isPremium = Math.random() > 0.8;
        product.hasDiscount = Math.random() > 0.5;
        return product;
    }

    getCategoryName(): string {
        return 'Одежда';
    }
}


export class FoodFactory extends ProductFactory {
    private defaultProducts: ProductTemplate[] = [
        { name: 'Яблоки Голден', price: 199, brand: 'Farm Fresh' },
        { name: 'Хлеб Бородинский', price: 89, brand: 'Пекарня' },
        { name: 'Сыр Пармезан', price: 890, brand: 'Parmalat' },
        { name: 'Молоко 3.2%', price: 79, brand: 'Простоквашино' },
        { name: 'Шоколад Swiss', price: 249, brand: 'Lindt' },
    ];

    createProduct(name: string, price: number): FoodProduct {
        const product = new FoodProduct(name, price);
        product.expirationDays = Math.floor(Math.random() * 30) + 3;
        product.calories = Math.floor(Math.random() * 500) + 50;
        return product;
    }

    createRandomProduct(): FoodProduct {
        const template = this.defaultProducts[
            Math.floor(Math.random() * this.defaultProducts.length)
        ];
        const product = this.createProduct(template.name, template.price);
        product.brand = template.brand;
        product.rating = parseFloat((Math.random() * 2 + 3).toFixed(1));
        product.isPremium = Math.random() > 0.85;
        product.hasDiscount = Math.random() > 0.4;
        return product;
    }

    getCategoryName(): string {
        return 'Продукты питания';
    }
}


export class FactoryRegistry implements IFactoryRegistry {
    private factories: Record<ProductCategory, ProductFactory>;

    constructor() {
        this.factories = {
            electronics: new ElectronicsFactory(),
            clothing: new ClothingFactory(),
            food: new FoodFactory()
        };
    }

    getFactory(type: ProductCategory): ProductFactory {
        const factory = this.factories[type];
        if (!factory) {
            throw new Error(`Unknown factory type: ${type}`);
        }
        return factory;
    }

    getAllFactoryTypes(): ProductCategory[] {
        return Object.keys(this.factories) as ProductCategory[];
    }
}

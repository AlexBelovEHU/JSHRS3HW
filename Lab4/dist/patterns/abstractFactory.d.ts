import { IProduct, IElectronicsProduct, IClothingProduct, IFoodProduct, IProductFactory, IFactoryRegistry, ProductCategory } from '../types/index.js';
export declare abstract class Product implements IProduct {
    id: string;
    name: string;
    price: number;
    category: ProductCategory;
    rating: number;
    brand: string;
    hasDiscount: boolean;
    isPremium: boolean;
    constructor(name: string, price: number, category: ProductCategory);
    abstract getInfo(): string;
    abstract getIcon(): string;
}
export declare class ElectronicsProduct extends Product implements IElectronicsProduct {
    warranty: number;
    voltage: number;
    constructor(name: string, price: number);
    getInfo(): string;
    getIcon(): string;
}
export declare class ClothingProduct extends Product implements IClothingProduct {
    size: string;
    material: string;
    constructor(name: string, price: number);
    getInfo(): string;
    getIcon(): string;
}
export declare class FoodProduct extends Product implements IFoodProduct {
    expirationDays: number;
    calories: number;
    constructor(name: string, price: number);
    getInfo(): string;
    getIcon(): string;
}
export declare abstract class ProductFactory implements IProductFactory {
    abstract createProduct(name: string, price: number): IProduct;
    abstract createRandomProduct(): IProduct;
    abstract getCategoryName(): string;
}
export declare class ElectronicsFactory extends ProductFactory {
    private defaultProducts;
    createProduct(name: string, price: number): ElectronicsProduct;
    createRandomProduct(): ElectronicsProduct;
    getCategoryName(): string;
}
export declare class ClothingFactory extends ProductFactory {
    private defaultProducts;
    private sizes;
    private materials;
    createProduct(name: string, price: number): ClothingProduct;
    createRandomProduct(): ClothingProduct;
    getCategoryName(): string;
}
export declare class FoodFactory extends ProductFactory {
    private defaultProducts;
    createProduct(name: string, price: number): FoodProduct;
    createRandomProduct(): FoodProduct;
    getCategoryName(): string;
}
export declare class FactoryRegistry implements IFactoryRegistry {
    private factories;
    constructor();
    getFactory(type: ProductCategory): ProductFactory;
    getAllFactoryTypes(): ProductCategory[];
}



import { 
    IProduct, 
    IProductBuilder, 
    ProductCategory,
    CustomProductOptions 
} from '../types/index.js';
import { ElectronicsProduct, ClothingProduct, FoodProduct } from './abstractFactory.js';


export abstract class ProductBuilder implements IProductBuilder {
    protected product: IProduct | null = null;
    protected name: string = '';
    protected price: number = 0;
    protected brand: string = '';
    protected rating: number = 0;
    protected hasDiscount: boolean = false;
    protected isPremium: boolean = false;

    constructor() {
        this.reset();
    }

    abstract reset(): this;
    abstract build(): IProduct;

    setName(name: string): this {
        this.name = name;
        return this;
    }

    setPrice(price: number): this {
        this.price = price;
        return this;
    }

    setBrand(brand: string): this {
        this.brand = brand;
        return this;
    }

    setRating(rating: number): this {
        this.rating = Math.min(5, Math.max(0, rating));
        return this;
    }

    setDiscount(hasDiscount: boolean): this {
        this.hasDiscount = hasDiscount;
        return this;
    }

    setPremium(isPremium: boolean): this {
        this.isPremium = isPremium;
        return this;
    }
}


export class ElectronicsBuilder extends ProductBuilder {
    private warranty: number = 12;
    private voltage: number = 220;

    reset(): this {
        this.product = null;
        this.name = 'Электронное устройство';
        this.price = 0;
        this.brand = '';
        this.rating = 0;
        this.hasDiscount = false;
        this.isPremium = false;
        this.warranty = 12;
        this.voltage = 220;
        return this;
    }

    setWarranty(months: number): this {
        this.warranty = months;
        return this;
    }

    setVoltage(voltage: number): this {
        this.voltage = voltage;
        return this;
    }

    build(): ElectronicsProduct {
        const product = new ElectronicsProduct(this.name, this.price);
        product.brand = this.brand;
        product.rating = this.rating;
        product.hasDiscount = this.hasDiscount;
        product.isPremium = this.isPremium;
        product.warranty = this.warranty;
        product.voltage = this.voltage;
        
        this.reset();
        return product;
    }
}


export class ClothingBuilder extends ProductBuilder {
    private size: string = 'M';
    private material: string = 'Cotton';

    reset(): this {
        this.product = null;
        this.name = 'Одежда';
        this.price = 0;
        this.brand = '';
        this.rating = 0;
        this.hasDiscount = false;
        this.isPremium = false;
        this.size = 'M';
        this.material = 'Cotton';
        return this;
    }

    setSize(size: string): this {
        this.size = size;
        return this;
    }

    setMaterial(material: string): this {
        this.material = material;
        return this;
    }

    build(): ClothingProduct {
        const product = new ClothingProduct(this.name, this.price);
        product.brand = this.brand;
        product.rating = this.rating;
        product.hasDiscount = this.hasDiscount;
        product.isPremium = this.isPremium;
        product.size = this.size;
        product.material = this.material;
        
        this.reset();
        return product;
    }
}


export class FoodBuilder extends ProductBuilder {
    private expirationDays: number = 7;
    private calories: number = 0;

    reset(): this {
        this.product = null;
        this.name = 'Продукт';
        this.price = 0;
        this.brand = '';
        this.rating = 0;
        this.hasDiscount = false;
        this.isPremium = false;
        this.expirationDays = 7;
        this.calories = 0;
        return this;
    }

    setExpirationDays(days: number): this {
        this.expirationDays = days;
        return this;
    }

    setCalories(calories: number): this {
        this.calories = calories;
        return this;
    }

    build(): FoodProduct {
        const product = new FoodProduct(this.name, this.price);
        product.brand = this.brand;
        product.rating = this.rating;
        product.hasDiscount = this.hasDiscount;
        product.isPremium = this.isPremium;
        product.expirationDays = this.expirationDays;
        product.calories = this.calories;
        
        this.reset();
        return product;
    }
}


export class ProductDirector {
    private builders: Record<ProductCategory, ProductBuilder>;

    constructor() {
        this.builders = {
            electronics: new ElectronicsBuilder(),
            clothing: new ClothingBuilder(),
            food: new FoodBuilder()
        };
    }

    private getBuilder(category: ProductCategory): ProductBuilder {
        return this.builders[category] || this.builders.electronics;
    }


    buildBudgetProduct(category: ProductCategory, name: string): IProduct {
        const builder = this.getBuilder(category);
        return builder
            .setName(name)
            .setPrice(Math.floor(Math.random() * 1000) + 100)
            .setBrand('Budget Brand')
            .setRating(3.0)
            .setDiscount(true)
            .setPremium(false)
            .build();
    }

    buildPremiumProduct(category: ProductCategory, name: string): IProduct {
        const builder = this.getBuilder(category);
        return builder
            .setName(name + ' Premium Edition')
            .setPrice(Math.floor(Math.random() * 50000) + 10000)
            .setBrand('Luxury Brand')
            .setRating(4.8)
            .setDiscount(false)
            .setPremium(true)
            .build();
    }

    buildDiscountProduct(category: ProductCategory, name: string, originalPrice: number): IProduct {
        const builder = this.getBuilder(category);
        const discountedPrice = Math.floor(originalPrice * 0.7);
        return builder
            .setName(name + ' (Скидка!)')
            .setPrice(discountedPrice)
            .setBrand('Sale Brand')
            .setRating(4.0)
            .setDiscount(true)
            .setPremium(false)
            .build();
    }

    buildCustomProduct(options: CustomProductOptions): IProduct {
        const category = options.category || 'electronics';
        const builder = this.getBuilder(category);
        
        builder
            .setName(options.name || 'Продукт')
            .setPrice(options.price || 0)
            .setBrand(options.brand || '')
            .setRating(options.rating || 0)
            .setDiscount(options.hasDiscount || false)
            .setPremium(options.isPremium || false);

        return builder.build();
    }
}

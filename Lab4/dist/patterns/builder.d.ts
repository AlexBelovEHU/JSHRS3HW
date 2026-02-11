import { IProduct, IProductBuilder, ProductCategory, CustomProductOptions } from '../types/index.js';
import { ElectronicsProduct, ClothingProduct, FoodProduct } from './abstractFactory.js';
export declare abstract class ProductBuilder implements IProductBuilder {
    protected product: IProduct | null;
    protected name: string;
    protected price: number;
    protected brand: string;
    protected rating: number;
    protected hasDiscount: boolean;
    protected isPremium: boolean;
    constructor();
    abstract reset(): this;
    abstract build(): IProduct;
    setName(name: string): this;
    setPrice(price: number): this;
    setBrand(brand: string): this;
    setRating(rating: number): this;
    setDiscount(hasDiscount: boolean): this;
    setPremium(isPremium: boolean): this;
}
export declare class ElectronicsBuilder extends ProductBuilder {
    private warranty;
    private voltage;
    reset(): this;
    setWarranty(months: number): this;
    setVoltage(voltage: number): this;
    build(): ElectronicsProduct;
}
export declare class ClothingBuilder extends ProductBuilder {
    private size;
    private material;
    reset(): this;
    setSize(size: string): this;
    setMaterial(material: string): this;
    build(): ClothingProduct;
}
export declare class FoodBuilder extends ProductBuilder {
    private expirationDays;
    private calories;
    reset(): this;
    setExpirationDays(days: number): this;
    setCalories(calories: number): this;
    build(): FoodProduct;
}
export declare class ProductDirector {
    private builders;
    constructor();
    private getBuilder;
    buildBudgetProduct(category: ProductCategory, name: string): IProduct;
    buildPremiumProduct(category: ProductCategory, name: string): IProduct;
    buildDiscountProduct(category: ProductCategory, name: string, originalPrice: number): IProduct;
    buildCustomProduct(options: CustomProductOptions): IProduct;
}

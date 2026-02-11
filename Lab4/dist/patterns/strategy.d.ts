import { IProduct, ISortStrategy, ISortContext, SortStrategyName } from '../types/index.js';
export declare abstract class SortStrategy implements ISortStrategy {
    abstract sort(products: IProduct[]): IProduct[];
    abstract getName(): string;
    abstract getDescription(): string;
}
export declare class PriceAscendingStrategy extends SortStrategy {
    sort(products: IProduct[]): IProduct[];
    getName(): string;
    getDescription(): string;
}
export declare class PriceDescendingStrategy extends SortStrategy {
    sort(products: IProduct[]): IProduct[];
    getName(): string;
    getDescription(): string;
}
export declare class NameStrategy extends SortStrategy {
    sort(products: IProduct[]): IProduct[];
    getName(): string;
    getDescription(): string;
}
export declare class RatingStrategy extends SortStrategy {
    sort(products: IProduct[]): IProduct[];
    getName(): string;
    getDescription(): string;
}
export declare class CategoryStrategy extends SortStrategy {
    private categoryOrder;
    sort(products: IProduct[]): IProduct[];
    getName(): string;
    getDescription(): string;
}
export declare class DiscountFirstStrategy extends SortStrategy {
    sort(products: IProduct[]): IProduct[];
    getName(): string;
    getDescription(): string;
}
export declare class PremiumFirstStrategy extends SortStrategy {
    sort(products: IProduct[]): IProduct[];
    getName(): string;
    getDescription(): string;
}
export declare class SortContext implements ISortContext {
    private strategies;
    private currentStrategy;
    constructor();
    setStrategy(strategyName: SortStrategyName): this;
    executeSort(products: IProduct[]): IProduct[];
    getCurrentStrategyName(): string;
    getCurrentStrategyDescription(): string;
    getAvailableStrategies(): {
        name: string;
        description: string;
    }[];
}

import { ProductCategory, SortStrategyName } from './types/index.js';
declare global {
    interface Window {
        store: OnlineStore;
    }
}
declare class OnlineStore {
    private factoryRegistry;
    private productDirector;
    private sortContext;
    private api;
    private products;
    private productsGrid;
    private productCount;
    constructor();
    createFromFactory(factoryType: ProductCategory): void;
    createFromBuilder(): void;
    sortProducts(strategyName: SortStrategyName): void;
    loadFromApi(): Promise<void>;
    clearProducts(): void;
    private renderProducts;
    private renderProductCard;
    private getCategoryDisplayName;
}
export {};

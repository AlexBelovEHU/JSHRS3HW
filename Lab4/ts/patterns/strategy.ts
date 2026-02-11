import { IProduct, ISortStrategy, ISortContext, SortStrategyName, ProductCategory } from '../types/index.js';
export abstract class SortStrategy implements ISortStrategy {
    abstract sort(products: IProduct[]): IProduct[];
    abstract getName(): string;
}
export class PriceAscendingStrategy extends SortStrategy {
    sort(products: IProduct[]): IProduct[] {
        return [...products].sort((a, b) => a.price - b.price);
    }

    getName(): string {
        return 'price-asc';
    }
}
export class PriceDescendingStrategy extends SortStrategy {
    sort(products: IProduct[]): IProduct[] {
        return [...products].sort((a, b) => b.price - a.price);
    }

    getName(): string {
        return 'price-desc';
    }
}
export class NameStrategy extends SortStrategy {
    sort(products: IProduct[]): IProduct[] {
        return [...products].sort((a, b) => a.name.localeCompare(b.name, 'ru'));
    }

    getName(): string {
        return 'name';
    }
}
export class RatingStrategy extends SortStrategy {
    sort(products: IProduct[]): IProduct[] {
        return [...products].sort((a, b) => b.rating - a.rating);
    }

    getName(): string {
        return 'rating';
    }
}
export class CategoryStrategy extends SortStrategy {
    private categoryOrder: Record<ProductCategory, number> = {
        'electronics': 1,
        'clothing': 2,
        'food': 3
    };

    sort(products: IProduct[]): IProduct[] {
        return [...products].sort((a, b) => {
            const orderA = this.categoryOrder[a.category] || 99;
            const orderB = this.categoryOrder[b.category] || 99;
            if (orderA !== orderB) {
                return orderA - orderB;
            }
            return a.name.localeCompare(b.name, 'ru');
        });
    }

    getName(): string {
        return 'category';
    }
}
export class DiscountFirstStrategy extends SortStrategy {
    sort(products: IProduct[]): IProduct[] {
        return [...products].sort((a, b) => {
            if (a.hasDiscount && !b.hasDiscount) return -1;
            if (!a.hasDiscount && b.hasDiscount) return 1;
            return a.price - b.price;
        });
    }

    getName(): string {
        return 'discount';
    }
}
export class PremiumFirstStrategy extends SortStrategy {
    sort(products: IProduct[]): IProduct[] {
        return [...products].sort((a, b) => {
            if (a.isPremium && !b.isPremium) return -1;
            if (!a.isPremium && b.isPremium) return 1;
            return b.rating - a.rating;
        });
    }

    getName(): string {
        return 'premium';
    }
}
export class SortContext implements ISortContext {
    private strategies: Record<SortStrategyName, SortStrategy>;
    private currentStrategy: SortStrategy;

    constructor() {
        this.strategies = {
            'price-asc': new PriceAscendingStrategy(),
            'price-desc': new PriceDescendingStrategy(),
            'name': new NameStrategy(),
            'rating': new RatingStrategy(),
            'category': new CategoryStrategy(),
            'discount': new DiscountFirstStrategy(),
            'premium': new PremiumFirstStrategy()
        };
        this.currentStrategy = this.strategies['price-asc'];
    }

    setStrategy(strategyName: SortStrategyName): this {
        const strategy = this.strategies[strategyName];
        if (!strategy) {
            throw new Error(`Unknown strategy: ${strategyName}`);
        }
        this.currentStrategy = strategy;
        return this;
    }

    executeSort(products: IProduct[]): IProduct[] {
        return this.currentStrategy.sort(products);
    }

    getCurrentStrategyName(): string {
        return this.currentStrategy.getName();
    }

    getAvailableStrategies(): { name: string }[] {
        return (Object.keys(this.strategies) as SortStrategyName[]).map(key => ({
            name: key
        }));
    }
}

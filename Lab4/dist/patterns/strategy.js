export class SortStrategy {
}
export class PriceAscendingStrategy extends SortStrategy {
    sort(products) {
        return [...products].sort((a, b) => a.price - b.price);
    }
    getName() {
        return 'price-asc';
    }
    getDescription() {
        return 'Сортировка по цене (от дешёвых к дорогим)';
    }
}
export class PriceDescendingStrategy extends SortStrategy {
    sort(products) {
        return [...products].sort((a, b) => b.price - a.price);
    }
    getName() {
        return 'price-desc';
    }
    getDescription() {
        return 'Сортировка по цене (от дорогих к дешёвым)';
    }
}
export class NameStrategy extends SortStrategy {
    sort(products) {
        return [...products].sort((a, b) => a.name.localeCompare(b.name, 'ru'));
    }
    getName() {
        return 'name';
    }
    getDescription() {
        return 'Сортировка по названию (А-Я)';
    }
}
export class RatingStrategy extends SortStrategy {
    sort(products) {
        return [...products].sort((a, b) => b.rating - a.rating);
    }
    getName() {
        return 'rating';
    }
    getDescription() {
        return 'Сортировка по рейтингу (лучшие сначала)';
    }
}
export class CategoryStrategy extends SortStrategy {
    constructor() {
        super(...arguments);
        this.categoryOrder = {
            'electronics': 1,
            'clothing': 2,
            'food': 3
        };
    }
    sort(products) {
        return [...products].sort((a, b) => {
            const orderA = this.categoryOrder[a.category] || 99;
            const orderB = this.categoryOrder[b.category] || 99;
            if (orderA !== orderB) {
                return orderA - orderB;
            }
            return a.name.localeCompare(b.name, 'ru');
        });
    }
    getName() {
        return 'category';
    }
    getDescription() {
        return 'Сортировка по категории';
    }
}
export class DiscountFirstStrategy extends SortStrategy {
    sort(products) {
        return [...products].sort((a, b) => {
            if (a.hasDiscount && !b.hasDiscount)
                return -1;
            if (!a.hasDiscount && b.hasDiscount)
                return 1;
            return a.price - b.price;
        });
    }
    getName() {
        return 'discount';
    }
    getDescription() {
        return 'Сначала товары со скидкой';
    }
}
export class PremiumFirstStrategy extends SortStrategy {
    sort(products) {
        return [...products].sort((a, b) => {
            if (a.isPremium && !b.isPremium)
                return -1;
            if (!a.isPremium && b.isPremium)
                return 1;
            return b.rating - a.rating;
        });
    }
    getName() {
        return 'premium';
    }
    getDescription() {
        return 'Сначала премиум товары';
    }
}
export class SortContext {
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
    setStrategy(strategyName) {
        const strategy = this.strategies[strategyName];
        if (!strategy) {
            throw new Error(`Unknown strategy: ${strategyName}`);
        }
        this.currentStrategy = strategy;
        return this;
    }
    executeSort(products) {
        return this.currentStrategy.sort(products);
    }
    getCurrentStrategyName() {
        return this.currentStrategy.getName();
    }
    getCurrentStrategyDescription() {
        return this.currentStrategy.getDescription();
    }
    getAvailableStrategies() {
        return Object.keys(this.strategies).map(key => ({
            name: key,
            description: this.strategies[key].getDescription()
        }));
    }
}
//# sourceMappingURL=strategy.js.map
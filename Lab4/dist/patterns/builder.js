import { ElectronicsProduct, ClothingProduct, FoodProduct } from './abstractFactory.js';
export class ProductBuilder {
    constructor() {
        this.product = null;
        this.name = '';
        this.price = 0;
        this.brand = '';
        this.rating = 0;
        this.hasDiscount = false;
        this.isPremium = false;
        this.reset();
    }
    setName(name) {
        this.name = name;
        return this;
    }
    setPrice(price) {
        this.price = price;
        return this;
    }
    setBrand(brand) {
        this.brand = brand;
        return this;
    }
    setRating(rating) {
        this.rating = Math.min(5, Math.max(0, rating));
        return this;
    }
    setDiscount(hasDiscount) {
        this.hasDiscount = hasDiscount;
        return this;
    }
    setPremium(isPremium) {
        this.isPremium = isPremium;
        return this;
    }
}
export class ElectronicsBuilder extends ProductBuilder {
    constructor() {
        super(...arguments);
        this.warranty = 12;
        this.voltage = 220;
    }
    reset() {
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
    setWarranty(months) {
        this.warranty = months;
        return this;
    }
    setVoltage(voltage) {
        this.voltage = voltage;
        return this;
    }
    build() {
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
    constructor() {
        super(...arguments);
        this.size = 'M';
        this.material = 'Cotton';
    }
    reset() {
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
    setSize(size) {
        this.size = size;
        return this;
    }
    setMaterial(material) {
        this.material = material;
        return this;
    }
    build() {
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
    constructor() {
        super(...arguments);
        this.expirationDays = 7;
        this.calories = 0;
    }
    reset() {
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
    setExpirationDays(days) {
        this.expirationDays = days;
        return this;
    }
    setCalories(calories) {
        this.calories = calories;
        return this;
    }
    build() {
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
    constructor() {
        this.builders = {
            electronics: new ElectronicsBuilder(),
            clothing: new ClothingBuilder(),
            food: new FoodBuilder()
        };
    }
    getBuilder(category) {
        return this.builders[category] || this.builders.electronics;
    }
    buildBudgetProduct(category, name) {
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
    buildPremiumProduct(category, name) {
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
    buildDiscountProduct(category, name, originalPrice) {
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
    buildCustomProduct(options) {
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
//# sourceMappingURL=builder.js.map
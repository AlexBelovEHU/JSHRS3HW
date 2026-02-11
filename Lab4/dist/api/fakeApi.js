export class FakeApi {
    constructor() {
        this.delay = 500;
        this.mockProducts = [
            {
                id: 'e1',
                name: 'iPhone 15 Pro',
                price: 129990,
                category: 'electronics',
                brand: 'Apple',
                rating: 4.9,
                hasDiscount: false,
                isPremium: true,
                warranty: 24,
                voltage: 220
            },
            {
                id: 'e2',
                name: 'MacBook Air M2',
                price: 119990,
                category: 'electronics',
                brand: 'Apple',
                rating: 4.8,
                hasDiscount: true,
                isPremium: true,
                warranty: 12,
                voltage: 220
            },
            {
                id: 'e3',
                name: 'Sony WH-1000XM5',
                price: 34990,
                category: 'electronics',
                brand: 'Sony',
                rating: 4.7,
                hasDiscount: false,
                isPremium: true,
                warranty: 24,
                voltage: 5
            },
            {
                id: 'e4',
                name: 'Samsung Galaxy S24',
                price: 89990,
                category: 'electronics',
                brand: 'Samsung',
                rating: 4.6,
                hasDiscount: true,
                isPremium: false,
                warranty: 12,
                voltage: 220
            },
            {
                id: 'c1',
                name: 'Nike Air Force 1',
                price: 12990,
                category: 'clothing',
                brand: 'Nike',
                rating: 4.8,
                hasDiscount: false,
                isPremium: false,
                size: '42',
                material: 'Leather'
            },
            {
                id: 'c2',
                name: 'Adidas Ultraboost',
                price: 15990,
                category: 'clothing',
                brand: 'Adidas',
                rating: 4.7,
                hasDiscount: true,
                isPremium: false,
                size: '43',
                material: 'Primeknit'
            },
            {
                id: 'c3',
                name: 'Levi\'s 501 Original',
                price: 8990,
                category: 'clothing',
                brand: 'Levis',
                rating: 4.5,
                hasDiscount: false,
                isPremium: false,
                size: 'M',
                material: 'Denim'
            },
            {
                id: 'c4',
                name: 'Canada Goose Parka',
                price: 89990,
                category: 'clothing',
                brand: 'Canada Goose',
                rating: 4.9,
                hasDiscount: false,
                isPremium: true,
                size: 'L',
                material: 'Down'
            },
            {
                id: 'f1',
                name: 'Органические яблоки',
                price: 299,
                category: 'food',
                brand: 'Eco Farm',
                rating: 4.6,
                hasDiscount: false,
                isPremium: true,
                expirationDays: 14,
                calories: 52
            },
            {
                id: 'f2',
                name: 'Швейцарский шоколад',
                price: 599,
                category: 'food',
                brand: 'Lindt',
                rating: 4.9,
                hasDiscount: true,
                isPremium: true,
                expirationDays: 365,
                calories: 545
            },
            {
                id: 'f3',
                name: 'Итальянская паста',
                price: 189,
                category: 'food',
                brand: 'Barilla',
                rating: 4.4,
                hasDiscount: false,
                isPremium: false,
                expirationDays: 730,
                calories: 350
            },
            {
                id: 'f4',
                name: 'Фермерский сыр',
                price: 890,
                category: 'food',
                brand: 'Local Farm',
                rating: 4.7,
                hasDiscount: true,
                isPremium: true,
                expirationDays: 30,
                calories: 400
            }
        ];
    }
    async simulateDelay() {
        return new Promise(resolve => setTimeout(resolve, this.delay));
    }
    async getProducts() {
        await this.simulateDelay();
        return {
            success: true,
            data: this.mockProducts,
            total: this.mockProducts.length,
            timestamp: new Date().toISOString()
        };
    }
    async getProductById(id) {
        await this.simulateDelay();
        const product = this.mockProducts.find(p => p.id === id);
        if (!product) {
            return {
                success: false,
                error: 'Product not found',
                timestamp: new Date().toISOString()
            };
        }
        return {
            success: true,
            data: product,
            timestamp: new Date().toISOString()
        };
    }
    async getProductsByCategory(category) {
        await this.simulateDelay();
        const products = this.mockProducts.filter(p => p.category === category);
        return {
            success: true,
            data: products,
            total: products.length,
            category: category,
            timestamp: new Date().toISOString()
        };
    }
    async searchProducts(query) {
        await this.simulateDelay();
        const lowerQuery = query.toLowerCase();
        const products = this.mockProducts.filter(p => p.name.toLowerCase().includes(lowerQuery) ||
            p.brand.toLowerCase().includes(lowerQuery));
        return {
            success: true,
            data: products,
            total: products.length,
            query: query,
            timestamp: new Date().toISOString()
        };
    }
    async getFeaturedProducts() {
        await this.simulateDelay();
        const featured = this.mockProducts.filter(p => p.isPremium || p.hasDiscount);
        return {
            success: true,
            data: featured,
            total: featured.length,
            timestamp: new Date().toISOString()
        };
    }
    async createProduct(productData) {
        await this.simulateDelay();
        const newProduct = {
            id: 'new_' + Date.now(),
            name: productData.name || 'New Product',
            price: productData.price || 0,
            category: productData.category || 'electronics',
            brand: productData.brand || '',
            rating: productData.rating || 0,
            hasDiscount: productData.hasDiscount || false,
            isPremium: productData.isPremium || false,
            ...productData
        };
        return {
            success: true,
            data: newProduct,
            message: 'Product created successfully',
            timestamp: new Date().toISOString()
        };
    }
    async getStats() {
        await this.simulateDelay();
        const stats = {
            totalProducts: this.mockProducts.length,
            categories: {
                electronics: this.mockProducts.filter(p => p.category === 'electronics').length,
                clothing: this.mockProducts.filter(p => p.category === 'clothing').length,
                food: this.mockProducts.filter(p => p.category === 'food').length
            },
            averagePrice: Math.round(this.mockProducts.reduce((sum, p) => sum + p.price, 0) / this.mockProducts.length),
            premiumProducts: this.mockProducts.filter(p => p.isPremium).length,
            discountedProducts: this.mockProducts.filter(p => p.hasDiscount).length
        };
        return {
            success: true,
            data: stats,
            timestamp: new Date().toISOString()
        };
    }
}
//# sourceMappingURL=fakeApi.js.map
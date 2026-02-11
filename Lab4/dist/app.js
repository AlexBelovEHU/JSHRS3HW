import { FactoryRegistry } from './patterns/abstractFactory.js';
import { ProductDirector } from './patterns/builder.js';
import { SortContext } from './patterns/strategy.js';
import { FakeApi } from './api/fakeApi.js';
class OnlineStore {
    constructor() {
        this.factoryRegistry = new FactoryRegistry();
        this.productDirector = new ProductDirector();
        this.sortContext = new SortContext();
        this.api = new FakeApi();
        this.products = [];
        this.productsGrid = document.getElementById('productsGrid');
        this.productCount = document.getElementById('productCount');
    }
    createFromFactory(factoryType) {
        try {
            const factory = this.factoryRegistry.getFactory(factoryType);
            const product = factory.createRandomProduct();
            this.products.push(product);
            this.renderProducts();
        }
        catch (error) {
            console.error('Ошибка создания продукта из фабрики:', error);
        }
    }
    createFromBuilder() {
        const nameInput = document.getElementById('productName');
        const priceInput = document.getElementById('productPrice');
        const brandInput = document.getElementById('productBrand');
        const categorySelect = document.getElementById('productCategory');
        const ratingInput = document.getElementById('productRating');
        const discountCheckbox = document.getElementById('productDiscount');
        const premiumCheckbox = document.getElementById('productPremium');
        const name = nameInput?.value || '';
        const price = parseFloat(priceInput?.value || '0');
        const brand = brandInput?.value || '';
        const category = (categorySelect?.value || 'electronics');
        const rating = parseFloat(ratingInput?.value || '0');
        const hasDiscount = discountCheckbox?.checked || false;
        const isPremium = premiumCheckbox?.checked || false;
        if (!name || !price) {
            return;
        }
        const product = this.productDirector.buildCustomProduct({
            name,
            price,
            brand,
            category,
            rating,
            hasDiscount,
            isPremium
        });
        this.products.push(product);
        if (nameInput)
            nameInput.value = '';
        if (priceInput)
            priceInput.value = '';
        if (brandInput)
            brandInput.value = '';
        if (ratingInput)
            ratingInput.value = '';
        if (discountCheckbox)
            discountCheckbox.checked = false;
        if (premiumCheckbox)
            premiumCheckbox.checked = false;
        this.renderProducts();
    }
    sortProducts(strategyName) {
        if (this.products.length === 0) {
            return;
        }
        try {
            this.sortContext.setStrategy(strategyName);
            this.products = this.sortContext.executeSort(this.products);
            this.renderProducts();
        }
        catch (error) {
        }
    }
    async loadFromApi() {
        try {
            const response = await this.api.getProducts();
            if (response.success && response.data) {
                response.data.forEach((apiProduct) => {
                    const product = this.productDirector.buildCustomProduct({
                        name: apiProduct.name,
                        price: apiProduct.price,
                        brand: apiProduct.brand,
                        category: apiProduct.category,
                        rating: apiProduct.rating,
                        hasDiscount: apiProduct.hasDiscount,
                        isPremium: apiProduct.isPremium
                    });
                    this.products.push(product);
                });
                this.renderProducts();
            }
        }
        catch (error) {
            console.error('Ошибка загрузки продуктов из API:', error);
        }
    }
    clearProducts() {
        this.products = [];
        this.renderProducts();
    }
    renderProducts() {
        if (!this.productsGrid || !this.productCount)
            return;
        this.productCount.textContent = `${this.products.length} товаров`;
        if (this.products.length === 0) {
            this.productsGrid.innerHTML = `
                <p class="empty-message">Нажмите кнопки слева для создания продуктов</p>
            `;
            return;
        }
        this.productsGrid.innerHTML = this.products.map(product => this.renderProductCard(product)).join('');
    }
    renderProductCard(product) {
        const icon = product.getIcon();
        const categoryName = this.getCategoryDisplayName(product.category);
        let badges = '';
        if (product.hasDiscount) {
            badges += '<span class="badge badge-discount">Скидка</span>';
        }
        if (product.isPremium) {
            badges += '<span class="badge badge-premium">Premium</span>';
        }
        return `
            <div class="product-card ${product.category}">
                <div class="product-image">${icon}</div>
                <div class="product-info">
                    <div class="product-category">${categoryName}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-brand">${product.brand || 'Без бренда'}</p>
                    <div class="product-meta">
                        <span class="product-price">${product.price.toLocaleString('ru-RU')}₽</span>
                        <span class="product-rating">⭐ ${product.rating}</span>
                    </div>
                    ${badges ? `<div class="product-badges">${badges}</div>` : ''}
                </div>
            </div>
        `;
    }
    getCategoryDisplayName(category) {
        const names = {
            electronics: 'Электроника',
            clothing: 'Одежда',
            food: 'Продукты питания'
        };
        return names[category] || category;
    }
}
window.store = new OnlineStore();
//# sourceMappingURL=app.js.map
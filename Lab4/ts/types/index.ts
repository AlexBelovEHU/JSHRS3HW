


export type ProductCategory = 'electronics' | 'clothing' | 'food';

export interface IProduct {
    id: string;
    name: string;
    price: number;
    category: ProductCategory;
    rating: number;
    brand: string;
    hasDiscount: boolean;
    isPremium: boolean;
    getInfo(): string;
    getIcon(): string;
}

export interface IElectronicsProduct extends IProduct {
    warranty: number;
    voltage: number;
}

export interface IClothingProduct extends IProduct {
    size: string;
    material: string;
}

export interface IFoodProduct extends IProduct {
    expirationDays: number;
    calories: number;
}


export interface IProductFactory {
    createProduct(name: string, price: number): IProduct;
    createRandomProduct(): IProduct;
    getCategoryName(): string;
}

export interface IFactoryRegistry {
    getFactory(type: ProductCategory): IProductFactory;
    getAllFactoryTypes(): ProductCategory[];
}


export interface IProductBuilder {
    reset(): this;
    setName(name: string): this;
    setPrice(price: number): this;
    setBrand(brand: string): this;
    setRating(rating: number): this;
    setDiscount(hasDiscount: boolean): this;
    setPremium(isPremium: boolean): this;
    build(): IProduct;
}

export interface CustomProductOptions {
    name?: string;
    price?: number;
    brand?: string;
    category?: ProductCategory;
    rating?: number;
    hasDiscount?: boolean;
    isPremium?: boolean;
}


export interface ISortStrategy {
    sort(products: IProduct[]): IProduct[];
    getName(): string;
    getDescription(): string;
}

export type SortStrategyName = 
    | 'price-asc' 
    | 'price-desc' 
    | 'name' 
    | 'rating' 
    | 'category' 
    | 'discount' 
    | 'premium';

export interface ISortContext {
    setStrategy(strategyName: SortStrategyName): this;
    executeSort(products: IProduct[]): IProduct[];
    getCurrentStrategyName(): string;
    getCurrentStrategyDescription(): string;
    getAvailableStrategies(): { name: string; description: string }[];
}


export interface ApiProduct {
    id: string;
    name: string;
    price: number;
    category: ProductCategory;
    brand: string;
    rating: number;
    hasDiscount: boolean;
    isPremium: boolean;
    warranty?: number;
    voltage?: number;
    size?: string;
    material?: string;
    expirationDays?: number;
    calories?: number;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    total?: number;
    category?: string;
    query?: string;
    message?: string;
    timestamp: string;
}

export interface StoreStats {
    totalProducts: number;
    categories: {
        electronics: number;
        clothing: number;
        food: number;
    };
    averagePrice: number;
    premiumProducts: number;
    discountedProducts: number;
}

export interface IFakeApi {
    getProducts(): Promise<ApiResponse<ApiProduct[]>>;
    getProductById(id: string): Promise<ApiResponse<ApiProduct>>;
    getProductsByCategory(category: ProductCategory): Promise<ApiResponse<ApiProduct[]>>;
    searchProducts(query: string): Promise<ApiResponse<ApiProduct[]>>;
    getFeaturedProducts(): Promise<ApiResponse<ApiProduct[]>>;
    createProduct(productData: Partial<ApiProduct>): Promise<ApiResponse<ApiProduct>>;
    getStats(): Promise<ApiResponse<StoreStats>>;
}


export interface ProductTemplate {
    name: string;
    price: number;
    brand: string;
}

import { ApiProduct, ApiResponse, StoreStats, IFakeApi, ProductCategory } from '../types/index.js';
export declare class FakeApi implements IFakeApi {
    private delay;
    private mockProducts;
    private simulateDelay;
    getProducts(): Promise<ApiResponse<ApiProduct[]>>;
    getProductById(id: string): Promise<ApiResponse<ApiProduct>>;
    getProductsByCategory(category: ProductCategory): Promise<ApiResponse<ApiProduct[]>>;
    searchProducts(query: string): Promise<ApiResponse<ApiProduct[]>>;
    getFeaturedProducts(): Promise<ApiResponse<ApiProduct[]>>;
    createProduct(productData: Partial<ApiProduct>): Promise<ApiResponse<ApiProduct>>;
    getStats(): Promise<ApiResponse<StoreStats>>;
}

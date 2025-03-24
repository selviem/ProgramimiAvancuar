// tests/unit/product-service.test.js
const productService = require('../../src/services/product-service');

describe('ProductService', () => {
  describe('getAllProducts', () => {
    
    it('should return all products when no filters are applied', () => {
      const result = productService.getAllProducts();
      expect(result.products.length).toBeGreaterThan(0);
      expect(result).toHaveProperty('total');
      expect(result).toHaveProperty('limit');
      expect(result).toHaveProperty('offset');
    });

    // Test filtering products by category
    it('should return filtered products by category', () => {
      const category = 'Electronics';
      const result = productService.getAllProducts({ category });
      expect(result.products.every(product => product.category === category)).toBe(true);
    });

    // Test filtering products by price range
    it('should return products within a specific price range', () => {
      const minPrice = 10;
      const maxPrice = 50;
      const result = productService.getAllProducts({ minPrice, maxPrice });
      expect(result.products.every(product => product.price >= minPrice && product.price <= maxPrice)).toBe(true);
    });

    // Test pagination logic
    it('should return paginated results', () => {
      const limit = 5;
      const offset = 0;
      const result = productService.getAllProducts({ limit, offset });
      expect(result.products.length).toBeLessThanOrEqual(limit);
      expect(result.limit).toBe(limit);
      expect(result.offset).toBe(offset);
    });

    // Test when no products match the filter
    it('should return an empty array if no products match the filter', () => {
      const result = productService.getAllProducts({ category: 'NonExistentCategory' });
      expect(result.products.length).toBe(0);
    });

    // Test for invalid filter inputs
    it('should handle invalid filter inputs gracefully', () => {
      // Testing invalid 'minPrice' (string instead of number)
      expect(() => productService.getAllProducts({ minPrice: 'invalid' })).toThrow('minPrice must be a number');
      // Testing invalid 'limit' (negative number)
      expect(() => productService.getAllProducts({ limit: -1 })).toThrow('limit cannot be negative');
      // Testing invalid 'maxPrice' (string instead of number)
      expect(() => productService.getAllProducts({ maxPrice: 'invalid' })).toThrow('maxPrice must be a number');
    });

    // Test if the correct number of products is returned for pagination with valid filters
    it('should return correct number of products for pagination with filters', () => {
      const limit = 2;
      const offset = 0;
      const result = productService.getAllProducts({ limit, offset, category: 'Electronics' });
      expect(result.products.length).toBeLessThanOrEqual(limit);
      expect(result.products.every(product => product.category === 'Electronics')).toBe(true);
    });
  });
});

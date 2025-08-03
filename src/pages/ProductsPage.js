import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Filter, Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { categories } from '../data/categories';

const ProductsPage = ({
  addToCart,
  toggleWishlist,
  wishlistItems,
  setSelectedProduct,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
}) => {
  // Memoize filtered and sorted products to prevent unnecessary recalculations
  const processedProducts = useMemo(() => {
    // Filter products
    const filtered = products.filter((product) => {
      // Add null/undefined checks for safety
      const productName = product?.name?.toLowerCase() || '';
      const productDescription = product?.description?.toLowerCase() || '';
      const searchTerm = searchQuery?.toLowerCase() || '';
      
      const matchesSearch = 
        productName.includes(searchTerm) || 
        productDescription.includes(searchTerm);
      
      const matchesCategory = 
        selectedCategory === 'all' || product?.category === selectedCategory;
      
      // Add safety check for price
      const productPrice = product?.price || 0;
      const matchesPrice = 
        productPrice >= (priceRange?.[0] || 0) && 
        productPrice <= (priceRange?.[1] || 1000);
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (a?.price || 0) - (b?.price || 0);
        case 'price-high':
          return (b?.price || 0) - (a?.price || 0);
        case 'rating':
          return (b?.rating || 0) - (a?.rating || 0);
        case 'newest':
          return (b?.id || 0) - (a?.id || 0);
        case 'name':
          return (a?.name || '').localeCompare(b?.name || '');
        case 'featured':
        default:
          return 0;
      }
    });

    return sorted;
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  // Handle clear filters with useCallback for better performance
  const handleClearFilters = useCallback(() => {
    setSelectedCategory('all');
    setPriceRange([0, 1000]);
    setSearchQuery('');
    setSortBy('featured');
  }, [setSelectedCategory, setPriceRange, setSearchQuery, setSortBy]);

  // Handle price range changes with validation
  const handleMinPriceChange = useCallback((e) => {
    const value = Math.max(0, Number(e.target.value) || 0);
    setPriceRange([value, Math.max(value, priceRange[1])]);
  }, [priceRange, setPriceRange]);

  const handleMaxPriceChange = useCallback((e) => {
    const value = Math.max(0, Number(e.target.value) || 0);
    setPriceRange([Math.min(priceRange[0], value), value]);
  }, [priceRange, setPriceRange]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <div className="card p-6 sticky top-24">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </h3>

            {/* Categories Filter */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Categories</h4>
              <div className="space-y-2">
                {categories?.map((category) => (
                  <button
                    key={category?.id || 'unknown'}
                    onClick={() => setSelectedCategory(category?.id || 'all')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category?.id
                        ? 'bg-blue-100 text-blue-600'
                        : 'hover:bg-gray-100'
                    }`}
                    type="button"
                  >
                    <span className="mr-2" aria-hidden="true">
                      {category?.icon || '📦'}
                    </span>
                    {category?.name || 'Unknown Category'}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Price Range</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-20 px-2 py-1 border rounded text-sm"
                    value={priceRange?.[0] || 0}
                    onChange={handleMinPriceChange}
                    min="0"
                    aria-label="Minimum price"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-20 px-2 py-1 border rounded text-sm"
                    value={priceRange?.[1] || 1000}
                    onChange={handleMaxPriceChange}
                    min="0"
                    aria-label="Maximum price"
                  />
                </div>
                <div className="space-y-2">
                  {[
                    { label: 'Under $25', min: 0, max: 25 },
                    { label: '$25 - $50', min: 25, max: 50 },
                    { label: '$50 - $100', min: 50, max: 100 },
                    { label: '$100 - $200', min: 100, max: 200 },
                    { label: 'Over $200', min: 200, max: 1000 },
                  ].map((range) => (
                    <button
                      key={range.label}
                      onClick={() => setPriceRange([range.min, range.max])}
                      className="w-full text-left px-3 py-1 text-sm rounded hover:bg-gray-100 transition-colors"
                      type="button"
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleClearFilters}
              className="w-full btn-secondary text-sm"
              type="button"
            >
              Clear All Filters
            </button>
          </div>
        </div>

        {/* Products Section */}
        <div className="lg:w-3/4">
          {/* Search and Sort Bar */}
          <div className="card p-4 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-200"
                    aria-hidden="true"
                  />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 group"
                    value={searchQuery || ''}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search products"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 whitespace-nowrap">
                  {processedProducts?.length || 0} products found
                </span>
                <select
                  value={sortBy || 'featured'}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  aria-label="Sort products"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid or Empty State */}
          {processedProducts?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processedProducts.map((product) => (
                <ProductCard
                  key={product?.id || Math.random()}
                  product={product}
                  addToCart={addToCart}
                  toggleWishlist={toggleWishlist}
                  wishlistItems={wishlistItems}
                  setSelectedProduct={setSelectedProduct}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your filters or search terms to find what you&apos;re looking for.
              </p>
              <button
                onClick={handleClearFilters}
                className="btn-primary"
                type="button"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ProductsPage.propTypes = {
  addToCart: PropTypes.func.isRequired,
  toggleWishlist: PropTypes.func.isRequired,
  wishlistItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
  setSelectedProduct: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
  priceRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  setPriceRange: PropTypes.func.isRequired,
  sortBy: PropTypes.oneOf(['featured', 'newest', 'price-low', 'price-high', 'rating', 'name']).isRequired,
  setSortBy: PropTypes.func.isRequired,
};

export default ProductsPage;
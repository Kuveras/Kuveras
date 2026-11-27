import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/common/ProductCard';
import { SlidersHorizontal, ChevronRight, X, RotateCcw } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get('category') || 'All';
  const selectedSubcategory = searchParams.get('subcategory') || 'All';
  const selectedOccasion = searchParams.get('occasion') || 'All';
  const budgetParam = searchParams.get('budget') || 'All';
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const categories = ['All', 'Kundan', 'Cubic Zirconia', 'Choker', 'Rajwadi', 'Temple', 'Earrings', 'Bracelets', 'Bangles', 'Rings', 'Bridal / Wedding', 'Head Jewellery', 'Necklace'];
  const headJewellerySubcategories = ['All', 'Matha Patti', 'Matha Tikka'];
  const occasions = ['All', 'Daily Wear', 'Festive', 'Bridal', 'Party Wear', 'Office Wear', 'Date Night', 'Day Out'];
  const budgets = [
    { label: 'All Budgets', value: 'All' },
    { label: 'Under ₹3,000', value: 'under-3000' },
    { label: 'Under ₹4,500', value: 'under-4500' },
    { label: 'Under ₹5,000', value: 'under-5000' },
    { label: 'Under ₹7,000', value: 'under-7000' },
    { label: '₹5,000 – ₹10,000', value: '5000-10000' },
    { label: 'Under ₹10,000', value: 'under-10000' },
    { label: '₹10,000 & above', value: 'above-10000' },
  ];

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category match (supports multiple-category assignments)
      if (selectedCategory !== 'All') {
        const hasMultiCat = product.categories?.includes(selectedCategory as typeof product.category);
        if (selectedCategory === 'Choker') {
          const isChoker =
            product.category === 'Choker' ||
            hasMultiCat ||
            (product.subcategory && product.subcategory.toLowerCase().includes('choker')) ||
            product.name.toLowerCase().includes('choker');
          if (!isChoker) return false;
        } else if (product.category !== selectedCategory && !hasMultiCat) {
          return false;
        }
      }
      // Subcategory match (e.g. Matha Patti, Matha Tikka under Head Jewellery)
      if (selectedSubcategory !== 'All') {
        if ((product.subcategory || '').toLowerCase() !== selectedSubcategory.toLowerCase()) {
          return false;
        }
      }
      // Occasion match
      if (selectedOccasion !== 'All' && product.occasion !== selectedOccasion) {
        return false;
      }
      // Budget match
      if (budgetParam !== 'All') {
        if (budgetParam === 'under-3000' && product.salePrice > 3000) return false;
        if (budgetParam === 'under-4500' && product.salePrice > 4500) return false;
        if (budgetParam === 'under-5000' && product.salePrice > 5000) return false;
        if (budgetParam === 'under-7000' && product.salePrice > 7000) return false;
        if (budgetParam === '5000-10000' && (product.salePrice < 5000 || product.salePrice > 10000)) return false;
        if (budgetParam === 'under-10000' && product.salePrice > 10000) return false;
        if (budgetParam === '10000-20000' && (product.salePrice < 10000 || product.salePrice > 20000)) return false;
        if (budgetParam === 'above-10000' && product.salePrice < 10000) return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCat =
          product.category.toLowerCase().includes(q) ||
          (product.categories && product.categories.some((c) => c.toLowerCase().includes(q)));
        const matchesTag = product.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesCat && !matchesTag) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0);
      if (sortBy === 'price-low') return a.salePrice - b.salePrice;
      if (sortBy === 'price-high') return b.salePrice - a.salePrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, selectedCategory, selectedSubcategory, selectedOccasion, budgetParam, searchQuery, sortBy]);

  const setCategoryFilter = (cat: string) => {
    if (cat === 'All') searchParams.delete('category');
    else searchParams.set('category', cat);
    if (cat !== 'Head Jewellery') searchParams.delete('subcategory');
    setSearchParams(searchParams);
  };

  const setSubcategoryFilter = (sub: string) => {
    if (sub === 'All') searchParams.delete('subcategory');
    else searchParams.set('subcategory', sub);
    setSearchParams(searchParams);
  };

  const setOccasionFilter = (occ: string) => {
    if (occ === 'All') searchParams.delete('occasion');
    else searchParams.set('occasion', occ);
    setSearchParams(searchParams);
  };

  const setBudgetFilter = (bud: string) => {
    if (bud === 'All') searchParams.delete('budget');
    else searchParams.set('budget', bud);
    setSearchParams(searchParams);
  };

  const resetAllFilters = () => {
    setSearchParams({});
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="py-8 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-[#7A736E] mb-6">
          <Link to="/" className="hover:text-[#111111] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#111111] font-semibold">Shop Fine Jewellery</span>
        </div>

        {/* Page Title & Count */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E8E2D9] pb-6 mb-8 gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#111111] font-bold">
              {selectedCategory !== 'All' ? selectedCategory : 'All Fine Jewellery'}
            </h1>
            <p className="text-xs text-[#7A736E] mt-1 font-sans">
              Showing {filteredProducts.length} handcrafted Indian jewellery sets
            </p>
          </div>

          {/* Controls: Search & Sort & Mobile Filter Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden px-4 py-2 bg-[#FFFDF9] border border-[#E8E2D9] text-xs font-semibold text-[#111111] flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#C5A059]" />
              <span>Filters</span>
            </button>

            {/* Sort Select */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#FFFDF9] border border-[#E8E2D9] px-3 py-2 text-xs font-semibold text-[#111111] focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="newest">Sort by: New Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block lg:col-span-3 space-y-8 pr-4">
            <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-3">
              <h3 className="font-serif text-lg font-bold text-[#111111]">Refine Selection</h3>
              {(selectedCategory !== 'All' || selectedOccasion !== 'All' || budgetParam !== 'All' || searchQuery) && (
                <button
                  onClick={resetAllFilters}
                  className="text-[11px] text-[#7A1010] hover:underline flex items-center gap-1 font-semibold"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#2B2723] mb-3">
                Jewellery Category
              </h4>
              <ul className="space-y-1.5 text-xs text-[#6F6860]">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setCategoryFilter(cat)}
                      className={`w-full text-left py-1.5 px-3 transition-colors cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-[#7A1010] text-white font-bold'
                          : 'hover:bg-[#FFFDF8] hover:text-[#C89B3C]'
                      }`}
                    >
                      {cat}
                    </button>
                    {cat === 'Head Jewellery' && selectedCategory === 'Head Jewellery' && (
                      <ul className="pl-4 mt-1.5 space-y-1 border-l border-[#E8E2D9] ml-3">
                        {headJewellerySubcategories.map((sub) => (
                          <li key={sub}>
                            <button
                              onClick={() => setSubcategoryFilter(sub)}
                              className={`w-full text-left py-1 px-2.5 text-[11px] transition-colors cursor-pointer ${
                                selectedSubcategory === sub
                                  ? 'text-[#7A1010] font-bold bg-[#FAF0F0]'
                                  : 'text-[#6F6860] hover:text-[#C89B3C]'
                              }`}
                            >
                              {sub === 'All' ? 'All Head Jewellery' : sub}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Budget Filter */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#2B2723] mb-3">
                Shop By Budget
              </h4>
              <ul className="space-y-1.5 text-xs text-[#6F6860]">
                {budgets.map((b) => (
                  <li key={b.value}>
                    <button
                      onClick={() => setBudgetFilter(b.value)}
                      className={`w-full text-left py-1.5 px-3 transition-colors cursor-pointer ${
                        budgetParam === b.value
                          ? 'bg-[#7A1010] text-white font-bold'
                          : 'hover:bg-[#FFFDF8] hover:text-[#C89B3C]'
                      }`}
                    >
                      {b.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Occasion Filter */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#2B2723] mb-3">
                Occasion
              </h4>
              <ul className="space-y-1.5 text-xs text-[#6F6860]">
                {occasions.map((occ) => (
                  <li key={occ}>
                    <button
                      onClick={() => setOccasionFilter(occ)}
                      className={`w-full text-left py-1.5 px-3 transition-colors cursor-pointer ${
                        selectedOccasion === occ
                          ? 'bg-[#7A1010] text-white font-bold'
                          : 'hover:bg-[#FFFDF8] hover:text-[#C89B3C]'
                      }`}
                    >
                      {occ}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-[#FFFDF9] border border-[#E8E2D9] p-12 text-center space-y-4">
                <p className="font-serif text-2xl text-[#111111] font-bold">No Products Found</p>
                <p className="text-xs text-[#7A736E] max-w-sm mx-auto">
                  Try adjusting your filter preferences or search queries to explore our full Indian jewellery collection.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="px-6 py-2.5 bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#C5A059] transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          <div className="relative w-4/5 max-w-xs bg-[#FAF8F5] h-full shadow-2xl p-6 overflow-y-auto z-10 animate-slide-in flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-4 mb-6">
                <h3 className="font-serif text-xl font-bold text-[#111111]">Refine Filters</h3>
                <button onClick={() => setIsMobileFilterOpen(false)}>
                  <X className="w-5 h-5 text-[#111111]" />
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#111111] mb-2">
                  Category
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setCategoryFilter(cat);
                        setIsMobileFilterOpen(false);
                      }}
                      className={`px-3 py-1 text-xs border ${
                        selectedCategory === cat
                          ? 'bg-[#111111] text-white border-[#111111]'
                          : 'bg-white text-[#7A736E] border-[#E8E2D9]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div className="mb-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#111111] mb-2">
                  Budget
                </h4>
                <div className="space-y-1">
                  {budgets.map((b) => (
                    <button
                      key={b.value}
                      onClick={() => {
                        setBudgetFilter(b.value);
                        setIsMobileFilterOpen(false);
                      }}
                      className={`block w-full text-left px-3 py-1.5 text-xs ${
                        budgetParam === b.value ? 'font-bold text-[#7A1010]' : 'text-[#7A736E]'
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full py-3 bg-[#111111] text-white text-xs font-semibold uppercase tracking-widest mt-6"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

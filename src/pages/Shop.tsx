import React, { useState, useEffect } from 'react';
import SectionHeading from '../components/SectionHeading';
import ProductCard from '../components/ProductCard';
import { SAMPLE_PRODUCTS } from '../constants';
import { Category, Product } from '../types';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Todos'>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'rating'>('newest');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data() as Product);
      setProducts(data.length > 0 ? data : SAMPLE_PRODUCTS);
    });
    return () => unsubscribe();
  }, []);

  const categories: (Category | 'Todos')[] = [
    'Todos', 'Moda', 'Beleza', 'Acessórios', 'Casa', 'Tecnologia', 'Produtos Digitais', 'Recursos Grátis', 'Dropshipping'
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // newest (default)
  });

  return (
    <div className="min-h-screen bg-brand-gray/30">
      {/* Header */}
      <div className="bg-brand-black text-white pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <SectionHeading 
            title="Loja Virtual Completa" 
            subtitle="Explore o melhor do e-commerce"
            centered
          />
          <p className="text-gray-400 text-lg max-w-2xl mb-12">
            Descubra produtos virais, tecnologia de ponta e recursos digitais exclusivos para transformar o seu dia a dia.
          </p>
          
          {/* Search Bar */}
          <div className="w-full max-w-2xl relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Pesquisar por produtos, categorias ou tags..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-full py-5 pl-16 pr-8 text-white focus:outline-none focus:border-brand-gold transition-colors backdrop-blur-sm"
            />
          </div>
        </div>
      </div>

      {/* Filters & Products */}
      <section className="section-padding">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex flex-col gap-10">
            <div>
              <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
                <Filter size={18} /> Categorias
              </h4>
              <div className="flex flex-wrap lg:flex-col gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-sm font-medium px-4 py-2 rounded-full text-left transition-all ${
                      selectedCategory === cat 
                        ? 'bg-brand-black text-white shadow-lg' 
                        : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
                <ArrowUpDown size={18} /> Ordenar por
              </h4>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-white border border-gray-100 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-gold shadow-sm"
              >
                <option value="newest">Mais Recentes</option>
                <option value="price-asc">Menor Preço</option>
                <option value="price-desc">Maior Preço</option>
                <option value="rating">Melhor Avaliação</option>
              </select>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm text-gray-500 font-medium">
                Mostrando <span className="text-brand-black font-bold">{filteredProducts.length}</span> produtos
              </p>
              <div className="flex items-center gap-2 text-sm font-bold text-brand-black cursor-pointer hover:text-brand-gold transition-colors">
                <SlidersHorizontal size={16} /> Filtros Avançados
              </div>
            </div>

            <AnimatePresence mode="popLayout">
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mx-auto mb-6">
                  <Search size={40} />
                </div>
                <h3 className="text-xl font-bold mb-2">Nenhum produto encontrado</h3>
                <p className="text-gray-500">Tente ajustar os seus filtros ou pesquisar por outro termo.</p>
                <button 
                  onClick={() => {
                    setSelectedCategory('Todos');
                    setSearchQuery('');
                  }}
                  className="mt-8 btn-primary"
                >
                  Limpar Filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

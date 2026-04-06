import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SAMPLE_PRODUCTS } from '../constants';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { motion } from 'motion/react';
import { Star, ShoppingCart, Heart, ShieldCheck, Truck, RefreshCw, ArrowLeft, Plus, Minus, Download } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const foundProduct = SAMPLE_PRODUCTS.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      window.scrollTo(0, 0);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Produto não encontrado</h2>
          <Link to="/loja" className="btn-primary">Voltar para a Loja</Link>
        </div>
      </div>
    );
  }

  const relatedProducts = SAMPLE_PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-brand-gray/30 pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <Link to="/loja" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-brand-black transition-colors mb-10">
          <ArrowLeft size={18} /> Voltar para a Loja
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[50px] overflow-hidden shadow-2xl border border-gray-100 p-4"
          >
            <div className="aspect-[3/4] rounded-[40px] overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-8"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest bg-brand-gold/10 px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-brand-gold">
                  <Star size={14} fill="currentColor" />
                  <span className="text-sm font-bold">{product.rating}</span>
                  <span className="text-xs text-gray-400 font-medium ml-1">({product.reviewsCount} avaliações)</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-extrabold text-brand-black mb-4 leading-tight">
                {product.name}
              </h1>
              <p className="text-gray-500 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              {product.salePrice ? (
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-extrabold text-brand-black">
                    KZ {product.salePrice.toLocaleString()}
                  </span>
                  <span className="text-xl text-gray-400 line-through">
                    KZ {product.price.toLocaleString()}
                  </span>
                  <span className="bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    -{Math.round((1 - product.salePrice / product.price) * 100)}% OFF
                  </span>
                </div>
              ) : (
                <span className="text-4xl font-extrabold text-brand-black">
                  {product.price === 0 ? 'GRÁTIS' : `KZ ${product.price.toLocaleString()}`}
                </span>
              )}
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                Em stock e pronto para entrega
              </p>
            </div>

            <div className="h-px bg-gray-200 w-full" />

            <div className="flex flex-wrap items-center gap-6">
              {!product.isDigital && (
                <div className="flex items-center gap-4 bg-white rounded-full p-2 border border-gray-100 shadow-sm">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center bg-brand-gray rounded-full text-brand-black hover:bg-brand-black hover:text-white transition-all"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="font-bold text-lg w-8 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center bg-brand-gray rounded-full text-brand-black hover:bg-brand-black hover:text-white transition-all"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              )}
              
              <button 
                onClick={() => addToCart(product)}
                className="flex-1 btn-primary flex items-center justify-center gap-3 py-5 text-lg"
              >
                {product.isDigital && product.isFree ? (
                  <>Baixar Grátis <Download size={24} /></>
                ) : (
                  <>Adicionar ao Carrinho <ShoppingCart size={24} /></>
                )}
              </button>
              
              <button className="w-16 h-16 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all shadow-sm">
                <Heart size={24} />
              </button>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                  <ShieldCheck size={20} />
                </div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Garantia Total</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                  <Truck size={20} />
                </div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Entrega Rápida</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-600">
                  <RefreshCw size={20} />
                </div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Troca Fácil</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-32">
            <SectionHeading 
              title="Produtos Relacionados" 
              subtitle="Você também pode gostar"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

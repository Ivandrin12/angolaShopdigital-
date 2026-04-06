import React from 'react';
import { ShoppingCart, Star, Heart, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="premium-card group relative"
    >
      {/* Badge */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.isFree && (
          <span className="bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            Grátis
          </span>
        )}
        {product.salePrice && (
          <span className="bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            Oferta
          </span>
        )}
        {product.isPremium && (
          <span className="bg-brand-gold text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            Premium
          </span>
        )}
      </div>

      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={() => addToCart(product)}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-black hover:bg-brand-gold hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300"
          >
            <ShoppingCart size={20} />
          </button>
          <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-black hover:bg-red-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75">
            <Heart size={20} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-brand-gold">
            <Star size={12} fill="currentColor" />
            <span className="text-xs font-bold">{product.rating}</span>
          </div>
        </div>
        
        <Link to={`/produto/${product.id}`}>
          <h3 className="font-display font-bold text-lg mb-2 line-clamp-1 group-hover:text-brand-gold transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {product.salePrice ? (
              <>
                <span className="text-xs text-gray-400 line-through">
                  KZ {product.price.toLocaleString()}
                </span>
                <span className="text-xl font-extrabold text-brand-black">
                  KZ {product.salePrice.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="text-xl font-extrabold text-brand-black">
                {product.price === 0 ? 'GRÁTIS' : `KZ ${product.price.toLocaleString()}`}
              </span>
            )}
          </div>
          
          <Link
            to={`/produto/${product.id}`}
            className="flex items-center gap-2 text-xs font-bold text-brand-black hover:text-brand-gold transition-colors"
          >
            VER MAIS
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

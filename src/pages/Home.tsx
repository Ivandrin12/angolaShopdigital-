import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import SectionHeading from '../components/SectionHeading';
import ProductCard from '../components/ProductCard';
import { SAMPLE_PRODUCTS, SAMPLE_BLOG_POSTS } from '../constants';
import { Product, BlogPost } from '../types';
import { db } from '../firebase';
import { collection, onSnapshot, query, limit } from 'firebase/firestore';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Truck, CreditCard, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const unsubProducts = onSnapshot(query(collection(db, 'products'), limit(4)), (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data() as Product);
      setProducts(data.length > 0 ? data : SAMPLE_PRODUCTS.slice(0, 4));
    });

    const unsubBlog = onSnapshot(query(collection(db, 'blogPosts'), limit(2)), (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data() as BlogPost);
      setBlogPosts(data.length > 0 ? data : SAMPLE_BLOG_POSTS.slice(0, 2));
    });

    return () => {
      unsubProducts();
      unsubBlog();
    };
  }, []);

  const features = [
    {
      icon: <ShieldCheck size={32} />,
      title: 'Compra Segura',
      description: 'Seus dados protegidos com criptografia de ponta a ponta.'
    },
    {
      icon: <Truck size={32} />,
      title: 'Entrega Rápida',
      description: 'Logística eficiente para todo o país e downloads instantâneos.'
    },
    {
      icon: <CreditCard size={32} />,
      title: 'Pagamento Flexível',
      description: 'Aceitamos diversos métodos de pagamento locais e internacionais.'
    },
    {
      icon: <Headphones size={32} />,
      title: 'Suporte 24/7',
      description: 'Equipe dedicada para tirar todas as suas dúvidas a qualquer hora.'
    }
  ];

  return (
    <div className="flex flex-col">
      <Hero />

      {/* Features Section */}
      <section className="section-padding grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center text-center p-8 rounded-3xl bg-white border border-gray-100 hover:shadow-xl transition-all group"
          >
            <div className="w-16 h-16 bg-brand-gray rounded-2xl flex items-center justify-center text-brand-black group-hover:bg-brand-gold group-hover:text-white transition-colors mb-6">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </section>

      {/* Featured Products */}
      <section className="section-padding">
        <div className="flex items-end justify-between mb-12">
          <SectionHeading 
            title="Produtos em Destaque" 
            subtitle="As melhores escolhas"
          />
          <Link to="/loja" className="hidden sm:flex items-center gap-2 text-sm font-bold text-brand-black hover:text-brand-gold transition-colors mb-12">
            Ver Todos <ArrowRight size={18} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Digital Products Banner */}
      <section className="section-padding">
        <div className="bg-brand-black rounded-[40px] overflow-hidden relative min-h-[500px] flex items-center">
          <div className="absolute inset-0 opacity-30">
            <img 
              src="https://picsum.photos/seed/digital/1920/1080" 
              alt="Digital Background" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="relative z-10 p-12 lg:p-24 max-w-2xl">
            <span className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-6 block">
              Mercado Digital
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-extrabold text-white leading-tight mb-8">
              Acelere o seu <br />
              <span className="text-brand-gold">Sucesso Digital.</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              Templates, e-books e ferramentas exclusivas para empreendedores que não têm tempo a perder. 
              Comece a faturar hoje mesmo.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/produtos-digitais" className="bg-brand-gold text-white px-8 py-4 rounded-full font-bold hover:bg-brand-gold/90 transition-all">
                Ver Produtos Digitais
              </Link>
              <Link to="/recursos-gratis" className="bg-white text-brand-black px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all">
                Baixar Recursos Grátis
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="section-padding">
        <SectionHeading 
          title="Últimas do Blog" 
          subtitle="Aprenda e cresça"
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <motion.div
              key={post.id}
              whileHover={{ y: -10 }}
              className="premium-card group"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest bg-brand-gold/10 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">{post.date}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-brand-gold transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                <Link to={`/blog/${post.id}`} className="flex items-center gap-2 text-sm font-bold text-brand-black group-hover:gap-4 transition-all">
                  Ler Artigo Completo <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-padding">
        <div className="bg-brand-gray rounded-[40px] p-12 lg:p-24 text-center flex flex-col items-center">
          <SectionHeading 
            title="Fique por dentro das novidades" 
            subtitle="Newsletter exclusiva"
            centered
          />
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Junte-se a mais de 10.000 empreendedores e receba dicas, promoções e recursos grátis diretamente no seu e-mail.
          </p>
          <form className="w-full max-w-md flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Seu melhor e-mail" 
              className="flex-1 bg-white border border-gray-200 rounded-full py-4 px-8 text-sm focus:outline-none focus:border-brand-gold transition-colors shadow-sm"
              required
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Subscrever Agora
            </button>
          </form>
          <p className="text-[10px] text-gray-400 mt-6 uppercase tracking-widest font-bold">
            Respeitamos a sua privacidade. Cancele a qualquer momento.
          </p>
        </div>
      </section>
    </div>
  );
}

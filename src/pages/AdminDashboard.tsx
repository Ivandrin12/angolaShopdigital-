import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { Product, BlogPost, Category } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Edit2, Trash2, Package, FileText, LayoutDashboard, ArrowLeft, Save, X, Image as ImageIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';

export default function AdminDashboard() {
  const { isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'products' | 'blog'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [editingBlog, setEditingBlog] = useState<Partial<BlogPost> | null>(null);

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate('/');
    }
  }, [isAdmin, loading, navigate]);

  useEffect(() => {
    if (!isAdmin) return;

    const unsubProducts = onSnapshot(query(collection(db, 'products')), (snapshot) => {
      setProducts(snapshot.docs.map(doc => doc.data() as Product));
    });

    const unsubBlog = onSnapshot(query(collection(db, 'blogPosts')), (snapshot) => {
      setBlogPosts(snapshot.docs.map(doc => doc.data() as BlogPost));
    });

    return () => {
      unsubProducts();
      unsubBlog();
    };
  }, [isAdmin]);

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const id = editingProduct.id || doc(collection(db, 'products')).id;
    const productData = {
      ...editingProduct,
      id,
      price: Number(editingProduct.price || 0),
      salePrice: editingProduct.salePrice ? Number(editingProduct.salePrice) : null,
      rating: editingProduct.rating || 5,
      reviewsCount: editingProduct.reviewsCount || 0,
      tags: editingProduct.tags || [],
      isDigital: !!editingProduct.isDigital,
      isFree: !!editingProduct.isFree,
      isPremium: !!editingProduct.isPremium,
      isDropshipping: !!editingProduct.isDropshipping,
    } as Product;

    // Remove undefined fields to satisfy Firestore rules
    Object.keys(productData).forEach(key => {
      if (productData[key as keyof Product] === undefined) {
        delete productData[key as keyof Product];
      }
    });

    try {
      await setDoc(doc(db, 'products', id), productData);
      setIsEditing(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    }
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;

    const id = editingBlog.id || doc(collection(db, 'blogPosts')).id;
    const blogData = {
      ...editingBlog,
      id,
      date: editingBlog.date || new Date().toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' }),
      author: editingBlog.author || 'Ivandrin Ndala',
    } as BlogPost;

    // Remove undefined fields to satisfy Firestore rules
    Object.keys(blogData).forEach(key => {
      if (blogData[key as keyof BlogPost] === undefined) {
        delete blogData[key as keyof BlogPost];
      }
    });

    try {
      await setDoc(doc(db, 'blogPosts', id), blogData);
      setIsEditing(false);
      setEditingBlog(null);
    } catch (error) {
      console.error('Erro ao salvar post:', error);
    }
  };

  const handleDelete = async (type: 'products' | 'blogPosts', id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este item?')) return;
    try {
      await deleteDoc(doc(db, type, id));
    } catch (error) {
      console.error('Erro ao excluir:', error);
    }
  };

  if (loading || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-brand-gray/30 pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <SectionHeading 
            title="Painel Administrativo" 
            subtitle="Gestão de Conteúdo"
          />
          <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'products' ? 'bg-brand-black text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <Package size={18} /> Produtos
            </button>
            <button
              onClick={() => setActiveTab('blog')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'blog' ? 'bg-brand-black text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <FileText size={18} /> Blog
            </button>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex justify-end mb-8">
          <button
            onClick={() => {
              setIsEditing(true);
              if (activeTab === 'products') setEditingProduct({});
              else setEditingBlog({});
            }}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={20} /> {activeTab === 'products' ? 'Novo Produto' : 'Novo Post'}
          </button>
        </div>

        {/* Content List */}
        <div className="grid grid-cols-1 gap-6">
          {activeTab === 'products' ? (
            products.map((product) => (
              <div key={product.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6">
                <img src={product.image} alt={product.name} className="w-20 h-20 rounded-2xl object-cover" />
                <div className="flex-1">
                  <h4 className="font-bold text-lg">{product.name}</h4>
                  <p className="text-sm text-gray-500">{product.category} • KZ {product.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      setEditingProduct(product);
                      setIsEditing(true);
                    }}
                    className="p-3 bg-gray-50 text-gray-600 rounded-xl hover:bg-brand-gold hover:text-white transition-all"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete('products', product.id)}
                    className="p-3 bg-gray-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            blogPosts.map((post) => (
              <div key={post.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6">
                <img src={post.image} alt={post.title} className="w-20 h-20 rounded-2xl object-cover" />
                <div className="flex-1">
                  <h4 className="font-bold text-lg">{post.title}</h4>
                  <p className="text-sm text-gray-500">{post.category} • {post.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      setEditingBlog(post);
                      setIsEditing(true);
                    }}
                    className="p-3 bg-gray-50 text-gray-600 rounded-xl hover:bg-brand-gold hover:text-white transition-all"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete('blogPosts', post.id)}
                    className="p-3 bg-gray-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Edit Modal */}
        <AnimatePresence>
          {isEditing && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsEditing(false)}
                className="absolute inset-0 bg-brand-black/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[40px] shadow-2xl p-10"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold">
                    {activeTab === 'products' 
                      ? (editingProduct?.id ? 'Editar Produto' : 'Novo Produto')
                      : (editingBlog?.id ? 'Editar Post' : 'Novo Post')
                    }
                  </h3>
                  <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X size={24} />
                  </button>
                </div>

                {activeTab === 'products' ? (
                  <form onSubmit={handleSaveProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">Nome do Produto</label>
                      <input 
                        type="text" 
                        value={editingProduct?.name || ''}
                        onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                        className="bg-brand-gray border-none rounded-full py-4 px-8 text-sm focus:ring-2 focus:ring-brand-gold transition-all"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">Categoria</label>
                      <select 
                        value={editingProduct?.category || ''}
                        onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value as Category})}
                        className="bg-brand-gray border-none rounded-full py-4 px-8 text-sm focus:ring-2 focus:ring-brand-gold transition-all"
                        required
                      >
                        <option value="">Selecionar Categoria</option>
                        <option value="Moda">Moda</option>
                        <option value="Beleza">Beleza</option>
                        <option value="Acessórios">Acessórios</option>
                        <option value="Casa">Casa</option>
                        <option value="Tecnologia">Tecnologia</option>
                        <option value="Produtos Digitais">Produtos Digitais</option>
                        <option value="Recursos Grátis">Recursos Grátis</option>
                        <option value="Dropshipping">Dropshipping</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">Preço (KZ)</label>
                      <input 
                        type="number" 
                        value={editingProduct?.price || ''}
                        onChange={(e) => setEditingProduct({...editingProduct, price: Number(e.target.value)})}
                        className="bg-brand-gray border-none rounded-full py-4 px-8 text-sm focus:ring-2 focus:ring-brand-gold transition-all"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">Preço Promocional (Opcional)</label>
                      <input 
                        type="number" 
                        value={editingProduct?.salePrice || ''}
                        onChange={(e) => setEditingProduct({...editingProduct, salePrice: Number(e.target.value)})}
                        className="bg-brand-gray border-none rounded-full py-4 px-8 text-sm focus:ring-2 focus:ring-brand-gold transition-all"
                      />
                    </div>
                    <div className="md:col-span-2 flex flex-col gap-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">URL da Imagem</label>
                      <input 
                        type="text" 
                        value={editingProduct?.image || ''}
                        onChange={(e) => setEditingProduct({...editingProduct, image: e.target.value})}
                        className="bg-brand-gray border-none rounded-full py-4 px-8 text-sm focus:ring-2 focus:ring-brand-gold transition-all"
                        required
                      />
                    </div>
                    <div className="md:col-span-2 flex flex-col gap-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">Descrição</label>
                      <textarea 
                        rows={4}
                        value={editingProduct?.description || ''}
                        onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                        className="bg-brand-gray border-none rounded-3xl py-6 px-8 text-sm focus:ring-2 focus:ring-brand-gold transition-all resize-none"
                        required
                      />
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-brand-gray rounded-3xl">
                      <input 
                        type="checkbox" 
                        checked={editingProduct?.isDigital || false}
                        onChange={(e) => setEditingProduct({...editingProduct, isDigital: e.target.checked})}
                        className="w-5 h-5 text-brand-gold focus:ring-brand-gold rounded"
                      />
                      <label className="text-sm font-bold text-gray-600">Produto Digital</label>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-brand-gray rounded-3xl">
                      <input 
                        type="checkbox" 
                        checked={editingProduct?.isFree || false}
                        onChange={(e) => setEditingProduct({...editingProduct, isFree: e.target.checked})}
                        className="w-5 h-5 text-brand-gold focus:ring-brand-gold rounded"
                      />
                      <label className="text-sm font-bold text-gray-600">Recurso Grátis</label>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-brand-gray rounded-3xl">
                      <input 
                        type="checkbox" 
                        checked={editingProduct?.isPremium || false}
                        onChange={(e) => setEditingProduct({...editingProduct, isPremium: e.target.checked})}
                        className="w-5 h-5 text-brand-gold focus:ring-brand-gold rounded"
                      />
                      <label className="text-sm font-bold text-gray-600">Premium</label>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-brand-gray rounded-3xl">
                      <input 
                        type="checkbox" 
                        checked={editingProduct?.isDropshipping || false}
                        onChange={(e) => setEditingProduct({...editingProduct, isDropshipping: e.target.checked})}
                        className="w-5 h-5 text-brand-gold focus:ring-brand-gold rounded"
                      />
                      <label className="text-sm font-bold text-gray-600">Dropshipping</label>
                    </div>
                    <div className="md:col-span-2 mt-4">
                      <button type="submit" className="btn-primary w-full py-5 text-lg flex items-center justify-center gap-2">
                        <Save size={20} /> Salvar Produto
                      </button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleSaveBlog} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">Título do Post</label>
                      <input 
                        type="text" 
                        value={editingBlog?.title || ''}
                        onChange={(e) => setEditingBlog({...editingBlog, title: e.target.value})}
                        className="bg-brand-gray border-none rounded-full py-4 px-8 text-sm focus:ring-2 focus:ring-brand-gold transition-all"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">Categoria</label>
                      <input 
                        type="text" 
                        value={editingBlog?.category || ''}
                        onChange={(e) => setEditingBlog({...editingBlog, category: e.target.value})}
                        className="bg-brand-gray border-none rounded-full py-4 px-8 text-sm focus:ring-2 focus:ring-brand-gold transition-all"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">URL da Imagem</label>
                      <input 
                        type="text" 
                        value={editingBlog?.image || ''}
                        onChange={(e) => setEditingBlog({...editingBlog, image: e.target.value})}
                        className="bg-brand-gray border-none rounded-full py-4 px-8 text-sm focus:ring-2 focus:ring-brand-gold transition-all"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">Resumo (Excerpt)</label>
                      <input 
                        type="text" 
                        value={editingBlog?.excerpt || ''}
                        onChange={(e) => setEditingBlog({...editingBlog, excerpt: e.target.value})}
                        className="bg-brand-gray border-none rounded-full py-4 px-8 text-sm focus:ring-2 focus:ring-brand-gold transition-all"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">Conteúdo (Markdown)</label>
                      <textarea 
                        rows={10}
                        value={editingBlog?.content || ''}
                        onChange={(e) => setEditingBlog({...editingBlog, content: e.target.value})}
                        className="bg-brand-gray border-none rounded-3xl py-6 px-8 text-sm focus:ring-2 focus:ring-brand-gold transition-all resize-none"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">Autor</label>
                      <input 
                        type="text" 
                        value={editingBlog?.author || 'Ivandrin Ndala'}
                        onChange={(e) => setEditingBlog({...editingBlog, author: e.target.value})}
                        className="bg-brand-gray border-none rounded-full py-4 px-8 text-sm focus:ring-2 focus:ring-brand-gold transition-all"
                        required
                      />
                    </div>
                    <div className="mt-4">
                      <button type="submit" className="btn-primary w-full py-5 text-lg flex items-center justify-center gap-2">
                        <Save size={20} /> Salvar Post
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

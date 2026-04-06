import { Product, BlogPost } from './types';

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'E-book: Guia do Dropshipping Pro',
    description: 'Aprenda do zero como criar uma loja de sucesso e faturar alto com dropshipping.',
    price: 49.90,
    salePrice: 29.90,
    image: 'https://picsum.photos/seed/ebook1/600/800',
    category: 'Produtos Digitais',
    isDigital: true,
    isFree: false,
    isPremium: true,
    isDropshipping: false,
    rating: 4.8,
    reviewsCount: 124,
    tags: ['E-book', 'Dropshipping', 'Marketing'],
    downloadUrl: '#'
  },
  {
    id: '2',
    name: 'Template Notion: Gestão de Negócios',
    description: 'Organize toda a sua operação digital em um único lugar com este template profissional.',
    price: 0,
    image: 'https://picsum.photos/seed/notion1/600/800',
    category: 'Recursos Grátis',
    isDigital: true,
    isFree: true,
    isPremium: false,
    isDropshipping: false,
    rating: 4.9,
    reviewsCount: 856,
    tags: ['Notion', 'Produtividade', 'Grátis'],
    downloadUrl: '#'
  },
  {
    id: '3',
    name: 'Smartwatch Ultra Tech V2',
    description: 'O relógio inteligente mais completo do mercado, com monitoramento de saúde avançado.',
    price: 299.00,
    salePrice: 199.00,
    image: 'https://picsum.photos/seed/watch1/600/800',
    category: 'Tecnologia',
    isDigital: false,
    isFree: false,
    isPremium: false,
    isDropshipping: true,
    rating: 4.7,
    reviewsCount: 45,
    tags: ['Smartwatch', 'Tecnologia', 'Saúde'],
    stock: 50
  },
  {
    id: '4',
    name: 'Pack de Conteúdo: Redes Sociais',
    description: 'Mais de 100 templates editáveis no Canva para transformar o seu perfil no Instagram.',
    price: 89.90,
    image: 'https://picsum.photos/seed/canva1/600/800',
    category: 'Produtos Digitais',
    isDigital: true,
    isFree: false,
    isPremium: true,
    isDropshipping: false,
    rating: 4.9,
    reviewsCount: 312,
    tags: ['Canva', 'Design', 'Instagram'],
    downloadUrl: '#'
  }
];

export const SAMPLE_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Como começar no Dropshipping em 2026',
    excerpt: 'Descubra as melhores estratégias para iniciar o seu negócio sem estoque este ano.',
    content: 'O dropshipping continua sendo uma das melhores formas de empreender online...',
    author: 'Ivandrin Ndala',
    date: '06 Abr 2026',
    image: 'https://picsum.photos/seed/blog1/1200/600',
    category: 'Dropshipping'
  },
  {
    id: '2',
    title: '5 Ferramentas Essenciais para Empreendedores Digitais',
    excerpt: 'Conheça as ferramentas que vão automatizar o seu negócio e economizar o seu tempo.',
    content: 'No mundo digital, tempo é dinheiro. Por isso, escolher as ferramentas certas...',
    author: 'Ivandrin Ndala',
    date: '05 Abr 2026',
    image: 'https://picsum.photos/seed/blog2/1200/600',
    category: 'Marketing Digital'
  }
];

export const BRAND_INFO = {
  name: 'AngolaShopDigital',
  slogan: 'Conectando pessoas, produtos e oportunidades digitais.',
  owner: 'Ivandrin Ndala',
  email: 'infroprodutosao@gmail.com',
  altEmail: 'ivandrinbrasndala@gmail.com',
  whatsapp: '944420213',
  instagram: 'Ivandrin_ndala22',
};

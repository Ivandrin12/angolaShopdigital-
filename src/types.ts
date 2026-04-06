export type Category = 'Moda' | 'Beleza' | 'Acessórios' | 'Casa' | 'Tecnologia' | 'Produtos Digitais' | 'Recursos Grátis' | 'Dropshipping';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  image: string;
  category: Category;
  isDigital: boolean;
  isFree: boolean;
  isPremium: boolean;
  isDropshipping: boolean;
  rating: number;
  reviewsCount: number;
  tags: string[];
  stock?: number;
  downloadUrl?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'admin' | 'user';
  createdAt: string;
  phoneNumber?: string;
  dateOfBirth?: {
    day: string;
    month: string;
    year: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: any;
  isAdmin: boolean;
}

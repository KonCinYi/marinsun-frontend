/*// src/types.ts

export interface Product {
    id: number;
    name: string;
    price: number;
    old_price: number | null;
    image_url: string;
    rating: number; // от 1 до 5
    reviews: number;
    badge: string | null; // например, 'Новинка', 'Хит продаж'
}

// Тип для пропсов, которые принимает ProductCard
export interface ProductCardProps {
    product: Product;
}*/

// src/types.ts

// src/types.ts

// ----------------------------------------------------
// 1. ИСХОДНАЯ (ЧИСТАЯ) СТРУКТУРА ДЛЯ ФРОНТЕНДА
// ----------------------------------------------------
export interface Product {
    id: number;
    name: string;
    price: number;
    old_price: number | null;
    image_url: string; // Чистый URL, который мы сами соберем
    rating: number; 
    reviews: number;
    badge: string | null; 
}

// Тип для пропсов остается прежним
export interface ProductCardProps {
    product: Product;
}

// ----------------------------------------------------
// 2. СТРУКТУРЫ ДЛЯ ПАРСИНГА ОТВЕТА ОТ STRAPI (Сложная часть)
// ----------------------------------------------------
export interface ImageItem {
    id: number;
    url: string;
    // ... другие поля
}
// --- А. Структура Image (Самый глубокий уровень) ---
export interface ImageAttributes {
    url: string;
    // ... можно добавить width, height, name, но нам нужен только url
}

export interface ImageData {
    id: number;
    attributes: ImageAttributes;
}

// --- Б. Структура Attributes Товара ---
// ВНИМАНИЕ: Здесь мы явно указываем, как выглядит image
export interface StrapiProduct {
    id: number;
    name: string;
    price: number;
    oldPrice: number | null; 
    rating: number;
    reviews: number;
    badge: string | null;
    
    // 💡 КЛЮЧЕВОЕ ИСПРАВЛЕНИЕ: image теперь массив ImageItem
    image: ImageItem[]; 
    
    // Внутренние поля Strapi
    createdAt: string; 
    updatedAt: string;
    publishedAt: string;
}

// --- В. Структура одного объекта данных Strapi ---
export interface StrapiProductData {
    id: number;
    attributes: StrapiProduct;
}

// --- Г. Главный тип ответа от API Strapi ---
export interface StrapiResponse {
    data: StrapiProduct[]; // Теперь это массив плоских продуктов!
     meta: unknown;
}

// 💡 НОВЫЙ ТИП: Для компонента FilterModal
export interface MobileFilterModalProps {
    totalProductCount: number;
    currentFilterCount: number; 
}
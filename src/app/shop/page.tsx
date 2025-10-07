import { ProductCard } from '@/components/ProductCard'; 
import { ShopHeader } from '@/components/ShopHeader'; // <-- Импорт
import { ShopSidebar } from '@/components/ShopSidebar'; // <-- Импорт
import { ShopFooter } from '@/components/ShopFooter'; // <-- Импорт
import { Product, StrapiProduct, StrapiProductData, StrapiResponse } from '@/types'; 
import React from 'react'; 



// 1. ФУНКЦИЯ ПОЛУЧЕНИЯ ДАННЫХ (Кладовщик, который теперь умеет говорить со Strapi)
async function getProducts(): Promise<Product[]> {
    const STRAPI_BASE = 'http://192.168.0.112:1337';
    const STRAPI_URL = `${STRAPI_BASE}/api/products`; 

    // Добавляем параметр populate=* (хотя в плоской структуре он может быть не нужен, оставим)
    const res = await fetch(`${STRAPI_URL}?populate=*`, { 
        cache: 'no-store' 
    }); 
    
    if (!res.ok) {
        throw new Error('Не удалось получить данные о товарах со Strapi.');
    }
    
    const strapiResponse: StrapiResponse = await res.json();
    
    // 3. ПРЕОБРАЗОВАНИЕ (Трансформация): Используем ПЛОСКИЙ ОТВЕТ
    const products: Product[] = strapiResponse.data
        // 💡 Здесь мы просто мапируем StrapiProduct, у которого НЕТ обертки attributes
        .map((item: StrapiProduct) => {
            
            // Получаем URL из первого элемента массива image (если он есть)
            const imageUrl = item.image && item.image.length > 0
                ? `${STRAPI_BASE}${item.image[0].url}` // Используем URL первого изображения в массиве
                : 'https://via.placeholder.com/280x280.png?text=No+Image';

            return {
                id: item.id,
                name: item.name,
                price: item.price,
                old_price: item.oldPrice || null, // В Strapi oldPrice
                rating: item.rating || 0,
                reviews: item.reviews || 0,
                badge: item.badge || null,
                image_url: imageUrl,
            };
        });
    //---------------------клоны------------------------
      if (products.length > 0) {
        
        // 💡 ГЕНЕРИРУЕМ 15 КЛОНОВ (ВНИМАНИЕ: это массив ID от 1 до 15)
        const cloneArray = Array.from({ length: 15 }, (_, i) => i + 1); 
        
        // Берем первый (единственный) товар как эталон
        const originalProduct = products[0]; 

        // Создаем новый массив с 15 клонами
        const finalProducts: Product[] = cloneArray.map(i => ({
            ...originalProduct, // Копируем все свойства
            id: originalProduct.id + i, // Меняем ID
            name: `${originalProduct.name} (Клон #${i})`, // Меняем название
        }));

        // Возвращаем новый, большой массив
        return finalProducts;
    }
    //-------------------------------клоны--------------------
    return products;
}


// 2. КОМПОНЕНТ СТРАНИЦЫ(посыльный) (Асинхронный)
export default async function ShopPage() { 
    let products: Product[] = [];
    let error: string | null = null;

    try {
        products = await getProducts();
    } catch (e: any) {
        // Мы используем console.error, чтобы видеть ошибку в терминале Next.js
        console.error("Ошибка при fetch данных:", e);
        error = e.message;
    }

    if (error) {
        return <div className="container mx-auto p-10 text-red-600">Ошибка: {error}</div>;
    }

    


    // 3. ОСНОВНОЙ JSX-РЕНДЕРИНГ
    return (
        <> 
            <ShopHeader /> 

            <main className="shop-page container mx-auto px-4">
                
                <nav aria-label="breadcrumb" className="breadcrumb text-sm text-gray-500 mb-5">
                    <a href="/">Главная</a> / <a href="/shop">Магазин</a> / <span>Товары для солярия</span>
                </nav>

                <h1 className="text-3xl font-bold border-b border-gray-200 pb-2 mb-5">Товары для солярия</h1>

                <div className="shop-grid">
                    
                    {/* 2.1. SIDEBAR */}
                    <ShopSidebar totalProductCount={products.length} /> {/* <-- Передаем общее количество товаров */}

                    {/* 2.2. CONTENT (Сетка товаров) */}
                    <section className="product-catalog">
                        <div className="sort-controls flex justify-between items-center py-2 border-t border-b border-gray-200 mb-5">
                            <p className="product-count text-sm">Показано 1–{products.length} из {products.length} результатов</p>
                            <select aria-label="Сортировка товаров" className="p-1 border border-gray-300">
                                <option>По популярности</option>
                            </select>
                        </div>

                        <div className="product-grid">
                            {products.map(product => (
                                <ProductCard 
                                    key={product.id} 
                                    product={product} 
                                />
                            ))}
                        </div>

                        <div className="pagination text-center pt-5">
                            <a href="#" className="page-num active">1</a>
                            <a href="#" className="page-num">2</a>
                        </div>
                    </section>
                </div>
            </main>

            <ShopFooter /> 
        </>
    );
}
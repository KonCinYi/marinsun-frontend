// src/components/ProductCard.tsx
'use client';
import React from 'react';
import { ProductCardProps } from '../types'; // Импорт типа (используем относительный путь для этого файла)

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    
    // 1. Форматирование данных
    const formattedPrice = product.price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 });
    const formattedOldPrice = product.old_price 
        ? product.old_price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 })
        : null;
    
    const stars = '⭐'.repeat(product.rating) + '☆'.repeat(5 - product.rating);

    // 2. JSX (разметка)
    return (
        <article className="product-card">
            <a href={`/product/${product.id}`} className="product-link">
                
                <div className="product-image-container">
                    <img src={product.image_url} alt={product.name} />
                    
                    {/* Условный рендеринг бэйджа */}
                    {product.badge && <span className={`badge ${product.badge === 'Новинка' ? 'new' : ''}`}>{product.badge}</span>}
                    
                    {/* Кнопка быстрого просмотра с остановкой всплытия */}
                    <button 
                        className="quick-view" 
                        onClick={(e) => { 
                            e.preventDefault(); 
                            e.stopPropagation(); 
                            alert(`Быстрый просмотр: ${product.name}`); 
                        }}
                    >
                        Быстрый просмотр
                    </button>
                </div>
                
                <div className="product-info">
                    <h3 className="product-title">{product.name}</h3>
                    
                    <div className="price-box">
                        {/* Условный рендеринг старой цены */}
                        {product.old_price && <span className="old-price">{formattedOldPrice}</span>}
                        <span className="product-price">{formattedPrice}</span>
                    </div>
                    
                    <div className="product-rating">{stars} ({product.reviews})</div>

                    <div className="product-actions">
                        <button className="btn btn-primary" onClick={(e) => { e.preventDefault(); e.stopPropagation(); alert(`"${product.name}" добавлен в корзину!`); }}>В корзину</button>
                        <button className="btn btn-secondary" onClick={(e) => { e.preventDefault(); e.stopPropagation(); alert('Оформление в кредит...'); }}>В кредит</button>
                    </div>
                </div>
            </a>
        </article>
    );
};
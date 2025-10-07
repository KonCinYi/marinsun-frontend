// src/components/ShopHeader.tsx

// Это Server Component, он не использует 'use client'
import React from 'react';

export const ShopHeader: React.FC = () => {
    return (
        <header className="main-header border-b border-gray-200 mb-5">
            <div className="header-top-bar container mx-auto flex justify-between items-center py-2 text-sm bg-gray-50 px-4">
                <nav className="main-nav">
                    <a href="#" className="mr-4">Оплата и доставка</a>
                    <a href="#">Контакты</a>
                </nav>
                <div className="header-actions">
                    <span>г. Армавир </span>
                    <a href="#">+7 (000) 000-00-00</a>
                </div>
            </div>

            <div className="header-main-bar container mx-auto flex justify-between items-center py-4 px-4">
                <div className="logo text-xl font-bold text-orange-500">MARINE SUN</div>
                <div className="search-form flex flex-grow max-w-lg mx-8 border border-gray-300">
                    <input type="text" placeholder="Поиск по товарам" className="border-none p-2 flex-grow outline-none" />
                    <button aria-label="Поиск" className="bg-orange-500 text-white p-2">🔍</button>
                </div>
                <div className="user-controls flex gap-4">
                    <a href="#" className="control-btn whitespace-nowrap">👤 Аккаунт</a>
                    <a href="#" className="control-btn whitespace-nowrap">🛒 Корзина (0)</a>
                </div>
            </div>
        </header>
    );
};
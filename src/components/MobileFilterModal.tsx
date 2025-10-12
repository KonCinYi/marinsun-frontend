'use client'; 

import React, { useState } from 'react';
import { ShopSidebar } from './ShopSidebar'; 
import { MobileFilterModalProps } from '../types'; // <-- Добавляем импорт из types

export const MobileFilterModal: React.FC<MobileFilterModalProps> = ({ totalProductCount, currentFilterCount }) => {
    
    const [isOpen, setIsOpen] = useState(false);
    
    // ... (handleApplyFilters, handleClose, toggleFilter) ...

    return (
        <>
            {/* 1. КНОПКА: Скрыта на десктопе, видна на мобильном */}
            <button 
                className="filter-toggle-button" 
                onClick={() => setIsOpen(true)}
            >
                Добавить фильтры
            </button>
            
            {/* 2. ДЕСКТОПНЫЙ ВИД / МОБИЛЬНЫЙ ОВЕРЛЕЙ */}
            {/* 💡 Этот DIV должен быть первым в shop-grid. CSS решает, как его показать. */}
            
            {/* На десктопе - обычный сайдбар. На мобильном - всплывает при клике */}
            <div className={`filter-sidebar-wrapper ${isOpen ? 'is-open' : ''}`}>
                
                {/* 💡 КНОПКА "КРЕСТИК" (Только на мобильном!) */}
                <div className="filter-modal-header">
                    {/* 💡 КРЕСТИК */}
                    <button 
                        className="close-btn" 
                        onClick={() => setIsOpen(false)}
                        aria-label="Закрыть фильтры" 
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                    <span className="filter-modal-title">Фильтры</span>
                </div>
                
                {/* 💡 ОСНОВНОЙ КОНТЕНТ САЙДБАРА */}
                <ShopSidebar totalProductCount={totalProductCount} />
                
                {/* 💡 КНОПКА ВНИЗУ (Только на мобильном!) */}
                <div className="filter-modal-footer">
                    <button className="apply-btn" onClick={() => setIsOpen(false) /* Здесь будет логика фильтрации */}>
                        Показать {currentFilterCount} результатов
                    </button>
                </div>
            </div>
        </>
    );
};
import React from 'react';

// Принимаем пропс с количеством товаров, чтобы sidebar не зависел от getProducts()
interface ShopSidebarProps {
    totalProductCount: number;
}

export const ShopSidebar: React.FC<ShopSidebarProps> = ({ totalProductCount }) => {
    return (
        <aside className="shop-sidebar">
            
            {/* Группа Категории */}
            <div className="filter-group">
                <h2>Категории</h2>
                <ul>
                    <li><a href="#" className="active">Все товары ({totalProductCount})</a></li>
                    <li><a href="#">Лампы (15)</a></li>
                    <li><a href="#">Косметика (18)</a></li>
                    <li><a href="#">Аксессуары (9)</a></li>
                </ul>
            </div>
            
            {/* Группа Цена (Исправленный JSX) */}
            <div className="filter-group">
                <h2>Фильтр по цене</h2>
                <div className="price-range">
                    <input type="number" defaultValue="100" />
                    <span>—</span>
                    <input type="number" defaultValue="5000" />
                    <button className="filter-btn">Фильтр</button>
                </div>
            </div>

            {/* Группа Бренды */}
            <div className="filter-group">
                <h2>Бренды</h2>
                <label className='block text-gray-700 text-sm mb-1'><input type="checkbox"/> TannyMaxx</label>
                <label className='block text-gray-700 text-sm mb-1'><input type="checkbox"/> Australian Gold</label>
                <label className='block text-gray-700 text-sm mb-1'><input type="checkbox"/> Devoted Creations</label>
            </div>
            
            {/* ... Добавь другие группы фильтров ... */}

        </aside>
    );
};
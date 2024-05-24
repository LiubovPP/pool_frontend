import React from 'react';
import { Product } from '../app/types';
import '../styles/Modals.css';

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, product }) => {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{product.title}</h2>
                <img src={product.imageUrl} alt={product.title} className="product-image-modal" />
                <p>Описание: {product.description}</p>
                <p>Цена: {product.price} руб.</p>
                <button onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
};

export default ProductModal;

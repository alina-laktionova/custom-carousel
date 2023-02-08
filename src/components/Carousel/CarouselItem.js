import React from 'react';
import "./CarouselItem.css";

const CarouselItem = ({item, isActive, width, onClickItem}) => {
    return (
        <div className="CarouselItem" style={{width: width}} onClick={onClickItem}>
            <div className={"item-wrapper" + (isActive ? " item-active" : "")}>
                <div className="item-content">{item}</div>
            </div>
        </div>
    );
};

export default CarouselItem;
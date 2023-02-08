import React, {useEffect, useState} from "react";
import {useSwipeable} from "react-swipeable";
import {useMediaQuery} from '@react-hook/media-query'
import CarouselItem from "./CarouselItem";
import "./Carousel.css";

const Carousel = ({items, itemsOnDesktop, itemsOnTablet, itemsOnMobile}) => {
    const [activePage, setActivePage] = useState(0)
    const [activeItem, setActiveItem] = useState(0)
    const [itemsOnPage, setItemsOnPage] = useState(1)
    const [pages, setPages] = useState(1)
    const isMobile = useMediaQuery('(max-width: 426px)')
    const isTablet = useMediaQuery('(max-width: 769px)')

    useEffect(() => {
        if (isMobile) {
            setItemsOnPage(itemsOnMobile)
            setPages(Math.ceil(items.length / itemsOnMobile))
        } else if (isTablet) {
            setItemsOnPage(itemsOnTablet)
            setPages(Math.ceil(items.length / itemsOnTablet))
        } else {
            setItemsOnPage(itemsOnDesktop)
            setPages(Math.ceil(items.length / itemsOnDesktop))
        }
        setActivePage(0)
    }, [isMobile, isTablet, itemsOnDesktop, itemsOnTablet, itemsOnMobile, items.length])

    const updatePage = (newIndex) => {
        if (newIndex < 0) {
            newIndex = pages - 1;
        } else if (newIndex >= pages) {
            newIndex = 0;
        }
        setActivePage(newIndex);
    };

    const handlers = useSwipeable({
        trackMouse: true,
        onSwipedLeft: () => updatePage(activePage + 1),
        onSwipedRight: () => updatePage(activePage - 1)
    });

    const onClickItem = (index) => {
        setActiveItem(index)
    }

    const getIndicators = () => {
        const indicators = []
        for (let i = 0; i < pages; i++) {
            indicators.push(
                <button
                    key={i}
                    className={`indicator-btn ${i === activePage ? "indicator-btn-active" : ""}`}
                    onClick={() => {
                        updatePage(i);
                    }}
                />
            )
        }
        return indicators;
    }

    const getCarouselTranslateX = () => {
        return (activePage === pages - 1 && items.length % itemsOnPage !== 0) ?
            (activePage * 100 - ((itemsOnPage - items.length % itemsOnPage) * 100 / itemsOnPage)) :
            (activePage * 100)
    }

    return (
        <div className="carousel-wrapper">
            <div {...handlers} className="carousel">
                <div
                    className="inner"
                    style={{
                        transform:
                            `translateX(-${getCarouselTranslateX()}%)`
                    }}
                >
                    {items.map((item, index) =>
                        <CarouselItem
                            key={index}
                            onClickItem={() => onClickItem(index)}
                            item={item}
                            isActive={activeItem === index}
                            width={`${100 / itemsOnPage}%`}
                        />
                    )}
                </div>

                <div className="indicators">
                    {getIndicators()}
                </div>
            </div>

            <button className={"nav-btn nav-btn-prev " + (activePage === 0 ? "display-none" : "")}
                    onClick={() => {
                        updatePage(activePage - 1);
                    }}
            >
                <span className="arrow arrow-prev"/>
            </button>
            <button className={"nav-btn nav-btn-next " + (activePage === pages-1 ? "display-none" : "")}
                    onClick={() => {
                        updatePage(activePage + 1);
                    }}
            >
                <span className="arrow arrow-next"/>
            </button>
        </div>
    );
};

export default Carousel;

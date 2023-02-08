import './App.css';
import Carousel from "./components/Carousel/Carousel";
import imagePlaceholder from "./components/Carousel/image-placeholder.png"

function App() {

    const getDummyItems = (number) => {
        const items = []
        for (let i = 0; i < number; i++) {
            items.push(
                <div key={i} className="item-example">
                    <img src={imagePlaceholder} alt='placeholder' width={85} height={85}/>
                    <p>Item {i + 1}</p>
                </div>
            )
        }
        return items
    }

    return (
        <div className="App">
            <Carousel itemsOnDesktop={7} itemsOnTablet={4} itemsOnMobile={2} items={getDummyItems(20)}/>
        </div>
    );
}

export default App;

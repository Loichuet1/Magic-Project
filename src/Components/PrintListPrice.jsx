import { useEffect, useState } from "react";
import { objectToArray } from "../utils/Utils";
import { currencyStringToSymbols } from "../utils/Utils";
import CardMarketPlace from "./CardMarketPlace";
import { GetPrintList } from "../Services/ScryfallService";
import LoadingScreen from "./LoadingScreen";
import { EcardFaceType } from "../enums/ECardFaceType";

export default function PrintListPrice({ printUri, faceType }) {

    const [hover, setHover] = useState(false);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const [printList, setPrintList] = useState(null);

    useEffect(() => {

        const fetchPrintList = async () => {

            try {
                const list = await GetPrintList(printUri);
                setPrintList(list);
            } catch (error) {
                console.log(error);
            }
        };
        fetchPrintList();

    }, [printUri])

    const handleHover = (card, hoverState) => {

        if (!card) {
            setHoveredCard(null);
            return;
        }

        setHover(hoverState);
        setHoveredCard(card);
    };

    const handleMouseMove = (e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (!printList) return <LoadingScreen loadingTitle={"Loading List of print ..."} />

    return (

        <section className="printListSection" onMouseMove={handleMouseMove}>

            {printList && printList.length > 0 ? (
                printList.map(card => (
                    <div className="cardPriceSection" key={card.id}>
                        <div className='cardPriceHeader'>
                            <img className="setIcon" src={card.setData.icon_svg_uri} alt="set image" />
                            <h2>{card.setData.name}</h2>
                        </div>

                        <div className="cardPriceList">

                            <div
                                className="printItem"
                                onMouseEnter={() => handleHover(card, true)}
                                onMouseLeave={() => handleHover(null, false)}
                            >

                                <img className="set" src={card.setData.icon_svg_uri} alt="set image" />

                                {objectToArray(card.prices).map((price, index) => (

                                    price.value && (
                                        <p key={index} className="cardPrice" >{`${price.value}  ${currencyStringToSymbols(price.key)}`}</p>
                                    )
                                ))}
                            </div>
                            <CardMarketPlace marketPlaces={card.purchase_uris} />

                        </div>

                    </div>
                ))
            ) : (
                <p>No printings available for this card.</p>
            )}

            {hover && hoveredCard && (
                <img
                    src={faceType === EcardFaceType.DOUBLE_FACED ? hoveredCard?.card_faces[0]?.image_uris.normal : hoveredCard?.image_uris?.normal}
                    alt="hoveredCard"
                    className="hoveredCard"
                    style={{
                        left: mousePosition.x,
                        top: mousePosition.y - 300,
                    }}
                />
            )}
        </section>
    )
}
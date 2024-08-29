import { useParams } from "react-router";
import { GetCardDetails, GetPrintList } from "../Services/ScryfallService";
import { useState, useEffect } from "react";
import LoadingScreen from '../Components/LoadingScreen';
import Navbar from "../Components/Navbar";
import CardLegality from "../Components/CardLegality";
import { GetCardByName } from "../Services/MagicCardService";
import { CardDetailInfoSection, DoubleSidedCardDetailInfoSection, DoubleArtCardDetailInfoSection } from "../Components/CardDetailInfoSection";
import CardMarketPlace from "../Components/CardMarketPlace";
import PrintListPrice from "../Components/PrintListPrice";
import { EcardFaceType } from "../enums/ECardFaceType";
import '../SCSS_File/cardDetailsStyle.scss'


export default function CardDetails() {

    const { cardName } = useParams();

    // Scryfall
    const [cardDetail, setCardDetail] = useState(null);

    // Magic 
    const [card, setcard] = useState(null);

    // if the card is double faced
    const [cardFaceType, setCardFaceType] = useState(EcardFaceType.SIMPLE);

    const [error, setError] = useState({ status: null, message: null });


    // use Scryfall API to retrieve card details
    useEffect(() => {

        // reset error state
        setError({ status: null, message: null });

        const fetchCardDetails = async () => {

            try {

                const detail = await GetCardDetails(cardName);
                setCardDetail(detail);

                // set card Face type
                if (detail?.card_faces?.length > 1 && detail?.image_uris) {
                    setCardFaceType(EcardFaceType.DOUBLE_ART);
                }
                else if (detail?.card_faces?.length > 1) {
                    setCardFaceType(EcardFaceType.DOUBLE_FACED);
                }
                else {
                    setCardFaceType(EcardFaceType.SIMPLE);
                }

            } catch (error) {
                console.log(error);
                setError({ status: error.status, message: error.message })
            }
        };

        fetchCardDetails();

    }, [cardName]);


    // use magic API to retrieve the cardData used in deckBuilder
    useEffect(() => {
        if (!cardDetail) { return; };

        // reset error state
        setError({ status: null, message: null });

        const fetchCardData = async () => {

            try {
                const cardData = await GetCardByName(cardDetail.name);
                setcard(cardData)

            } catch (error) {
                console.log(error);
                setError({ status: error.status, message: error.message })
            }
        };

        fetchCardData();

    }, [cardDetail])

    const renderCardInfoByFaceType = (faceType) => {
        switch (faceType) {
            case EcardFaceType.SIMPLE:
            default:
                return (<CardDetailInfoSection cardData={{ cardDetail: cardDetail, card: card }} />);
            case EcardFaceType.DOUBLE_FACED:
                return (<DoubleSidedCardDetailInfoSection cardData={{ cardDetail: cardDetail, card: card }} />);
            case EcardFaceType.DOUBLE_ART:
                return (<DoubleArtCardDetailInfoSection cardData={{ cardDetail: cardDetail, card: card }} />);
        }
    };

    if (error.status) { return <p>{error.message}</p> };

    if (!cardDetail || !card) { return <LoadingScreen loadingTitle={"Loading card details ..."} /> };

    return (
        <div>
            <Navbar />

            < section className="cardDetailBody" >
                <div className="cardDetail">

                    {renderCardInfoByFaceType(cardFaceType)}

                    <section className="legality_marketPlaceSection">
                        <CardLegality legalities={cardDetail.legalities} />

                        <CardMarketPlace marketPlaces={cardDetail.purchase_uris} />
                    </section>

                </div>

                {cardDetail && !cardDetail.type_line.includes("Basic Land") ?

                    <PrintListPrice printUri={cardDetail.prints_search_uri} faceType={cardFaceType} />
                    :
                    <p>No printings available for this card.</p>
                }
            </section >
        </div>
    )
};
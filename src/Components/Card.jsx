import { GetCardNameBylanguage, GetImageByLanguage } from "./CardLocalizer"
import { Link } from 'react-router-dom';
import AddCartToDeck from './AddToDeck';
import useCardAvailability from './usecardAvailability';
import { cleanCardName } from '../utils/Utils';

function CreateCard({ card, deckBuilder }) {

    const { getCardLimit, addCardToDeck, removedCardFromDeck } = deckBuilder;

    // custom hook to manage card availability
    const { available, countInDeck } = useCardAvailability({ card, deckBuilder });

    return (
        <div className={available ? "flexboxCard" : "flexboxCardNotAvailable"}>

            <Link to={`/cardDetails/${cleanCardName(card.name)}`}>
                <img src={GetImageByLanguage("eng", card)} alt="image card"></img>
            </Link>

            <div className="flexBoxCardElements">
                <p>{GetCardNameBylanguage("eng", card)}</p>

                <AddCartToDeck addCallback={addCardToDeck} removeCallback={removedCardFromDeck} cardLimit={getCardLimit} countInDeck={countInDeck} card={card} />

            </div>
        </div>
    )
}

export default CreateCard;


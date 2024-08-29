import { useContext } from "react"
import { ManagerContext } from "../main"
import Search from '../Components/SearchComponent';
import DisplayCards from '../Components/CardsDisplay';
import DisplayDeck from '../Components/DeckDisplay/DisplayDeck';

export default function Home() {

    const { cardLoader, deckBuilder } = useContext(ManagerContext);

    return (
        <section>

            <Search cardLoader={cardLoader} />

            <DisplayDeck
                deckBuilder={deckBuilder}
            />
            <DisplayCards
                cardLoader={cardLoader}
                deckBuilder={deckBuilder}
            />
        </section>
    )
};
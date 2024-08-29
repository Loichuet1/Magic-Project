
export default function AddCartToDeck({ addCallback, removeCallback, cardLimit, countInDeck, card }) {

    return (
        <section className='cardCountSection'>

            <button
                onClick={() => (removeCallback(card))}
                disabled={countInDeck <= 0}>
                -
            </button>

            <p>{`${countInDeck} / ${cardLimit(card)} `}</p>
            <button
                onClick={() => (addCallback(card))}
                disabled={countInDeck >= cardLimit(card)} >
                +
            </button>

        </section>
    )
}
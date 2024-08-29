import CreateCard from './Card';
import LoadingScreen from './LoadingScreen';

import '../SCSS_File/cardCatalogDisplay.scss';

export default function DisplayCards({ cardLoader, deckBuilder }) {

    const { cards, loading, pages, error, setPageToDisplay } = cardLoader;

    if (error.status) return <p> {error.message}</p>

    if (loading || !cards) return <LoadingScreen loadingTitle={"Loading card list ..."} />

    return (
        <div>

            <div className='flexbox'>
                {cards && (cards.map((c, index) =>
                    <CreateCard
                        key={index}
                        card={c}
                        deckBuilder={deckBuilder}
                    />))}
            </div >
            <div className='pagination'>
                {!loading ? (
                    <>
                        {pages && (
                            <>
                                {pages.currentPage > 1 && (
                                    <svg onClick={() => setPageToDisplay(pages.currentPage - 1)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="pageArrow">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                    </svg>
                                )}

                                <p>{pages.nextPage === 1 ? 1 : pages.currentPage} / {pages.lastPage} </p>
                                {pages.currentPage < pages.lastPage && (
                                    <svg onClick={() => setPageToDisplay(pages.nextPage)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="pageArrow">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>
                                )}
                            </>
                        )}
                    </>
                ) :
                    (<p></p>)}
            </div>
        </div>
    );
};


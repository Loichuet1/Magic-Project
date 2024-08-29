import { EMarketPlace } from "../enums/EMarketPlace"
import { objectToArray } from "../utils/Utils"

export default function CardMarketPlace({ marketPlaces }) {

    const openInNewTab = (uri) => {

        if (!uri) { return; };

        window.open(uri, '_blank');
    };

    return (
        <section className="marketPlaceSection">

            {objectToArray(marketPlaces).map((marketPlace, index) => (
                <img
                    key={index}
                    className="marketPlace"
                    onClick={() => openInNewTab(marketPlace.value)}
                    src={EMarketPlace[marketPlace.key]}
                    alt={"marketPlace.value"} />
            ))}

        </section>
    )
};
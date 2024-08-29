import { objectToArray } from "../utils/Utils";

export default function CardLegality({ legalities }) {

    return (
        <section className="legalitySection" >
            {objectToArray(legalities).map((legality, index) => (
                <div key={index} className="legalityItem">
                    <p className="legalIcon" style={{ backgroundColor: legality.value === 'legal' ? 'green' : 'red' }}>{legality.value}</p>
                    <p className="set">{legality.key}</p>
                </div>
            ))}
        </section>
    )
};
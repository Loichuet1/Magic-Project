
export default function LoadingScreen({ loadingTitle }) {

    return (
        <section className="loadingSection">
            <img src={"https://www.icegif.com/wp-content/uploads/2023/07/icegif-1263.gif"} alt="LoadingGif" className="loadingImage" />
            <p className="loadingTitle">{loadingTitle}</p>
        </section>
    )
};


export function GetCardNameBylanguage(language, card) {
    switch (language) {
        case "eng":
            return card.name
        case "fr":
            const frenchcard = card.foreignNames ? card.foreignNames.find(l => l.language === "French") : card;
            const name = frenchcard ? frenchcard.name : card.name;
            return name;
    }
}


export function GetImageByLanguage(language, card) {

    switch (language) {
        case "eng":
            return card.imageUrl
        case "fr":
            const frenchcard = card.foreignNames ? card.foreignNames.find(l => l.language === "French") : card;
            const imageUrl = frenchcard ? frenchcard.imageUrl : card.imageUrl;
            return imageUrl;
    }
}
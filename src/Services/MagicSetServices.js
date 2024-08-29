const apiUrl = import.meta.env.VITE_MAGIC_API_URL;
const endpoint = "/sets";
const querry = "?type=expansion|commander|Archenemy|core|planechase|draft_innovation";

export async function GetSets() {

    try {
        const result = await fetch(apiUrl + endpoint + querry);
        const data = await result.json();

        return data;

    } catch (error) {
        console.log(error);
    }
};

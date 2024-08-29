import CustomError from "./Error";

// Utility function to introduce a delay
export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

// Utility function to handle fetch with retry logic
export async function fetchWithRetry(url, retryLimit, retryDelay) {
    let attempts = 0;

    while (attempts < retryLimit) {
        try {
            const response = await fetch(url);

            if (response.status === 429) { // Rate limit exceeded
                console.log(`Rate limit exceeded. Attempt ${attempts + 1} of ${retryLimit}`);
                attempts += 1;
                if (attempts < retryLimit) {
                    await delay(retryDelay);
                    continue; // Retry after delay
                } else {
                    throw new CustomError(response.status, "Rate limit exceeded. Please try again later");
                }
            }

            if (!response.ok) {
                throw new CustomError(response.status, `Error fetching data: ${response.status} ${response.statusText}`);
            }

            return response; // Successful response, return it to the caller

        } catch (error) {
            if (attempts >= retryLimit) {
                throw error; // Rethrow after reaching retry limit
            }
            attempts += 1;
        }
    }
};


// Function to fetch set details with a delay
export async function fetchWithDelay(uri, delayTime, callback) {
    await delay(delayTime);
    return callback(uri);
};

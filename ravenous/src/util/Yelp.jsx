const apiKey = 'REDACTED';


const Yelp = {
    async search(term, location, sortBy){

        const corsAnywhereURL = "https://cors-anywhere.herokuapp.com/";
        const endpoint = `https://api.yelp.com/v3/businesses/search?term=${encodeURIComponent(term)}&location=${encodeURIComponent(location)}&sort_by=${encodeURIComponent(sortBy)}`;
        try{
            const response = await fetch(corsAnywhereURL + endpoint, {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                }
            });
            return response.json()
            .then(
                jsonReponse => {
                if (jsonReponse.businesses !== null && Array.isArray(jsonReponse.businesses)){
                    const newBusinesses = jsonReponse.businesses.map((business) => 
                        business = {
                            id: business.id,
                            imageSrc: business.image_url,
                            name: business.name,
                            address: business.location?.address1,
                            city: business.location?.city,
                            state: business.location?.state,
                            zipCode: business.location?.zip_code,
                            category: business.categories?.[0]?.title || "",
                            rating: business.rating,
                            reviewCount: business.review_count
                        }
                    )
                    return newBusinesses;
                } else {
                    // Returns empty array if businesses either doesn't exist or is not an array.
                    return [];
                }}
            )
        } catch (e) {
            console.log(e);
            return [];
        }
    }
    
    

};

export default Yelp;
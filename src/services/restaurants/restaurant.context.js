import React, { useState, useEffect, createContext } from 'react'
import { restaurantsRequest } from './restaurant.service'
import camelize from 'camelize'
export const RestaurantContext = createContext()

export const RestaurantContextProvider = ({ children }) => {

    const [restaurants, setRestaurants] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const retriveRestaurant = () => {
        setIsLoading(true)
        // restaurantsRequest()
        restaurantsRequest().then(result => {
            // console.log("result", camelize(result));
            const resArr = camelize(result)
            const mappedResult = resArr.results.map((restaurant, index) => {
                return {
                    ...restaurant,
                    isOpenNow: restaurant.openingHours && restaurant.openingHours.openNow,
                    isClosedTemporarily: restaurant.businessStatus === 'ClOSED_TEMPORARILY'
                }
            })
            // console.log("mappedResult", mappedResult);
            setRestaurants(mappedResult)
            setIsLoading(false)

        }).catch(err => {
            console.log("err in rest req", err);
            setError(err)
            setIsLoading(false)
        });

    }


    useEffect(() => {
        retriveRestaurant()
    }, [])




    return (
        <RestaurantContext.Provider value={{
            restaurants, isLoading, error
        }}>
            {children}
        </RestaurantContext.Provider>
    )
}


// export default RestaurantContext
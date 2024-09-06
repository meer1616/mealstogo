import React, { createContext, useEffect, useState } from 'react'
import { locationRequest, locationTransform } from './location.service'

export const LocationContext = createContext()

export const LocationContextProvider = ({ children }) => {
    const [location, setLocation] = useState(null)
    const [keyword, setKeyword] = useState("san francisco")
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const onSearch = (searchKeyword = "antwerp") => {
        setIsLoading(true)
        setKeyword(searchKeyword)
        locationRequest(searchKeyword.toLowerCase())
            .then(locationTransform).then(result => {
                setIsLoading(true)
                setLocation(result)
                console.log("result", result)
            }).catch((err) => {
                setIsLoading(false)
                setError(err)
            })
    }
    useEffect(() => {
        onSearch()
    }, [])




    return (
        <LocationContext.Provider value={{}}>
            {children}
        </LocationContext.Provider>
    )
}

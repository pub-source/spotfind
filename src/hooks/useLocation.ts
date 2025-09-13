"use client"

import { useState } from "react"

interface LocationState {
  latitude: number | null
  longitude: number | null
  error: string | null
  loading: boolean
}

export const useLocation = () => {
  const [location, setLocation] = useState<LocationState>({
    latitude: null,
    longitude: null,
    error: null,
    loading: false,
  })

  const getCurrentLocation = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by this browser."))
        return
      }

      setLocation((prev) => ({ ...prev, loading: true, error: null }))

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
            loading: false,
          })
          resolve(position)
        },
        (error) => {
          let errorMessage = "Unable to retrieve your location"
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Location access denied by user"
              break
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Location information is unavailable"
              break
            case error.TIMEOUT:
              errorMessage = "Location request timed out"
              break
          }
          setLocation((prev) => ({ ...prev, error: errorMessage, loading: false }))
          reject(error)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        },
      )
    })
  }

  const openGoogleMaps = (destinationLat: number, destinationLng: number, placeName?: string) => {
    if (location.latitude && location.longitude) {
      const url = `https://www.google.com/maps/dir/${location.latitude},${location.longitude}/${destinationLat},${destinationLng}`
      window.open(url, "_blank")
    } else {
      // Fallback to just showing the destination
      const url = `https://www.google.com/maps/search/${placeName || `${destinationLat},${destinationLng}`}`
      window.open(url, "_blank")
    }
  }

  const openAppleMaps = (destinationLat: number, destinationLng: number, placeName?: string) => {
    if (location.latitude && location.longitude) {
      const url = `http://maps.apple.com/?saddr=${location.latitude},${location.longitude}&daddr=${destinationLat},${destinationLng}`
      window.open(url, "_blank")
    } else {
      const url = `http://maps.apple.com/?q=${placeName || `${destinationLat},${destinationLng}`}`
      window.open(url, "_blank")
    }
  }

  return {
    ...location,
    getCurrentLocation,
    openGoogleMaps,
    openAppleMaps,
  }
}

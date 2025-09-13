"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Navigation, Map, History, Mail, MapPin, ExternalLink, Loader2, AlertCircle } from "lucide-react"
import { useLocation } from "@/hooks/useLocation"
import { useToast } from "@/hooks/use-toast"

interface ActionModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  location: {
    lat: number
    lng: number
    name: string
    address?: string
  }
  type: "tourist" | "accommodation" | "cafe"
  inquireEmail?: string
  wikiUrl?: string
}

export function ActionModal({ isOpen, onClose, title, location, type, inquireEmail, wikiUrl }: ActionModalProps) {
  const { getCurrentLocation, openGoogleMaps, openAppleMaps, loading, error } = useLocation()
  const { toast } = useToast()
  const [routeLoading, setRouteLoading] = useState(false)

  const handleRoute = async () => {
    setRouteLoading(true)
    try {
      await getCurrentLocation()
      // Open Google Maps with directions
      openGoogleMaps(location.lat, location.lng, location.name)
      toast({
        title: "Opening directions",
        description: "Google Maps will open with route to your destination",
      })
    } catch (error) {
      toast({
        title: "Location access required",
        description: "Please allow location access to get accurate directions",
        variant: "destructive",
      })
    } finally {
      setRouteLoading(false)
    }
  }

  const handleMap = () => {
    // Open Google Maps directly to the location
    const url = `https://www.google.com/maps/search/${location.name}+${location.address || ""}/@${location.lat},${location.lng},15z`
    window.open(url, "_blank")
    toast({
      title: "Opening map",
      description: "Google Maps will show the location",
    })
  }

  const handleHistory = () => {
    if (wikiUrl) {
      window.open(wikiUrl, "_blank")
    } else {
      // Generate Wikipedia search URL
      const searchQuery = location.name.replace(/\s+/g, "_")
      const url = `https://en.wikipedia.org/wiki/${searchQuery}`
      window.open(url, "_blank")
    }
    toast({
      title: "Opening history",
      description: "Wikipedia page will open with historical information",
    })
  }

  const handleInquire = () => {
    if (inquireEmail) {
      const subject = encodeURIComponent(`Inquiry about ${location.name}`)
      const body = encodeURIComponent(
        `Hello,\n\nI would like to inquire about ${location.name} located at ${location.address || "your location"}.\n\nThank you!`,
      )
      const mailtoUrl = `mailto:${inquireEmail}?subject=${subject}&body=${body}`
      window.open(mailtoUrl)
      toast({
        title: "Opening email",
        description: "Your email client will open with a pre-filled inquiry",
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            <p className="font-medium">{location.name}</p>
            {location.address && <p>{location.address}</p>}
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-md text-sm">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 gap-3">
            {/* Route Button */}
            <Button
              onClick={handleRoute}
              disabled={routeLoading || loading}
              className="flex items-center justify-center gap-2 h-12"
            >
              {routeLoading || loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Navigation className="h-4 w-4" />
              )}
              Get Route from Current Location
            </Button>

            {/* Map Button */}
            <Button
              variant="outline"
              onClick={handleMap}
              className="flex items-center justify-center gap-2 h-12 bg-transparent"
            >
              <Map className="h-4 w-4" />
              View on Map
              <ExternalLink className="h-3 w-3" />
            </Button>

            {/* History Button */}
            <Button
              variant="outline"
              onClick={handleHistory}
              className="flex items-center justify-center gap-2 h-12 bg-transparent"
            >
              <History className="h-4 w-4" />
              View History
              <ExternalLink className="h-3 w-3" />
            </Button>

            {/* Inquire Button (only for accommodations) */}
            {type === "accommodation" && inquireEmail && (
              <Button
                variant="outline"
                onClick={handleInquire}
                className="flex items-center justify-center gap-2 h-12 bg-transparent"
              >
                <Mail className="h-4 w-4" />
                Send Inquiry
                <ExternalLink className="h-3 w-3" />
              </Button>
            )}
          </div>

          <div className="text-xs text-muted-foreground text-center">
            Route requires location permission for accurate directions
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

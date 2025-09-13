"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLocation } from "@/hooks/useLocation"
import { useToast } from "@/hooks/use-toast"
import { MapPin, Clock, DollarSign, Star, Coffee, Navigation, ExternalLink, Loader2 } from "lucide-react"

export default function CafeShop() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [distanceFilter, setDistanceFilter] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [directionsLoading, setDirectionsLoading] = useState<number | null>(null)

  const { getCurrentLocation, openGoogleMaps, loading, error } = useLocation()
  const { toast } = useToast()

  const cafes = [
    {
      id: 1,
      name: "The Coffee Bean",
      description: "Cozy coffee shop with amazing pastries and specialty drinks",
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500&h=300&fit=crop",
      rating: 4.8,
      price: "₱150-300",
      location: "Poblacion, Makati",
      distance: "2.1 km",
      openHours: "6:00 AM - 10:00 PM",
      amenities: ["Free WiFi", "Parking", "AC", "Pet Friendly"],
      category: "coffee",
      priceLevel: "medium",
      coordinates: { lat: 14.5547, lng: 121.0244 },
      website: "https://thecoffeebean.com.ph",
      shopUrl: "https://thecoffeebean.com.ph/locations/poblacion",
    },
    {
      id: 2,
      name: "Brew & Bites",
      description: "Artisan coffee with freshly baked goods and light meals",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&h=300&fit=crop",
      rating: 4.6,
      price: "₱100-250",
      location: "BGC, Taguig",
      distance: "5.3 km",
      openHours: "7:00 AM - 9:00 PM",
      amenities: ["Free WiFi", "AC", "Takeout"],
      category: "bakery",
      priceLevel: "low",
      coordinates: { lat: 14.5515, lng: 121.0473 },
      website: "https://brewandbites.ph",
      shopUrl: "https://brewandbites.ph/bgc-branch",
    },
    {
      id: 3,
      name: "Rooftop Café",
      description: "Sky-high views with premium coffee blends and cocktails",
      image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=500&h=300&fit=crop",
      rating: 4.9,
      price: "₱200-500",
      location: "Ortigas, Pasig",
      distance: "8.7 km",
      openHours: "10:00 AM - 12:00 AM",
      amenities: ["Free WiFi", "Rooftop", "Bar", "Events"],
      category: "restaurant",
      priceLevel: "high",
      coordinates: { lat: 14.5866, lng: 121.0611 },
      website: "https://rooftopcafe.ph",
      shopUrl: "https://rooftopcafe.ph/ortigas",
    },
    {
      id: 4,
      name: "Local Grind",
      description: "Supporting local farmers with ethically sourced coffee beans",
      image: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=500&h=300&fit=crop",
      rating: 4.7,
      price: "₱120-280",
      location: "Quezon City",
      distance: "12.4 km",
      openHours: "6:30 AM - 8:00 PM",
      amenities: ["Free WiFi", "Organic", "Study Area"],
      category: "coffee",
      priceLevel: "medium",
      coordinates: { lat: 14.676, lng: 121.0437 },
      website: "https://localgrind.ph",
      shopUrl: "https://localgrind.ph/qc-branch",
    },
  ]

  const filteredCafes = cafes.filter((cafe) => {
    const matchesSearch =
      cafe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cafe.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedFilter === "all" || cafe.category === selectedFilter
    const matchesDistance =
      distanceFilter === "all" ||
      (distanceFilter === "5km" && Number.parseFloat(cafe.distance) <= 5) ||
      (distanceFilter === "10km" && Number.parseFloat(cafe.distance) <= 10)
    const matchesPrice = priceRange === "all" || cafe.priceLevel === priceRange

    return matchesSearch && matchesCategory && matchesDistance && matchesPrice
  })

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600"
    if (rating >= 4.0) return "text-yellow-600"
    return "text-orange-600"
  }

  const handleDirections = async (cafe: any) => {
    setDirectionsLoading(cafe.id)
    try {
      await getCurrentLocation()
      openGoogleMaps(cafe.coordinates.lat, cafe.coordinates.lng, cafe.name)
      toast({
        title: "Opening directions",
        description: `Getting route to ${cafe.name}`,
      })
    } catch (error) {
      toast({
        title: "Location access required",
        description: "Please allow location access to get accurate directions",
        variant: "destructive",
      })
    } finally {
      setDirectionsLoading(null)
    }
  }

  const handleViewDetails = (cafe: any) => {
    if (cafe.shopUrl) {
      window.open(cafe.shopUrl, "_blank")
      toast({
        title: "Opening shop page",
        description: `Viewing details for ${cafe.name}`,
      })
    } else if (cafe.website) {
      window.open(cafe.website, "_blank")
      toast({
        title: "Opening website",
        description: `Viewing ${cafe.name} website`,
      })
    } else {
      toast({
        title: "Shop details",
        description: "Contact the shop directly for more information",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Cafe & Coffee Shops
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover the best coffee spots, cozy cafes, and delicious treats around you
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Coffee className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input
              placeholder="Search for cafes, coffee shops, bakeries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-14 text-lg bg-white/80 backdrop-blur-sm border-0 shadow-elegant focus:shadow-glow transition-all duration-300"
            />
          </div>

          {/* Filter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Distance</label>
              <Select value={distanceFilter} onValueChange={setDistanceFilter}>
                <SelectTrigger className="h-12 bg-white/80 backdrop-blur-sm border-0 shadow-card">
                  <SelectValue placeholder="Select distance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Distance</SelectItem>
                  <SelectItem value="5km">Within 5km</SelectItem>
                  <SelectItem value="10km">Within 10km</SelectItem>
                  <SelectItem value="15km">Within 15km</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Category</label>
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="h-12 bg-white/80 backdrop-blur-sm border-0 shadow-card">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="coffee">Coffee Shops</SelectItem>
                  <SelectItem value="bakery">Bakery & Pastry</SelectItem>
                  <SelectItem value="restaurant">Cafe Restaurant</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Price Range</label>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="h-12 bg-white/80 backdrop-blur-sm border-0 shadow-card">
                  <SelectValue placeholder="Select price range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Price</SelectItem>
                  <SelectItem value="low">Budget (₱100-200)</SelectItem>
                  <SelectItem value="medium">Mid-range (₱200-350)</SelectItem>
                  <SelectItem value="high">Premium (₱350+)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Found {filteredCafes.length} cafe{filteredCafes.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Cafe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCafes.map((cafe, index) => (
            <Card
              key={cafe.id}
              className="overflow-hidden hover:shadow-travel transition-all duration-300 hover:-translate-y-1 group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={cafe.image || "/placeholder.svg"}
                  alt={cafe.name}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{cafe.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className={`h-4 w-4 ${getRatingColor(cafe.rating)} fill-current`} />
                    <span className={`text-sm font-medium ${getRatingColor(cafe.rating)}`}>{cafe.rating}</span>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{cafe.description}</p>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {cafe.location} • {cafe.distance}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{cafe.openHours}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    <span className="font-medium">{cafe.price}</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {cafe.amenities.slice(0, 3).map((amenity, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button className="flex-1 hover:shadow-glow transition-all" onClick={() => handleViewDetails(cafe)}>
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 hover:bg-primary hover:text-primary-foreground transition-all bg-transparent"
                    onClick={() => handleDirections(cafe)}
                    disabled={directionsLoading === cafe.id || loading}
                  >
                    {directionsLoading === cafe.id || loading ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-1" />
                    ) : (
                      <Navigation className="h-4 w-4 mr-1" />
                    )}
                    Directions
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCafes.length === 0 && (
          <div className="text-center py-12">
            <Coffee className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No cafes found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MapPin, 
  Star, 
  Users, 
  DollarSign, 
  Wifi, 
  Car, 
  Coffee,
  Heart,
  Eye,
  Bed
} from "lucide-react";

export default function Accommodations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const accommodationTypes = ["all", "hotel", "resort", "hostel", "apartment", "guesthouse"];

  const accommodations = [
  // 🏨 HOTELS
  {
    id: 1,
    name: "Splash Mountain Hotel",
    description: "Hotel with hot spring pools, waterpark facilities, and spa services.",
    type: "hotel",
    rating: 4.5,
    reviews: 320,
    price: 60,
    capacity: 3,
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Hot_Spring_Resort_in_Los_Banos.jpg",
    amenities: ["Wifi", "Hot Spring Pools", "Spa", "Waterpark", "Restaurant"],
    location: "Los Baños, Laguna"
  },
  {
    id: 2,
    name: "81 Hotel Calamba",
    description: "Modern budget hotel with clean rooms and accessible location.",
    type: "hotel",
    rating: 4.2,
    reviews: 200,
    price: 35,
    capacity: 2,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
    amenities: ["Wifi", "Air Conditioning", "Parking", "Room Service"],
    location: "Calamba, Laguna"
  },
  {
    id: 3,
    name: "Sol Y Viento Mountain Hot Springs Resort",
    description: "Hotel with panoramic mountain views and therapeutic hot springs.",
    type: "hotel",
    rating: 4.6,
    reviews: 250,
    price: 75,
    capacity: 4,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop",
    amenities: ["Wifi", "Hot Spring Pools", "Spa", "Restaurant", "Scenic Views"],
    location: "Pansol, Laguna"
  },
  {
    id: 4,
    name: "Makiling Heights Hotel",
    description: "Simple hotel with a scenic location near Mt. Makiling trails.",
    type: "hotel",
    rating: 4.3,
    reviews: 150,
    price: 40,
    capacity: 2,
    image: "https://images.unsplash.com/photo-1501117716987-c8bd7c870023?w=400&h=300&fit=crop",
    amenities: ["Wifi", "Nature Views", "Parking", "Restaurant"],
    location: "Los Baños, Laguna"
  },
  {
    id: 5,
    name: "Trace Suites Hotel",
    description: "Hotel and convention center with swimming pool and large event halls.",
    type: "hotel",
    rating: 4.4,
    reviews: 210,
    price: 55,
    capacity: 4,
    image: "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=400&h=300&fit=crop",
    amenities: ["Wifi", "Pool", "Event Halls", "Restaurant", "Parking"],
    location: "Los Baños, Laguna"
  },

  // 🏝 RESORTS
  {
    id: 6,
    name: "Villa Escudero Plantations & Resort",
    description: "World-famous resort with a waterfall restaurant and cultural showcases.",
    type: "resort",
    rating: 4.9,
    reviews: 500,
    price: 120,
    capacity: 4,
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Villa_Escudero_Waterfalls_Restaurant.jpg",
    amenities: ["Waterfall Restaurant", "Cultural Shows", "Pools", "Museum"],
    location: "Tiaong, near Laguna"
  },
  {
    id: 7,
    name: "Caliraya Resort Club",
    description: "Adventure resort with ziplines, boating, and lakeside fun.",
    type: "resort",
    rating: 4.7,
    reviews: 350,
    price: 90,
    capacity: 5,
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Caliraya_Lake_Spillway.JPG",
    amenities: ["Wifi", "Zipline", "Boating", "Adventure Park", "Restaurant"],
    location: "Lumban, Laguna"
  },
  {
    id: 8,
    name: "Rockpoint Hotspring Resort Hotel",
    description: "Hot spring resort with pools, spa, and conference facilities.",
    type: "resort",
    rating: 4.4,
    reviews: 180,
    price: 70,
    capacity: 3,
    image: "https://images.unsplash.com/photo-1601918774946-25832a4be0d1?w=400&h=300&fit=crop",
    amenities: ["Hot Spring Pools", "Spa", "Conference Halls", "Wifi"],
    location: "Pansol, Laguna"
  },
  {
    id: 9,
    name: "Bato Springs Resort",
    description: "Nature resort with cool mountain spring water and picnic areas.",
    type: "resort",
    rating: 4.5,
    reviews: 240,
    price: 50,
    capacity: 3,
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d4/OLD_IS_COOL.jpg",
    amenities: ["Spring Pools", "Picnic Huts", "Wifi", "Parking"],
    location: "San Pablo, Laguna"
  },
  {
    id: 10,
    name: "Laresio Lakeside Resort & Spa",
    description: "Lakeside resort with inflatables, kayaks, and spa services.",
    type: "resort",
    rating: 4.6,
    reviews: 280,
    price: 85,
    capacity: 4,
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Caliraya%2C_Laguna.jpg",
    amenities: ["Lake Activities", "Spa", "Inflatables", "Kayak Rentals"],
    location: "Los Baños, Laguna"
  },

  // 🛏 HOSTELS
  {
    id: 11,
    name: "Los Baños Hostel",
    description: "Budget-friendly hostel near UPLB with dorm and private rooms.",
    type: "hostel",
    rating: 4.2,
    reviews: 90,
    price: 15,
    capacity: 1,
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&h=300&fit=crop",
    amenities: ["Wifi", "Kitchen", "Dorm Beds", "Common Area"],
    location: "Los Baños, Laguna"
  },
  {
    id: 12,
    name: "Calamba Travelers Hostel",
    description: "Simple hostel with shared accommodations, ideal for quick stays.",
    type: "hostel",
    rating: 4.0,
    reviews: 70,
    price: 12,
    capacity: 1,
    image: "https://images.unsplash.com/photo-1505691723518-36a5ac3b2d8d?w=400&h=300&fit=crop",
    amenities: ["Wifi", "Lockers", "Kitchen", "Parking"],
    location: "Calamba, Laguna"
  },
  {
    id: 13,
    name: "Seven Lakes Backpackers Hostel",
    description: "Friendly hostel close to Sampaloc Lake, great for hikers and travelers.",
    type: "hostel",
    rating: 4.3,
    reviews: 65,
    price: 14,
    capacity: 1,
    image: "https://images.unsplash.com/photo-1501554728187-ce583db33af3?w=400&h=300&fit=crop",
    amenities: ["Wifi", "Kitchen", "Backpacker Rooms", "Common Area"],
    location: "San Pablo, Laguna"
  },
  {
    id: 14,
    name: "Pansol Backpackers Inn",
    description: "Affordable shared rooms near hot spring resorts.",
    type: "hostel",
    rating: 4.1,
    reviews: 85,
    price: 13,
    capacity: 1,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
    amenities: ["Wifi", "Shared Rooms", "Parking", "Kitchen"],
    location: "Pansol, Laguna"
  },
  {
    id: 15,
    name: "Laguna Student Hostel",
    description: "Affordable hostel ideal for students and budget-conscious travelers.",
    type: "hostel",
    rating: 4.0,
    reviews: 60,
    price: 10,
    capacity: 1,
    image: "https://images.unsplash.com/photo-1505691723518-36a5ac3b2d8d?w=400&h=300&fit=crop",
    amenities: ["Wifi", "Study Area", "Shared Rooms", "Budget-Friendly"],
    location: "Los Baños, Laguna"
  },

  // 🏢 APARTMENTS
  {
    id: 16,
    name: "Nuvali Lakeside Apartment",
    description: "Modern serviced apartment near Nuvali eco-city with great amenities.",
    type: "apartment",
    rating: 4.6,
    reviews: 130,
    price: 70,
    capacity: 4,
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&h=300&fit=crop",
    amenities: ["Wifi", "Kitchen", "Living Area", "Eco-Friendly"],
    location: "Sta. Rosa, Laguna"
  },
  {
    id: 17,
    name: "San Pablo City Apartment Stay",
    description: "Simple apartment-style lodging for long-term or short-term stays.",
    type: "apartment",
    rating: 4.2,
    reviews: 95,
    price: 40,
    capacity: 3,
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop",
    amenities: ["Wifi", "Kitchen", "Living Room", "Parking"],
    location: "San Pablo, Laguna"
  },
  {
    id: 18,
    name: "Calamba Executive Apartment",
    description: "Fully furnished apartment ideal for business travelers.",
    type: "apartment",
    rating: 4.4,
    reviews: 120,
    price: 65,
    capacity: 4,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
    amenities: ["Wifi", "Air Conditioning", "Kitchen", "Work Desk"],
    location: "Calamba, Laguna"
  },
  {
    id: 19,
    name: "Sta. Rosa Serviced Apartment",
    description: "Stylish apartment close to malls, dining, and Nuvali attractions.",
    type: "apartment",
    rating: 4.5,
    reviews: 140,
    price: 75,
    capacity: 5,
    image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=400&h=300&fit=crop",
    amenities: ["Wifi", "Kitchen", "Shopping Access", "Living Room"],
    location: "Sta. Rosa, Laguna"
  },
  {
    id: 20,
    name: "Bay Long-Stay Apartment",
    description: "Affordable long-stay apartment with a homey atmosphere.",
    type: "apartment",
    rating: 4.1,
    reviews: 80,
    price: 30,
    capacity: 3,
    image: "https://images.unsplash.com/photo-1505691723518-36a5ac3b2d8d?w=400&h=300&fit=crop",
    amenities: ["Wifi", "Kitchen", "Long-Term Stay", "Budget-Friendly"],
    location: "Bay, Laguna"
  },

  // 🏡 GUESTHOUSES
  {
    id: 21,
    name: "Casa San Pablo",
    description: "Art-inspired bed and breakfast guesthouse with rustic charm.",
    type: "guesthouse",
    rating: 4.8,
    reviews: 260,
    price: 85,
    capacity: 3,
    image: "https://upload.wikimedia.org/wikipedia/commons/8/87/Casa_San_Pablo.jpg",
    amenities: ["Wifi", "Art Gallery", "Garden", "Breakfast"],
    location: "San Pablo, Laguna"
  },
  {
    id: 22,
    name: "Sitio De Amor Leisure Farm",
    description: "Farm guesthouse with Spanish-inspired architecture and lush gardens.",
    type: "guesthouse",
    rating: 4.7,
    reviews: 180,
    price: 95,
    capacity: 4,
    image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=400&h=300&fit=crop",
    amenities: ["Wifi", "Farm Experience", "Garden", "Breakfast"],
    location: "San Pablo, Laguna"
  },
  {
    id: 23,
    name: "Acuatico Resthouse",
    description: "Charming lakeside guesthouse ideal for retreats and family outings.",
    type: "guesthouse",
    rating: 4.5,
    reviews: 140,
    price: 60,
    capacity: 4,
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop",
    amenities: ["Wifi", "Lake View", "Family Rooms", "Retreat Facilities"],
    location: "San Pablo, Laguna"
  },
  {
    id: 24,
    name: "Sulyap Bed & Breakfast",
    description: "Guesthouse with heritage-inspired design and an in-house museum.",
    type: "guesthouse",
    rating: 4.9,
    reviews: 280,
    price: 100,
    capacity: 3,
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Sulyap_Gallery_Cafe.jpg",
    amenities: ["Wifi", "Museum", "Breakfast", "Historic Architecture"],
    location: "San Pablo, Laguna"
  },
  {
    id: 25,
    name: "Woodside Farm and Waterpark",
    description: "Farm-themed guesthouse with pools and open grounds for activities.",
    type: "guesthouse",
    rating: 4.4,
    reviews: 120,
    price: 55,
    capacity: 4,
    image: "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=400&h=300&fit=crop",
    amenities: ["Farm", "Pools", "Activities", "Breakfast"],
    location: "Nagcarlan, Laguna"
  }
];


  const filteredAccommodations = accommodations.filter(acc => {
    const matchesSearch = acc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         acc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || acc.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getRatingColor = (rating: number) => {
    if (rating >= 4.8) return "text-green-600";
    if (rating >= 4.5) return "text-yellow-600";
    return "text-orange-600";
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi': return <Wifi className="h-3 w-3" />;
      case 'parking': return <Car className="h-3 w-3" />;
      case 'restaurant': return <Coffee className="h-3 w-3" />;
      default: return null;
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
          Find Perfect Accommodations
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          From luxury resorts to cozy guesthouses, discover the perfect place to stay
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search accommodations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex flex-wrap justify-center gap-2">
          {accommodationTypes.map((type) => (
            <Button
              key={type}
              variant={selectedType === type ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType(type)}
              className="capitalize"
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      {/* Results Counter */}
      <div className="text-center">
        <p className="text-muted-foreground">
          Found {filteredAccommodations.length} {filteredAccommodations.length === 1 ? 'accommodation' : 'accommodations'}
        </p>
      </div>

      {/* Accommodations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAccommodations.map((acc) => (
          <Card key={acc.id} className="overflow-hidden shadow-card hover:shadow-travel transition-all duration-300 group">
            <div className="relative">
              <img
                src={acc.image}
                alt={acc.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3">
                <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute bottom-3 left-3">
                <Badge variant="secondary" className="bg-white/90 text-black capitalize">
                  {acc.type}
                </Badge>
              </div>
            </div>
            
            <CardHeader className="space-y-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg leading-tight">{acc.name}</CardTitle>
                <div className="flex items-center gap-1">
                  <Star className={`h-4 w-4 fill-current ${getRatingColor(acc.rating)}`} />
                  <span className={`text-sm font-medium ${getRatingColor(acc.rating)}`}>
                    {acc.rating}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{acc.location}</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {acc.description}
              </p>

              <div className="flex flex-wrap gap-1">
                {acc.amenities.slice(0, 4).map((amenity) => (
                  <Badge key={amenity} variant="outline" className="text-xs flex items-center gap-1">
                    {getAmenityIcon(amenity)}
                    {amenity}
                  </Badge>
                ))}
                {acc.amenities.length > 4 && (
                  <Badge variant="outline" className="text-xs">
                    +{acc.amenities.length - 4} more
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>Up to {acc.capacity} guests</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    ${acc.price}
                  </div>
                  <div className="text-xs text-muted-foreground">per night</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="default" className="flex-1" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  View Details
                </Button>
                <Button variant="sunset" size="sm">
                  <Bed className="h-4 w-4" />
                </Button>
              </div>

              <div className="text-xs text-muted-foreground text-center">
                {acc.reviews} reviews
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAccommodations.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏨</div>
          <h3 className="text-xl font-medium mb-2">No accommodations found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
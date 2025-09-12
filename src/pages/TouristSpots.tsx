import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MapPin, 
  Star, 
  Clock, 
  DollarSign, 
  Filter,
  Heart,
  Eye
} from "lucide-react";

export default function TouristSpots() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "beach", "mountain", "historical", "adventure", "cultural"];

  const touristSpots = [
  // 🏖️ BEACH
  {
    id: 1,
    name: "Caliraya Resort Club",
    description: "Lakeside resort with floating cottages, boating, and water adventures in Lake Caliraya.",
    category: "beach",
    rating: 4.7,
    reviews: 210,
    price: "$10",
    duration: "Half day",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Caliraya_Lake_Spillway.JPG",
    tags: ["Boating", "Swimming", "Resort"],
    location: "Lumban, Laguna"
  },
  {
    id: 2,
    name: "Laresio Lakeside Resort",
    description: "Adventure resort with water inflatables, kayaking, and lakeside relaxation.",
    category: "beach",
    rating: 4.6,
    reviews: 180,
    price: "$12",
    duration: "Half day",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Caliraya%2C_Laguna.jpg",
    tags: ["Adventure", "Kayaking", "Swimming"],
    location: "Los Baños, Laguna"
  },
  {
    id: 3,
    name: "Sampaloc Lake",
    description: "One of San Pablo’s seven lakes, perfect for sightseeing and lakeside strolls.",
    category: "beach",
    rating: 4.8,
    reviews: 320,
    price: "Free",
    duration: "2-3 hours",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/98/Sampaloc_Lake.jpg",
    tags: ["Sightseeing", "Photography", "Nature"],
    location: "San Pablo, Laguna"
  },
  {
    id: 4,
    name: "Bato Springs Resort",
    description: "Resort with cool natural spring water pools surrounded by lush greenery.",
    category: "beach",
    rating: 4.5,
    reviews: 145,
    price: "$8",
    duration: "Half day",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d4/OLD_IS_COOL.jpg",
    tags: ["Swimming", "Nature", "Relaxation"],
    location: "San Pablo, Laguna"
  },
  {
    id: 5,
    name: "Villa Escudero",
    description: "Famous for its waterfall restaurant and cultural showcase in a plantation resort.",
    category: "beach",
    rating: 4.9,
    reviews: 500,
    price: "$25",
    duration: "Full day",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Villa_Escudero_Waterfalls_Restaurant.jpg",
    tags: ["Cultural", "Dining", "Resort"],
    location: "Tiaong (Laguna-Quezon Border)"
  },

  // ⛰️ MOUNTAIN
  {
    id: 6,
    name: "Mount Makiling",
    description: "Dormant volcano with diverse flora, hiking trails, and hot springs nearby.",
    category: "mountain",
    rating: 4.8,
    reviews: 420,
    price: "$5",
    duration: "Full day",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/44/Mount_Makiling.jpg",
    tags: ["Hiking", "Nature", "Wildlife"],
    location: "Los Baños, Laguna"
  },
  {
    id: 7,
    name: "Mount Banahaw",
    description: "A mystical mountain popular for hiking and pilgrimage activities.",
    category: "mountain",
    rating: 4.7,
    reviews: 300,
    price: "$10",
    duration: "Full day",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fd/MtBanahawSep16.JPG",
    tags: ["Hiking", "Pilgrimage", "Nature"],
    location: "Dolores, Laguna-Quezon Border"
  },
  {
    id: 8,
    name: "Mount San Cristobal",
    description: "Known as the ‘Devil’s Mountain’, offering challenging trails and panoramic views.",
    category: "mountain",
    rating: 4.6,
    reviews: 160,
    price: "$8",
    duration: "Full day",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/27/Mt_Banahaw_Mt_San_Cristobal.JPG",
    tags: ["Hiking", "Adventure", "Views"],
    location: "San Pablo, Laguna"
  },
  {
    id: 9,
    name: "Mount Kalisungan",
    description: "Beginner-friendly mountain hike with stunning views of Laguna’s seven lakes.",
    category: "mountain",
    rating: 4.5,
    reviews: 130,
    price: "$5",
    duration: "4-6 hours",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Mount_Kalisungan.jpg",
    tags: ["Hiking", "Photography", "Nature"],
    location: "Calauan, Laguna"
  },
  {
    id: 10,
    name: "Tayak Hill",
    description: "Scenic hilltop with the ‘Tanaw de Rizal’ statue and breathtaking views.",
    category: "mountain",
    rating: 4.7,
    reviews: 220,
    price: "Free",
    duration: "2-3 hours",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/23/Tanaw_de_Rizal.jpg",
    tags: ["Sightseeing", "Hiking", "Culture"],
    location: "Rizal, Laguna"
  },

  // 🏛️ HISTORICAL
  {
    id: 11,
    name: "Rizal Shrine",
    description: "Ancestral home of Dr. José Rizal, showcasing his life and works.",
    category: "historical",
    rating: 4.9,
    reviews: 600,
    price: "Free",
    duration: "2 hours",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Rizal_Shrine_in_Cabuyao_Laguna.jpg",
    tags: ["History", "Culture", "Museum"],
    location: "Calamba, Laguna"
  },
  {
    id: 12,
    name: "Nagcarlan Underground Cemetery",
    description: "Spanish-era underground burial site and chapel, declared a historical landmark.",
    category: "historical",
    rating: 4.8,
    reviews: 250,
    price: "Free",
    duration: "1-2 hours",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Nagcarlan_Underground_Cemetery.jpg",
    tags: ["History", "Heritage", "Architecture"],
    location: "Nagcarlan, Laguna"
  },
  {
    id: 13,
    name: "Pila Heritage Town",
    description: "Heritage houses and old church showcasing Spanish colonial architecture.",
    category: "historical",
    rating: 4.7,
    reviews: 180,
    price: "Free",
    duration: "2-3 hours",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Pila_Laguna_Heritage_Town.jpg",
    tags: ["Culture", "History", "Architecture"],
    location: "Pila, Laguna"
  },
  {
    id: 14,
    name: "Majayjay Church",
    description: "One of Laguna’s oldest Spanish-era churches, built from volcanic tuff.",
    category: "historical",
    rating: 4.6,
    reviews: 160,
    price: "Free",
    duration: "1-2 hours",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Majayjay_Church.jpg",
    tags: ["Church", "History", "Culture"],
    location: "Majayjay, Laguna"
  },
  {
    id: 15,
    name: "San Pedro Apóstol Church",
    description: "Historic church in San Pedro with centuries-old architecture.",
    category: "historical",
    rating: 4.5,
    reviews: 120,
    price: "Free",
    duration: "1 hour",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/San_Pedro_Apostol_Church_Laguna.jpg",
    tags: ["History", "Culture", "Church"],
    location: "San Pedro, Laguna"
  },

  // 🌊 ADVENTURE
  {
    id: 16,
    name: "Pagsanjan Falls",
    description: "Iconic waterfalls accessible by boat ride through scenic gorges.",
    category: "adventure",
    rating: 4.9,
    reviews: 800,
    price: "$15",
    duration: "3-4 hours",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Pagsanjan_Falls.jpg",
    tags: ["Boat Ride", "Nature", "Adventure"],
    location: "Pagsanjan, Laguna"
  },
  {
    id: 17,
    name: "Hulugan Falls",
    description: "Majestic waterfall hidden in the forests of Luisiana.",
    category: "adventure",
    rating: 4.8,
    reviews: 340,
    price: "$5",
    duration: "3 hours",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Hulugan_Falls.jpg",
    tags: ["Waterfall", "Hiking", "Nature"],
    location: "Luisiana, Laguna"
  },
  {
    id: 18,
    name: "Talay Falls",
    description: "Twin falls with a refreshing basin, ideal for swimming and nature trips.",
    category: "adventure",
    rating: 4.6,
    reviews: 200,
    price: "$3",
    duration: "2-3 hours",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/55/Talay_Falls.jpg",
    tags: ["Swimming", "Adventure", "Nature"],
    location: "Luisiana, Laguna"
  },
  {
    id: 19,
    name: "Aliw Falls",
    description: "Multi-tiered waterfalls with natural pools perfect for swimming.",
    category: "adventure",
    rating: 4.7,
    reviews: 180,
    price: "$3",
    duration: "2-3 hours",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Aliw_Falls.jpg",
    tags: ["Waterfall", "Nature", "Swimming"],
    location: "Luisiana, Laguna"
  },
  {
    id: 20,
    name: "Bukal Falls",
    description: "Hidden gem with emerald waters surrounded by lush forest.",
    category: "adventure",
    rating: 4.8,
    reviews: 260,
    price: "$4",
    duration: "2-3 hours",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Bukal_Falls.jpg",
    tags: ["Swimming", "Nature", "Adventure"],
    location: "Majayjay, Laguna"
  },

  // 🎭 CULTURAL
  {
    id: 21,
    name: "Paete Town",
    description: "Famous for its woodcarving artisans and cultural heritage.",
    category: "cultural",
    rating: 4.7,
    reviews: 300,
    price: "Free",
    duration: "2-3 hours",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/65/Paete_Woodcarving.jpg",
    tags: ["Culture", "Woodcarving", "Shopping"],
    location: "Paete, Laguna"
  },
  {
    id: 22,
    name: "Lumban Embroidery",
    description: "Known as the embroidery capital, showcasing barong and handwoven designs.",
    category: "cultural",
    rating: 4.6,
    reviews: 190,
    price: "Free",
    duration: "1-2 hours",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d8/Barong_Tagalo_Lumban.jpg",
    tags: ["Embroidery", "Culture", "Handicraft"],
    location: "Lumban, Laguna"
  },
  {
    id: 23,
    name: "Pagsanjan Town Fiesta",
    description: "Colorful local fiesta celebrating tradition, food, and music.",
    category: "cultural",
    rating: 4.8,
    reviews: 220,
    price: "Free",
    duration: "Full day",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Pagsanjan_Fiesta.jpg",
    tags: ["Festival", "Culture", "Food"],
    location: "Pagsanjan, Laguna"
  },
  {
    id: 24,
    name: "San Pablo Coconut Festival",
    description: "Annual festival with street dancing and coconut-themed activities.",
    category: "cultural",
    rating: 4.7,
    reviews: 270,
    price: "Free",
    duration: "Full day",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/84/San_Pablo_Coconut_Festival.jpg",
    tags: ["Festival", "Culture", "Dance"],
    location: "San Pablo, Laguna"
  },
  {
    id: 25,
    name: "Pakil Turumba Festival",
    description: "Religious-cultural event honoring Our Lady of Sorrows with lively processions.",
    category: "cultural",
    rating: 4.9,
    reviews: 350,
    price: "Free",
    duration: "Full day",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/97/Turumba_Festival.jpg",
    tags: ["Festival", "Religion", "Culture"],
    location: "Pakil, Laguna"
  }
];


  const filteredSpots = touristSpots.filter(spot => {
    const matchesSearch = spot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         spot.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || spot.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getRatingColor = (rating: number) => {
    if (rating >= 4.8) return "text-green-600";
    if (rating >= 4.5) return "text-yellow-600";
    return "text-orange-600";
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
          Discover Tourist Spots
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore amazing destinations and create unforgettable memories
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tourist spots..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Results Counter */}
      <div className="text-center">
        <p className="text-muted-foreground">
          Found {filteredSpots.length} amazing {filteredSpots.length === 1 ? 'spot' : 'spots'}
        </p>
      </div>

      {/* Spots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpots.map((spot) => (
          <Card key={spot.id} className="overflow-hidden shadow-card hover:shadow-travel transition-all duration-300 group">
            <div className="relative">
              <img
                src={spot.image}
                alt={spot.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3">
                <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute bottom-3 left-3">
                <Badge variant="secondary" className="bg-white/90 text-black">
                  {spot.category}
                </Badge>
              </div>
            </div>
            
            <CardHeader className="space-y-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg leading-tight">{spot.name}</CardTitle>
                <div className="flex items-center gap-1">
                  <Star className={`h-4 w-4 fill-current ${getRatingColor(spot.rating)}`} />
                  <span className={`text-sm font-medium ${getRatingColor(spot.rating)}`}>
                    {spot.rating}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{spot.location}</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {spot.description}
              </p>

              <div className="flex flex-wrap gap-1">
                {spot.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{spot.duration}</span>
                </div>
                <div className="flex items-center gap-1 font-medium">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <span className="text-primary">{spot.price}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="default" className="flex-1" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  View Details
                </Button>
                <Button variant="outline" size="sm">
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>

              <div className="text-xs text-muted-foreground text-center">
                {spot.reviews} reviews
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSpots.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏝️</div>
          <h3 className="text-xl font-medium mb-2">No spots found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
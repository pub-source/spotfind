import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Camera, Heart, Share2, Download, MapPin } from "lucide-react";

export default function Gallery() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const photos = [
    {
      id: 1,
      title: "Mayon Volcano Perfect Cone",
      location: "Albay, Philippines",
      photographer: "Travel Explorer",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      category: "nature",
      likes: 245,
      description: "The perfect cone shape of Mayon Volcano during golden hour"
    },
    {
      id: 2,
      title: "Boracay White Beach Sunset",
      location: "Boracay, Aklan",
      photographer: "Island Wanderer",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      category: "beach",
      likes: 189,
      description: "Crystal clear waters and pristine white sand beach"
    },
    {
      id: 3,
      title: "Banaue Rice Terraces",
      location: "Ifugao, Philippines",
      photographer: "Mountain Hiker",
      image: "https://images.unsplash.com/photo-1571085420174-6e4e9e0bb146?w=800&h=600&fit=crop",
      category: "cultural",
      likes: 312,
      description: "Ancient rice terraces carved into the mountains"
    },
    {
      id: 4,
      title: "Chocolate Hills Landscape",
      location: "Bohol, Philippines",
      photographer: "Nature Lover",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
      category: "nature",
      likes: 156,
      description: "Unique geological formation of limestone hills"
    },
    {
      id: 5,
      title: "Vigan Heritage Street",
      location: "Vigan, Ilocos Sur",
      photographer: "History Buff",
      image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&h=600&fit=crop",
      category: "cultural",
      likes: 203,
      description: "Spanish colonial architecture preserved through centuries"
    },
    {
      id: 6,
      title: "Palawan Underground River",
      location: "Puerto Princesa, Palawan",
      photographer: "Cave Explorer",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      category: "nature",
      likes: 278,
      description: "One of the New 7 Wonders of Nature"
    },
    {
      id: 7,
      title: "Manila Bay Sunset",
      location: "Manila, Philippines",
      photographer: "City Explorer",
      image: "https://images.unsplash.com/photo-1555400081-61321dd87375?w=800&h=600&fit=crop",
      category: "urban",
      likes: 134,
      description: "Vibrant sunset over the bustling Manila Bay"
    },
    {
      id: 8,
      title: "El Nido Lagoons",
      location: "El Nido, Palawan",
      photographer: "Island Hopper",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      category: "beach",
      likes: 421,
      description: "Hidden lagoons surrounded by limestone cliffs"
    }
  ];

  const categories = [
    { id: "all", name: "All Photos", count: photos.length },
    { id: "nature", name: "Nature", count: photos.filter(p => p.category === "nature").length },
    { id: "beach", name: "Beaches", count: photos.filter(p => p.category === "beach").length },
    { id: "cultural", name: "Cultural", count: photos.filter(p => p.category === "cultural").length },
    { id: "urban", name: "Urban", count: photos.filter(p => p.category === "urban").length }
  ];

  const filteredPhotos = photos.filter(photo => {
    const matchesSearch = photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photo.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || photo.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Photo Gallery
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore stunning photography from the most beautiful destinations across the Philippines
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Camera className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input
              placeholder="Search photos by location, title, or photographer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-14 text-lg bg-white/80 backdrop-blur-sm border-0 shadow-elegant focus:shadow-glow transition-all duration-300"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="lg"
                onClick={() => setSelectedCategory(category.id)}
                className="h-12 transition-all duration-200 hover:scale-105 shadow-card hover:shadow-travel"
              >
                {category.name}
                <Badge variant="secondary" className="ml-2 bg-primary/10">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredPhotos.length} photo{filteredPhotos.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredPhotos.map((photo, index) => (
            <Dialog key={photo.id}>
              <DialogTrigger asChild>
                <Card className="group cursor-pointer overflow-hidden hover:shadow-travel transition-all duration-300 hover:-translate-y-1 animate-fade-in" style={{animationDelay: `${index * 50}ms`}}>
                  <div className="relative overflow-hidden">
                    <img
                      src={photo.image}
                      alt={photo.title}
                      className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                        {photo.title}
                      </h3>
                      <div className="flex items-center gap-1 text-white/80 text-xs">
                        <MapPin className="h-3 w-3" />
                        <span>{photo.location}</span>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-white/20 text-white backdrop-blur-sm">
                        <Heart className="h-3 w-3 mr-1" />
                        {photo.likes}
                      </Badge>
                    </div>
                  </div>
                </Card>
              </DialogTrigger>

              <DialogContent className="max-w-4xl w-full p-0">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative">
                    <img
                      src={photo.image}
                      alt={photo.title}
                      className="w-full h-96 md:h-full object-cover"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{photo.title}</h2>
                      <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <MapPin className="h-4 w-4" />
                        <span>{photo.location}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        by {photo.photographer}
                      </p>
                    </div>

                    <p className="text-muted-foreground">
                      {photo.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm">
                          <Heart className="h-4 w-4 mr-2" />
                          {photo.likes}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        {filteredPhotos.length === 0 && (
          <div className="text-center py-12">
            <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No photos found</h3>
            <p className="text-muted-foreground">Try adjusting your search or category filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Edit, 
  Trash2, 
  MapPin, 
  Building2, 
  Star,
  Eye,
  Users,
  DollarSign
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Admin() {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const touristSpots = [
    {
      id: 1,
      name: "Tropical Paradise Beach",
      category: "beach",
      rating: 4.9,
      reviews: 234,
      status: "active"
    },
    {
      id: 2,
      name: "Mountain Vista Trail", 
      category: "mountain",
      rating: 4.8,
      reviews: 189,
      status: "active"
    },
    {
      id: 3,
      name: "Historic City Center",
      category: "historical",
      rating: 4.7,
      reviews: 321,
      status: "pending"
    }
  ];

  const accommodations = [
    {
      id: 1,
      name: "Ocean View Resort",
      type: "resort",
      rating: 4.9,
      reviews: 456,
      price: 299,
      status: "active"
    },
    {
      id: 2,
      name: "Mountain Lodge",
      type: "hotel", 
      rating: 4.8,
      reviews: 234,
      price: 189,
      status: "active"
    },
    {
      id: 3,
      name: "Urban Hostel",
      type: "hostel",
      rating: 4.6,
      reviews: 789,
      price: 45,
      status: "inactive"
    }
  ];

  const handleAddSpot = () => {
    toast({
      title: "Add Tourist Spot",
      description: "This would open a form to add a new tourist spot.",
    });
  };

  const handleAddAccommodation = () => {
    toast({
      title: "Add Accommodation", 
      description: "This would open a form to add a new accommodation.",
    });
  };

  const handleEdit = (type: string, id: number) => {
    toast({
      title: `Edit ${type}`,
      description: `This would open edit form for ${type} with ID: ${id}`,
    });
  };

  const handleDelete = (type: string, id: number) => {
    toast({
      title: `Delete ${type}`,
      description: `This would delete ${type} with ID: ${id}`,
      variant: "destructive",
    });
  };

  const handleToggleStatus = (type: string, id: number) => {
    toast({
      title: "Status Updated",
      description: `${type} status has been updated successfully.`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/10 text-green-700 border-green-500/20">Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500/10 text-yellow-700 border-yellow-500/20">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <p className="text-lg text-muted-foreground">
          Manage tourist spots and accommodations
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Spots</p>
                <p className="text-2xl font-bold text-primary">{touristSpots.length}</p>
              </div>
              <MapPin className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Accommodations</p>
                <p className="text-2xl font-bold text-secondary">{accommodations.length}</p>
              </div>
              <Building2 className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Reviews</p>
                <p className="text-2xl font-bold text-accent">2,223</p>
              </div>
              <Star className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Items</p>
                <p className="text-2xl font-bold text-green-600">5</p>
              </div>
              <Eye className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Management Tabs */}
      <Tabs defaultValue="spots" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="spots" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Tourist Spots
          </TabsTrigger>
          <TabsTrigger value="accommodations" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Accommodations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="spots" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <Input
              placeholder="Search tourist spots..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Button onClick={handleAddSpot} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Tourist Spot
            </Button>
          </div>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Tourist Spots Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {touristSpots.map((spot) => (
                  <div key={spot.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium">{spot.name}</h3>
                        {getStatusBadge(spot.status)}
                        <Badge variant="outline" className="capitalize">{spot.category}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{spot.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{spot.reviews} reviews</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit('spot', spot.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleToggleStatus('spot', spot.id)}
                        className={spot.status === 'active' ? 'text-red-600' : 'text-green-600'}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete('spot', spot.id)} className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accommodations" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <Input
              placeholder="Search accommodations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Button onClick={handleAddAccommodation} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Accommodation
            </Button>
          </div>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Accommodations Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {accommodations.map((acc) => (
                  <div key={acc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium">{acc.name}</h3>
                        {getStatusBadge(acc.status)}
                        <Badge variant="outline" className="capitalize">{acc.type}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{acc.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{acc.reviews} reviews</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          <span>${acc.price}/night</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit('accommodation', acc.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleToggleStatus('accommodation', acc.id)}
                        className={acc.status === 'active' ? 'text-red-600' : 'text-green-600'}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete('accommodation', acc.id)} className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
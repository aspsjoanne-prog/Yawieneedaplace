import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Train, Car, Home, Bed, Bath, Calendar } from "lucide-react";
import { useState } from "react";

interface PropertyCardProps {
  id: string;
  title: string;
  price: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  carSpaces: number;
  propertyType: string;
  imageUrl: string;
  transportScore: number;
  transportCost: string;
  features: string[];
  daysOnMarket: number;
  source: "realestate" | "domain";
  onSave?: (id: string) => void;
  onCompare?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

export default function PropertyCard({
  id,
  title,
  price,
  address,
  bedrooms,
  bathrooms,
  carSpaces,
  propertyType,
  imageUrl,
  transportScore,
  transportCost,
  features,
  daysOnMarket,
  source,
  onSave,
  onCompare,
  onViewDetails
}: PropertyCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave?.(id);
    console.log(`Property ${id} ${isSaved ? 'unsaved' : 'saved'}`);
  };

  const handleCompare = () => {
    onCompare?.(id);
    console.log(`Property ${id} added to comparison`);
  };

  const handleViewDetails = () => {
    onViewDetails?.(id);
    console.log(`Viewing details for property ${id}`);
  };

  const getTransportScoreColor = (score: number) => {
    if (score >= 8) return "bg-green-500";
    if (score >= 6) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card className="hover-elevate overflow-hidden" data-testid={`card-property-${id}`}>
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <Badge variant="secondary" className="text-xs">
            {source === "realestate" ? "RE" : "Domain"}
          </Badge>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 bg-white/80 hover:bg-white"
            onClick={handleSave}
            data-testid={`button-save-${id}`}
          >
            <Heart className={`h-4 w-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
        </div>
        <div className="absolute bottom-2 left-2">
          <div className="flex items-center gap-1 bg-white/90 rounded px-2 py-1 text-xs">
            <div className={`w-2 h-2 rounded-full ${getTransportScoreColor(transportScore)}`} />
            <span className="font-medium">Transport: {transportScore}/10</span>
          </div>
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg" data-testid={`text-price-${id}`}>{price}</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {address}
            </p>
          </div>
          <Badge variant="outline" className="text-xs">
            {daysOnMarket} days
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>{bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span>{bathrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Car className="w-4 h-4" />
            <span>{carSpaces}</span>
          </div>
          <div className="flex items-center gap-1">
            <Home className="w-4 h-4" />
            <span>{propertyType}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3 text-sm">
          <Train className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">{transportCost}/week</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {features.slice(0, 3).map((feature, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {feature}
            </Badge>
          ))}
          {features.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{features.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={handleCompare}
            data-testid={`button-compare-${id}`}
          >
            Compare
          </Button>
          <Button 
            size="sm" 
            className="flex-1"
            onClick={handleViewDetails}
            data-testid={`button-details-${id}`}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
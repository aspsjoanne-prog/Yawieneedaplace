import PropertyGrid from "@/components/PropertyGrid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Trash2, Search } from "lucide-react";
import { Link } from "wouter";
import propertyImage1 from '@assets/generated_images/Modern_Australian_property_exterior_052f685e.png';
import propertyImage2 from '@assets/generated_images/Modern_apartment_interior_space_cee38e6d.png';

export default function SavedPage() {
  //todo: remove mock functionality
  const savedProperties = [
    {
      id: "prop-1",
      title: "Modern Family Home",
      price: "$850,000",
      address: "12 Smith Street, Bondi, NSW 2026",
      travelTimeToWork: "45 mins",
      travelCostToWork: "$45",
      flooring: "Floorboard" as const,
      facing: "North" as const,
      hasAircon: true,
      inspectionTime: "Sat 2-2:30pm",
      websiteUrl: "https://realestate.com.au/property/12-smith-st-bondi",
      source: "realestate" as const
    },
    {
      id: "prop-2",
      title: "City Apartment",
      price: "$720,000",
      address: "45 High Street, Sydney, NSW 2000",
      travelTimeToWork: "25 mins",
      travelCostToWork: "$25",
      flooring: "Tiles" as const,
      facing: "East" as const,
      hasAircon: true,
      inspectionTime: "Sun 11-11:30am",
      websiteUrl: "https://domain.com.au/property/45-high-st-sydney",
      source: "domain" as const
    }
  ];

  const handleRemoveProperty = (id: string) => {
    console.log(`Removed property from saved: ${id}`);
  };

  const handleCompareProperty = (id: string) => {
    console.log(`Added property to comparison: ${id}`);
  };

  const handleViewDetails = (id: string) => {
    console.log(`Viewing details for property: ${id}`);
  };

  return (
    <div className="p-6" data-testid="page-saved">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500" />
            Saved Properties
          </h1>
          <p className="text-muted-foreground">
            Properties you've saved for later review
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{savedProperties.length} saved</Badge>
          <Link href="/">
            <Button variant="outline" data-testid="button-new-search">
              <Search className="w-4 h-4 mr-2" />
              New Search
            </Button>
          </Link>
        </div>
      </div>

      {savedProperties.length === 0 ? (
        <Card>
          <CardContent className="text-center py-16">
            <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No saved properties yet</h3>
            <p className="text-muted-foreground mb-6">
              Save properties from your search results to keep track of your favorites
            </p>
            <Link href="/">
              <Button data-testid="button-start-searching">
                Start Searching
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <PropertyGrid
          properties={savedProperties}
          onSaveProperty={handleRemoveProperty}
          onCompareProperty={handleCompareProperty}
          onViewDetails={handleViewDetails}
        />
      )}
    </div>
  );
}
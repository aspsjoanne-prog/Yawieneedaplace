import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart3, X, MapPin, Train, Home, Bed, Bath, Car, Calendar, Star } from "lucide-react";
import { Link } from "wouter";
import propertyImage1 from '@assets/generated_images/Modern_Australian_property_exterior_052f685e.png';
import propertyImage2 from '@assets/generated_images/Modern_apartment_interior_space_cee38e6d.png';

export default function ComparePage() {
  //todo: remove mock functionality
  const comparisonProperties = [
    {
      id: "prop-1",
      title: "Modern Family Home",
      price: "$850,000",
      numericPrice: 850000,
      address: "12 Smith Street, Bondi, NSW 2026",
      bedrooms: 3,
      bathrooms: 2,
      carSpaces: 1,
      propertyType: "House",
      imageUrl: propertyImage1,
      transportScore: 8,
      transportCost: "$45",
      features: ["Air Conditioning", "Timber Floors", "Garden", "Balcony"],
      daysOnMarket: 14,
      source: "realestate" as const
    },
    {
      id: "prop-2",
      title: "City Apartment",
      price: "$720,000",
      numericPrice: 720000,
      address: "45 High Street, Sydney, NSW 2000",
      bedrooms: 2,
      bathrooms: 1,
      carSpaces: 1,
      propertyType: "Apartment",
      imageUrl: propertyImage2,
      transportScore: 9,
      transportCost: "$25",
      features: ["Pool", "Gym", "Dishwasher", "Built-in Wardrobes"],
      daysOnMarket: 7,
      source: "domain" as const
    }
  ];

  const handleRemoveFromComparison = (id: string) => {
    console.log(`Removed property from comparison: ${id}`);
  };

  const handleViewDetails = (id: string) => {
    console.log(`Viewing details for property: ${id}`);
  };

  const getBestValue = (properties: typeof comparisonProperties, key: keyof typeof comparisonProperties[0]) => {
    if (properties.length === 0) return null;
    
    switch (key) {
      case 'numericPrice':
        return Math.min(...properties.map(p => p[key]));
      case 'transportScore':
        return Math.max(...properties.map(p => p[key]));
      case 'daysOnMarket':
        return Math.min(...properties.map(p => p[key]));
      default:
        return null;
    }
  };

  const isBestValue = (value: any, bestValue: any) => {
    return value === bestValue;
  };

  return (
    <div className="p-6" data-testid="page-compare">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="w-6 h-6" />
            Property Comparison
          </h1>
          <p className="text-muted-foreground">
            Compare your selected properties side by side
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{comparisonProperties.length} properties</Badge>
          <Link href="/">
            <Button variant="outline" data-testid="button-find-more">
              Find More Properties
            </Button>
          </Link>
        </div>
      </div>

      {comparisonProperties.length === 0 ? (
        <Card>
          <CardContent className="text-center py-16">
            <BarChart3 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No properties to compare</h3>
            <p className="text-muted-foreground mb-6">
              Add properties to comparison from your search results to see detailed comparisons
            </p>
            <Link href="/">
              <Button data-testid="button-start-searching-compare">
                Start Searching
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Property Images Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {comparisonProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden">
                <div className="relative">
                  <img 
                    src={property.imageUrl} 
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2 h-8 w-8 bg-white/80 hover:bg-white"
                    onClick={() => handleRemoveFromComparison(property.id)}
                    data-testid={`button-remove-${property.id}`}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{property.title}</CardTitle>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {property.address}
                  </p>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleViewDetails(property.id)}
                    data-testid={`button-details-${property.id}`}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Comparison Table */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Feature</TableHead>
                    {comparisonProperties.map((property) => (
                      <TableHead key={property.id} className="text-center">
                        {property.title}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Price</TableCell>
                    {comparisonProperties.map((property) => {
                      const bestPrice = getBestValue(comparisonProperties, 'numericPrice');
                      const isBest = isBestValue(property.numericPrice, bestPrice);
                      return (
                        <TableCell key={property.id} className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            {property.price}
                            {isBest && <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />}
                          </div>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                  
                  <TableRow>
                    <TableCell className="font-medium flex items-center gap-1">
                      <Bed className="w-4 h-4" />
                      Bedrooms
                    </TableCell>
                    {comparisonProperties.map((property) => (
                      <TableCell key={property.id} className="text-center">
                        {property.bedrooms}
                      </TableCell>
                    ))}
                  </TableRow>

                  <TableRow>
                    <TableCell className="font-medium flex items-center gap-1">
                      <Bath className="w-4 h-4" />
                      Bathrooms
                    </TableCell>
                    {comparisonProperties.map((property) => (
                      <TableCell key={property.id} className="text-center">
                        {property.bathrooms}
                      </TableCell>
                    ))}
                  </TableRow>

                  <TableRow>
                    <TableCell className="font-medium flex items-center gap-1">
                      <Car className="w-4 h-4" />
                      Car Spaces
                    </TableCell>
                    {comparisonProperties.map((property) => (
                      <TableCell key={property.id} className="text-center">
                        {property.carSpaces}
                      </TableCell>
                    ))}
                  </TableRow>

                  <TableRow>
                    <TableCell className="font-medium flex items-center gap-1">
                      <Home className="w-4 h-4" />
                      Property Type
                    </TableCell>
                    {comparisonProperties.map((property) => (
                      <TableCell key={property.id} className="text-center">
                        {property.propertyType}
                      </TableCell>
                    ))}
                  </TableRow>

                  <TableRow>
                    <TableCell className="font-medium flex items-center gap-1">
                      <Train className="w-4 h-4" />
                      Transport Score
                    </TableCell>
                    {comparisonProperties.map((property) => {
                      const bestScore = getBestValue(comparisonProperties, 'transportScore');
                      const isBest = isBestValue(property.transportScore, bestScore);
                      return (
                        <TableCell key={property.id} className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            {property.transportScore}/10
                            {isBest && <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />}
                          </div>
                        </TableCell>
                      );
                    })}
                  </TableRow>

                  <TableRow>
                    <TableCell className="font-medium">Transport Cost/Week</TableCell>
                    {comparisonProperties.map((property) => (
                      <TableCell key={property.id} className="text-center">
                        {property.transportCost}
                      </TableCell>
                    ))}
                  </TableRow>

                  <TableRow>
                    <TableCell className="font-medium flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Days on Market
                    </TableCell>
                    {comparisonProperties.map((property) => {
                      const bestDays = getBestValue(comparisonProperties, 'daysOnMarket');
                      const isBest = isBestValue(property.daysOnMarket, bestDays);
                      return (
                        <TableCell key={property.id} className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            {property.daysOnMarket} days
                            {isBest && <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />}
                          </div>
                        </TableCell>
                      );
                    })}
                  </TableRow>

                  <TableRow>
                    <TableCell className="font-medium">Features</TableCell>
                    {comparisonProperties.map((property) => (
                      <TableCell key={property.id} className="text-center">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {property.features.slice(0, 2).map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {property.features.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{property.features.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
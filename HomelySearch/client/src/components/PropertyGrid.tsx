import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SortAsc, RefreshCw, ExternalLink, MapPin, Clock, Home, Thermometer, Calendar } from "lucide-react";
import { useState } from "react";

interface Property {
  id: string;
  title: string;
  price: string;
  address: string;
  travelTimeToWork: string;
  travelCostToWork: string;
  flooring: "Carpet" | "Floorboard" | "Tiles" | "Mixed" | "Unknown";
  facing: "North" | "South" | "East" | "West" | "North-East" | "North-West" | "South-East" | "South-West" | "Unknown";
  hasAircon: boolean;
  inspectionTime: string;
  websiteUrl: string;
  source: "realestate" | "domain";
}

interface PropertyGridProps {
  properties: Property[];
  isLoading?: boolean;
  onRefresh?: () => void;
  onSaveProperty?: (id: string) => void;
  onCompareProperty?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

export default function PropertyGrid({
  properties,
  isLoading = false,
  onRefresh,
  onSaveProperty,
  onCompareProperty,
  onViewDetails
}: PropertyGridProps) {
  const [sortBy, setSortBy] = useState("price-low");
  const [filterSource, setFilterSource] = useState<"all" | "realestate" | "domain">("all");

  const handleRefresh = () => {
    onRefresh?.();
    console.log("Refreshing properties...");
  };

  const sortedProperties = [...properties].sort((a, b) => {
    const priceA = parseInt(a.price.replace(/[$,]/g, ''));
    const priceB = parseInt(b.price.replace(/[$,]/g, ''));
    const travelCostA = parseInt(a.travelCostToWork.replace(/[$]/g, ''));
    const travelCostB = parseInt(b.travelCostToWork.replace(/[$]/g, ''));
    
    switch (sortBy) {
      case "price-low":
        return priceA - priceB;
      case "price-high":
        return priceB - priceA;
      case "travel-cost":
        return travelCostA - travelCostB;
      case "travel-time":
        const timeA = parseInt(a.travelTimeToWork.replace(/[^0-9]/g, ''));
        const timeB = parseInt(b.travelTimeToWork.replace(/[^0-9]/g, ''));
        return timeA - timeB;
      default:
        return 0;
    }
  });

  const filteredProperties = sortedProperties.filter(property => {
    if (filterSource === "all") return true;
    return property.source === filterSource;
  });

  const realestateCount = properties.filter(p => p.source === "realestate").length;
  const domainCount = properties.filter(p => p.source === "domain").length;

  const handleViewWebsite = (url: string) => {
    window.open(url, '_blank');
    console.log(`Opening website: ${url}`);
  };

  return (
    <div className="space-y-4" data-testid="container-property-grid">
      {/* Header with controls */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <CardTitle className="text-xl">
                {filteredProperties.length} Properties Found
              </CardTitle>
              {isLoading && (
                <RefreshCw className="w-4 h-4 animate-spin text-muted-foreground" />
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Source filter */}
              <div className="flex items-center gap-2">
                <Badge 
                  variant={filterSource === "all" ? "default" : "outline"}
                  className="cursor-pointer hover-elevate"
                  onClick={() => setFilterSource("all")}
                  data-testid="badge-filter-all"
                >
                  All ({properties.length})
                </Badge>
                <Badge 
                  variant={filterSource === "realestate" ? "default" : "outline"}
                  className="cursor-pointer hover-elevate"
                  onClick={() => setFilterSource("realestate")}
                  data-testid="badge-filter-realestate"
                >
                  RE ({realestateCount})
                </Badge>
                <Badge 
                  variant={filterSource === "domain" ? "default" : "outline"}
                  className="cursor-pointer hover-elevate"
                  onClick={() => setFilterSource("domain")}
                  data-testid="badge-filter-domain"
                >
                  Domain ({domainCount})
                </Badge>
              </div>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48" data-testid="select-sort">
                  <SortAsc className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="travel-cost">Travel Cost: Low to High</SelectItem>
                  <SelectItem value="travel-time">Travel Time: Shortest First</SelectItem>
                </SelectContent>
              </Select>

              {/* Refresh */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isLoading}
                data-testid="button-refresh"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Properties Table */}
      {filteredProperties.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">No properties found matching your criteria.</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Price</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Clock className="w-4 h-4" />
                      Travel Time
                    </div>
                  </TableHead>
                  <TableHead className="text-center">Travel Cost</TableHead>
                  <TableHead className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Home className="w-4 h-4" />
                      Flooring
                    </div>
                  </TableHead>
                  <TableHead className="text-center">Facing</TableHead>
                  <TableHead className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Thermometer className="w-4 h-4" />
                      Aircon
                    </div>
                  </TableHead>
                  <TableHead className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Inspection
                    </div>
                  </TableHead>
                  <TableHead className="text-center">Source</TableHead>
                  <TableHead className="text-center">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProperties.map((property) => (
                  <TableRow key={property.id} className="hover-elevate">
                    <TableCell className="font-semibold" data-testid={`cell-price-${property.id}`}>
                      {property.price}
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="flex items-start gap-1">
                        <MapPin className="w-3 h-3 mt-1 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm">{property.address}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center" data-testid={`cell-travel-time-${property.id}`}>
                      {property.travelTimeToWork}
                    </TableCell>
                    <TableCell className="text-center" data-testid={`cell-travel-cost-${property.id}`}>
                      {property.travelCostToWork}
                    </TableCell>
                    <TableCell className="text-center" data-testid={`cell-flooring-${property.id}`}>
                      <Badge variant="outline" className="text-xs">
                        {property.flooring}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center" data-testid={`cell-facing-${property.id}`}>
                      <Badge variant="outline" className="text-xs">
                        {property.facing}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center" data-testid={`cell-aircon-${property.id}`}>
                      <Badge variant={property.hasAircon ? "default" : "secondary"} className="text-xs">
                        {property.hasAircon ? "Yes" : "No"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center text-sm" data-testid={`cell-inspection-${property.id}`}>
                      {property.inspectionTime}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={property.source === "realestate" ? "default" : "secondary"} className="text-xs">
                        {property.source === "realestate" ? "RE" : "Domain"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewWebsite(property.websiteUrl)}
                        data-testid={`button-website-${property.id}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
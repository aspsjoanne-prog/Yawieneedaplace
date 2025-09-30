import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PropertyGrid from "./PropertyGrid";
import { Clock, MapPin, AlertCircle, CheckCircle, RefreshCw } from "lucide-react";
import { useState } from "react";

interface SearchStatus {
  realestate: "pending" | "scraping" | "completed" | "error";
  domain: "pending" | "scraping" | "completed" | "error";
  lastUpdated?: Date;
  totalFound: number;
  realestateFound: number;
  domainFound: number;
}

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

interface SearchResultsProps {
  searchStatus: SearchStatus;
  properties: Property[];
  searchQuery?: string;
  onRetrySearch?: () => void;
  onSaveProperty?: (id: string) => void;
  onCompareProperty?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

export default function SearchResults({
  searchStatus,
  properties,
  searchQuery = "",
  onRetrySearch,
  onSaveProperty,
  onCompareProperty,
  onViewDetails
}: SearchResultsProps) {
  const [showStatusDetails, setShowStatusDetails] = useState(true);

  const getStatusIcon = (status: SearchStatus["realestate"]) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-muted-foreground" />;
      case "scraping":
        return <RefreshCw className="w-4 h-4 animate-spin text-blue-500" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusText = (status: SearchStatus["realestate"]) => {
    switch (status) {
      case "pending":
        return "Waiting to start";
      case "scraping":
        return "Searching...";
      case "completed":
        return "Complete";
      case "error":
        return "Error occurred";
    }
  };

  const isSearching = searchStatus.realestate === "scraping" || searchStatus.domain === "scraping";
  const hasErrors = searchStatus.realestate === "error" || searchStatus.domain === "error";

  return (
    <div className="space-y-6" data-testid="container-search-results">
      {/* Search Status Card */}
      {showStatusDetails && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Search Status</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowStatusDetails(false)}
                data-testid="button-hide-status"
              >
                Hide
              </Button>
            </div>
            {searchQuery && (
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                Searching: {searchQuery}
              </p>
            )}
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Realestate.com.au Status */}
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                <div className="flex items-center gap-2">
                  {getStatusIcon(searchStatus.realestate)}
                  <span className="font-medium">Realestate.com.au</span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">{getStatusText(searchStatus.realestate)}</p>
                  {searchStatus.realestate === "completed" && (
                    <Badge variant="secondary" className="text-xs">
                      {searchStatus.realestateFound} found
                    </Badge>
                  )}
                </div>
              </div>

              {/* Domain.com.au Status */}
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                <div className="flex items-center gap-2">
                  {getStatusIcon(searchStatus.domain)}
                  <span className="font-medium">Domain.com.au</span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">{getStatusText(searchStatus.domain)}</p>
                  {searchStatus.domain === "completed" && (
                    <Badge variant="secondary" className="text-xs">
                      {searchStatus.domainFound} found
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Properties: <span className="font-medium text-foreground">{searchStatus.totalFound}</span>
                </p>
                {searchStatus.lastUpdated && (
                  <p className="text-xs text-muted-foreground">
                    Last updated: {searchStatus.lastUpdated.toLocaleTimeString()}
                  </p>
                )}
              </div>
              
              {hasErrors && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onRetrySearch}
                  data-testid="button-retry-search"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retry Failed
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Show status button when hidden */}
      {!showStatusDetails && (
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowStatusDetails(true)}
            data-testid="button-show-status"
          >
            Show Search Status
          </Button>
          {isSearching && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <RefreshCw className="w-4 h-4 animate-spin" />
              Searching properties...
            </div>
          )}
        </div>
      )}

      {/* Properties Grid */}
      <PropertyGrid
        properties={properties}
        isLoading={isSearching}
        onRefresh={onRetrySearch}
        onSaveProperty={onSaveProperty}
        onCompareProperty={onCompareProperty}
        onViewDetails={onViewDetails}
      />
    </div>
  );
}
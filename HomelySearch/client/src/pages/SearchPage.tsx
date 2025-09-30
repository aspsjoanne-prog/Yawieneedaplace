import { useState } from "react";
import SearchCriteriaPanel from "@/components/SearchCriteriaPanel";
import SearchResults from "@/components/SearchResults";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import propertyImage1 from '@assets/generated_images/Modern_Australian_property_exterior_052f685e.png';
import propertyImage2 from '@assets/generated_images/Modern_apartment_interior_space_cee38e6d.png';

export default function SearchPage() {
  const [showCriteria, setShowCriteria] = useState(true);
  type SearchStatus = "pending" | "scraping" | "completed" | "error";
  
  const [searchResults, setSearchResults] = useState<{
    status: {
      realestate: SearchStatus;
      domain: SearchStatus;
      totalFound: number;
      realestateFound: number;
      domainFound: number;
      lastUpdated?: Date;
    };
    properties: any[];
    searchQuery: string;
  }>({
    status: {
      realestate: "pending",
      domain: "pending",
      totalFound: 0,
      realestateFound: 0,
      domainFound: 0
    },
    properties: [],
    searchQuery: ""
  });

  //todo: remove mock functionality
  const mockProperties = [
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
    },
    {
      id: "prop-3",
      title: "Beachside Villa",
      price: "$1,200,000",
      address: "78 Ocean View, Manly, NSW 2095",
      travelTimeToWork: "65 mins",
      travelCostToWork: "$65",
      flooring: "Mixed" as const,
      facing: "North-East" as const,
      hasAircon: false,
      inspectionTime: "Sat 10-10:30am",
      websiteUrl: "https://realestate.com.au/property/78-ocean-view-manly",
      source: "realestate" as const
    }
  ];

  const handleSearch = async (criteria: any) => {
    console.log("Starting search with criteria:", criteria);
    
    // Update status to searching
    setSearchResults(prev => ({
      ...prev,
      status: {
        realestate: "scraping",
        domain: "scraping",
        totalFound: 0,
        realestateFound: 0,
        domainFound: 0
      },
      searchQuery: criteria.location,
      properties: []
    }));

    // Simulate search process
    setTimeout(() => {
      setSearchResults(prev => ({
        ...prev,
        status: {
          realestate: "completed",
          domain: "completed",
          totalFound: mockProperties.length,
          realestateFound: mockProperties.filter(p => p.source === "realestate").length,
          domainFound: mockProperties.filter(p => p.source === "domain").length,
          lastUpdated: new Date()
        },
        properties: mockProperties
      }));
    }, 3000);
  };

  const handleSaveProperty = (id: string) => {
    console.log(`Saved property: ${id}`);
  };

  const handleCompareProperty = (id: string) => {
    console.log(`Added property to comparison: ${id}`);
  };

  const handleViewDetails = (id: string) => {
    console.log(`Viewing details for property: ${id}`);
  };

  const hasSearched = searchResults.properties.length > 0 || 
    searchResults.status.realestate !== "pending" || 
    searchResults.status.domain !== "pending";

  return (
    <div className="flex h-full" data-testid="page-search">
      {/* Criteria Panel */}
      {showCriteria && (
        <div className="w-80 border-r bg-card overflow-y-auto">
          <div className="p-4">
            <SearchCriteriaPanel onSearch={handleSearch} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {/* Toggle Panel Button */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCriteria(!showCriteria)}
                data-testid="button-toggle-criteria"
              >
                {showCriteria ? (
                  <PanelLeftClose className="w-4 h-4" />
                ) : (
                  <PanelLeftOpen className="w-4 h-4" />
                )}
                {showCriteria ? "Hide" : "Show"} Criteria
              </Button>
              
              {hasSearched && (
                <Badge variant="secondary">
                  {searchResults.properties.length} properties found
                </Badge>
              )}
            </div>
          </div>

          {/* Search Results or Welcome */}
          {hasSearched ? (
            <SearchResults
              searchStatus={searchResults.status}
              properties={searchResults.properties}
              searchQuery={searchResults.searchQuery}
              onRetrySearch={() => handleSearch({ location: searchResults.searchQuery })}
              onSaveProperty={handleSaveProperty}
              onCompareProperty={handleCompareProperty}
              onViewDetails={handleViewDetails}
            />
          ) : (
            <div className="text-center py-16">
              <h1 className="text-3xl font-bold mb-4">Find Your Perfect Property</h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Set your personalized criteria and let us automatically search both realestate.com.au and domain.com.au 
                to find properties that match your exact requirements.
              </p>
              <div className="flex justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>Transport analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span>Property features extraction</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <span>Automated searching</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
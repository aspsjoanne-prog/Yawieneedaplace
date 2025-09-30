import SearchResults from '../SearchResults';
import propertyImage1 from '@assets/generated_images/Modern_Australian_property_exterior_052f685e.png';
import propertyImage2 from '@assets/generated_images/Modern_apartment_interior_space_cee38e6d.png';

export default function SearchResultsExample() {
  //todo: remove mock functionality
  const mockStatus = {
    realestate: "completed" as const,
    domain: "scraping" as const,
    lastUpdated: new Date(),
    totalFound: 15,
    realestateFound: 10,
    domainFound: 5
  };

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
    }
  ];

  return (
    <div className="p-4">
      <SearchResults
        searchStatus={mockStatus}
        properties={mockProperties}
        searchQuery="Bondi, NSW"
      />
    </div>
  );
}
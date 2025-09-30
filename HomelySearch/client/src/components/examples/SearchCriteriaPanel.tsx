import SearchCriteriaPanel from '../SearchCriteriaPanel';

export default function SearchCriteriaPanelExample() {
  const savedSearches = [
    { name: "Bondi Apartments", criteria: { location: "Bondi", workAddress: "Sydney CBD", minPrice: 600000, maxPrice: 1200000, bedrooms: "2", propertyTypes: ["Apartment"], maxTravelTime: 45, maxTravelCost: 50, preferredFlooring: ["Floorboard"], preferredFacing: ["North"], requiresAircon: true } },
    { name: "Family Homes", criteria: { location: "Parramatta", workAddress: "Macquarie Park", minPrice: 800000, maxPrice: 1500000, bedrooms: "3", propertyTypes: ["House"], maxTravelTime: 60, maxTravelCost: 80, preferredFlooring: ["Floorboard", "Tiles"], preferredFacing: ["North", "East"], requiresAircon: false } }
  ];

  return (
    <div className="max-w-md">
      <SearchCriteriaPanel savedSearches={savedSearches} />
    </div>
  );
}
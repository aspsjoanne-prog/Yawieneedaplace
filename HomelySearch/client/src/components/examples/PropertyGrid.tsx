import PropertyGrid from '../PropertyGrid';
import propertyImage1 from '@assets/generated_images/Modern_Australian_property_exterior_052f685e.png';
import propertyImage2 from '@assets/generated_images/Modern_apartment_interior_space_cee38e6d.png';

export default function PropertyGridExample() {
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

  return (
    <div className="p-4">
      <PropertyGrid properties={mockProperties} />
    </div>
  );
}
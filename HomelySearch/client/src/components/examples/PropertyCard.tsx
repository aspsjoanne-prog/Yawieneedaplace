import PropertyCard from '../PropertyCard';
import propertyImage1 from '@assets/generated_images/Modern_Australian_property_exterior_052f685e.png';

export default function PropertyCardExample() {
  return (
    <div className="max-w-sm">
      <PropertyCard
        id="prop-1"
        title="Modern Family Home"
        price="$850,000"
        address="12 Smith Street, Bondi, NSW 2026"
        bedrooms={3}
        bathrooms={2}
        carSpaces={1}
        propertyType="House"
        imageUrl={propertyImage1}
        transportScore={8}
        transportCost="$45"
        features={["Air Conditioning", "Timber Floors", "Garden", "Balcony"]}
        daysOnMarket={14}
        source="realestate"
      />
    </div>
  );
}
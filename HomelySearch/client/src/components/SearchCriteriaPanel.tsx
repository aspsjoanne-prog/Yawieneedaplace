import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { X, Search, Save, Edit } from "lucide-react";
import { useState } from "react";
import { SuburbAutocomplete } from "@/components/SuburbAutocomplete";

interface SearchCriteria {
  location: string;
  workAddress: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: string;
  propertyTypes: string[];
  maxTravelTime: number;
  maxTravelCost: number;
  preferredFlooring: string[];
  preferredFacing: string[];
  requiresAircon: boolean;
}

interface SearchCriteriaPanelProps {
  onSearch?: (criteria: SearchCriteria) => void;
  onSaveCriteria?: (criteria: SearchCriteria, name: string) => void;
  savedSearches?: Array<{ name: string; criteria: SearchCriteria }>;
}

export default function SearchCriteriaPanel({ 
  onSearch, 
  onSaveCriteria,
  savedSearches = []
}: SearchCriteriaPanelProps) {
  const [criteria, setCriteria] = useState<SearchCriteria>({
    location: "",
    workAddress: "",
    minPrice: 500000,
    maxPrice: 1500000,
    bedrooms: "any",
    propertyTypes: [],
    maxTravelTime: 60,
    maxTravelCost: 100,
    preferredFlooring: [],
    preferredFacing: [],
    requiresAircon: false
  });

  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [saveName, setSaveName] = useState("");

  const propertyTypeOptions = ["House", "Apartment", "Townhouse", "Villa", "Studio"];
  const flooringOptions = ["Carpet", "Floorboard", "Tiles", "Mixed"];
  const facingOptions = ["North", "South", "East", "West", "North-East", "North-West", "South-East", "South-West"];

  const handleSearch = () => {
    onSearch?.(criteria);
    console.log("Searching with criteria:", criteria);
  };

  const handleSave = () => {
    if (saveName.trim()) {
      onSaveCriteria?.(criteria, saveName);
      console.log(`Saved search: ${saveName}`);
      setShowSaveDialog(false);
      setSaveName("");
    }
  };

  const togglePropertyType = (type: string) => {
    setCriteria(prev => ({
      ...prev,
      propertyTypes: prev.propertyTypes.includes(type)
        ? prev.propertyTypes.filter(t => t !== type)
        : [...prev.propertyTypes, type]
    }));
  };

  const toggleFlooring = (flooring: string) => {
    setCriteria(prev => ({
      ...prev,
      preferredFlooring: prev.preferredFlooring.includes(flooring)
        ? prev.preferredFlooring.filter(f => f !== flooring)
        : [...prev.preferredFlooring, flooring]
    }));
  };

  const toggleFacing = (facing: string) => {
    setCriteria(prev => ({
      ...prev,
      preferredFacing: prev.preferredFacing.includes(facing)
        ? prev.preferredFacing.filter(f => f !== facing)
        : [...prev.preferredFacing, facing]
    }));
  };

  const loadSavedSearch = (savedCriteria: SearchCriteria) => {
    setCriteria(savedCriteria);
    console.log("Loaded saved search criteria");
  };

  return (
    <Card data-testid="panel-search-criteria">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          Search Criteria
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location">Property Location</Label>
          <SuburbAutocomplete
            value={criteria.location}
            onChange={(value) => setCriteria(prev => ({ ...prev, location: value }))}
            placeholder="Search suburbs (e.g., Parramatta)..."
            testId="input-location"
          />
        </div>

        {/* Work Address */}
        <div className="space-y-2">
          <Label htmlFor="workAddress">Work Address</Label>
          <SuburbAutocomplete
            value={criteria.workAddress}
            onChange={(value) => setCriteria(prev => ({ ...prev, workAddress: value }))}
            placeholder="Search work suburb (e.g., Sydney CBD)..."
            testId="input-work-address"
          />
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <Label>Price Range: ${criteria.minPrice.toLocaleString()} - ${criteria.maxPrice.toLocaleString()}</Label>
          <div className="px-2">
            <Slider
              value={[criteria.minPrice, criteria.maxPrice]}
              onValueChange={([min, max]) => setCriteria(prev => ({ ...prev, minPrice: min, maxPrice: max }))}
              min={200000}
              max={3000000}
              step={50000}
              className="w-full"
              data-testid="slider-price-range"
            />
          </div>
        </div>

        {/* Bedrooms */}
        <div className="space-y-2">
          <Label>Bedrooms</Label>
          <Select value={criteria.bedrooms} onValueChange={(value) => setCriteria(prev => ({ ...prev, bedrooms: value }))}>
            <SelectTrigger data-testid="select-bedrooms">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
              <SelectItem value="5">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Property Types */}
        <div className="space-y-3">
          <Label>Property Types</Label>
          <div className="flex flex-wrap gap-2">
            {propertyTypeOptions.map((type) => (
              <Badge
                key={type}
                variant={criteria.propertyTypes.includes(type) ? "default" : "outline"}
                className="cursor-pointer hover-elevate"
                onClick={() => togglePropertyType(type)}
                data-testid={`badge-property-type-${type.toLowerCase()}`}
              >
                {type}
              </Badge>
            ))}
          </div>
        </div>

        {/* Travel Preferences */}
        <div className="space-y-4">
          <Label>Travel Preferences</Label>
          
          <div className="space-y-2">
            <Label className="text-sm">Max Travel Time to Work: {criteria.maxTravelTime} minutes</Label>
            <Slider
              value={[criteria.maxTravelTime]}
              onValueChange={([value]) => setCriteria(prev => ({ ...prev, maxTravelTime: value }))}
              min={15}
              max={120}
              step={5}
              className="w-full"
              data-testid="slider-travel-time"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm">Max Weekly Travel Cost: ${criteria.maxTravelCost}</Label>
            <Slider
              value={[criteria.maxTravelCost]}
              onValueChange={([value]) => setCriteria(prev => ({ ...prev, maxTravelCost: value }))}
              min={20}
              max={200}
              step={10}
              className="w-full"
              data-testid="slider-travel-cost"
            />
          </div>
        </div>

        {/* Flooring Preferences */}
        <div className="space-y-3">
          <Label>Preferred Flooring</Label>
          <div className="flex flex-wrap gap-2">
            {flooringOptions.map((flooring) => (
              <Badge
                key={flooring}
                variant={criteria.preferredFlooring.includes(flooring) ? "default" : "outline"}
                className="cursor-pointer hover-elevate"
                onClick={() => toggleFlooring(flooring)}
                data-testid={`badge-flooring-${flooring.toLowerCase()}`}
              >
                {flooring}
              </Badge>
            ))}
          </div>
        </div>

        {/* Facing Preferences */}
        <div className="space-y-3">
          <Label>Preferred Facing Direction</Label>
          <div className="flex flex-wrap gap-2">
            {facingOptions.map((facing) => (
              <Badge
                key={facing}
                variant={criteria.preferredFacing.includes(facing) ? "default" : "outline"}
                className="cursor-pointer hover-elevate"
                onClick={() => toggleFacing(facing)}
                data-testid={`badge-facing-${facing.toLowerCase().replace('-', '')}`}
              >
                {facing}
              </Badge>
            ))}
          </div>
        </div>

        {/* Air Conditioning */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="aircon"
            checked={criteria.requiresAircon}
            onCheckedChange={(checked) => setCriteria(prev => ({ ...prev, requiresAircon: !!checked }))}
            data-testid="checkbox-requires-aircon"
          />
          <Label htmlFor="aircon">Requires Air Conditioning</Label>
        </div>

        {/* Saved Searches */}
        {savedSearches.length > 0 && (
          <div className="space-y-3">
            <Label>Saved Searches</Label>
            <div className="space-y-2">
              {savedSearches.map((saved, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 justify-start"
                    onClick={() => loadSavedSearch(saved.criteria)}
                    data-testid={`button-load-search-${index}`}
                  >
                    {saved.name}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          <Button 
            onClick={handleSearch}
            className="flex-1"
            data-testid="button-search"
          >
            <Search className="w-4 h-4 mr-2" />
            Search Properties
          </Button>
          <Button 
            variant="outline"
            onClick={() => setShowSaveDialog(true)}
            data-testid="button-save-criteria"
          >
            <Save className="w-4 h-4" />
          </Button>
        </div>

        {/* Save Dialog */}
        {showSaveDialog && (
          <div className="space-y-3 p-4 bg-muted rounded-md">
            <Label htmlFor="saveName">Save Search As:</Label>
            <Input
              id="saveName"
              placeholder="My Search"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              data-testid="input-save-name"
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSave} data-testid="button-confirm-save">
                Save
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => setShowSaveDialog(false)}
                data-testid="button-cancel-save"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
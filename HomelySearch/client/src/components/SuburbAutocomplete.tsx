import { useState, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import australianSuburbs from "@/data/australian-suburbs.json";

interface Suburb {
  suburb: string;
  state: string;
  postcode: string;
}

interface SuburbAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  testId?: string;
}

export function SuburbAutocomplete({ 
  value, 
  onChange, 
  placeholder = "Enter suburb...",
  testId = "suburb-autocomplete"
}: SuburbAutocompleteProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value);
  const suburbs = australianSuburbs as Suburb[];

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  const filteredSuburbs = suburbs.filter((suburb) =>
    `${suburb.suburb} ${suburb.state}`.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 50);

  const handleSelect = (currentValue: string) => {
    const selectedSuburb = suburbs.find(
      (s) => `${s.suburb}, ${s.state} ${s.postcode}` === currentValue
    );
    
    if (selectedSuburb) {
      const displayValue = `${selectedSuburb.suburb}, ${selectedSuburb.state}`;
      onChange(displayValue);
      setSearchTerm(displayValue);
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          data-testid={testId}
        >
          <span className="truncate">
            {searchTerm || placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput 
            placeholder="Search suburbs..." 
            value={searchTerm}
            onValueChange={setSearchTerm}
            data-testid={`${testId}-input`}
          />
          <CommandList>
            <CommandEmpty>No suburb found.</CommandEmpty>
            <CommandGroup>
              {filteredSuburbs.map((suburb) => {
                const displayValue = `${suburb.suburb}, ${suburb.state} ${suburb.postcode}`;
                const currentSelection = `${suburb.suburb}, ${suburb.state}`;
                
                return (
                  <CommandItem
                    key={displayValue}
                    value={displayValue}
                    onSelect={() => handleSelect(displayValue)}
                    data-testid={`${testId}-option-${suburb.suburb.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        searchTerm === currentSelection ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className="flex flex-col">
                      <span className="font-medium">{suburb.suburb}</span>
                      <span className="text-xs text-muted-foreground">
                        {suburb.state} {suburb.postcode}
                      </span>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

# Property Search Application Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from **Airbnb** and **Zillow** for property discovery UX, with **Notion** influence for personalization and criteria management. This combines visual property showcasing with powerful filtering capabilities.

## Core Design Elements

### Color Palette
**Primary Colors:**
- Primary: 220 85% 20% (Deep navy blue for trust and professionalism)
- Secondary: 220 15% 95% (Light gray for backgrounds)

**Accent Colors:**
- Success: 142 76% 36% (Green for positive indicators)
- Warning: 38 92% 50% (Orange for alerts)
- Info: 217 91% 60% (Blue for information)

**Dark Mode:**
- Background: 220 15% 8%
- Surface: 220 15% 12%
- Text: 220 15% 85%

### Typography
- **Primary Font**: Inter (Google Fonts) - clean, readable for data-heavy content
- **Secondary Font**: Poppins (Google Fonts) - friendly headers and CTAs
- **Font Sizes**: 12px, 14px, 16px, 18px, 24px, 32px hierarchy

### Layout System
**Tailwind Spacing**: Primarily use units 2, 4, 6, 8, 12, 16 for consistent rhythm
- Small gaps: p-2, m-2
- Medium spacing: p-4, m-4, gap-6
- Large sections: p-8, m-8, gap-12
- Container spacing: p-16

### Component Library

**Navigation**
- Sticky header with search toggle
- Sidebar for criteria management (collapsible on mobile)
- Breadcrumb navigation for search refinement

**Property Cards**
- Image carousel with property photos
- Key metrics overlay (price, bedrooms, transport score)
- Quick action buttons (save, compare, view details)
- Status indicators (new, price drop, open inspection)

**Data Displays**
- Comparison tables with sortable columns
- Interactive maps with property markers
- Progress bars for criteria matching scores
- Tag system for property features

**Forms & Filters**
- Multi-step criteria setup wizard
- Advanced filter panels with range sliders
- Location search with autocomplete
- Saved search management

**Overlays**
- Property detail modals with full information
- Criteria editing side panels
- Loading states for scraping progress
- Success/error notifications

### Visual Hierarchy
- **Hero Section**: Clean search interface with minimal distractions
- **Property Grid**: Card-based layout with clear visual separation
- **Criteria Panel**: Organized sections with clear labels and controls
- **Comparison View**: Side-by-side layout with aligned data points

### Interaction Patterns
- Hover states for property cards (subtle elevation)
- Loading skeletons during data fetching
- Progressive disclosure for detailed property information
- Contextual tooltips for complex features

## Images
**Property Photos**: High-quality listing images in 16:9 aspect ratio cards
**Map Integration**: Interactive street view and satellite imagery
**Icons**: Heroicons for UI elements (transport, amenities, property features)
**Hero Image**: No large hero image - focus on immediate search functionality instead

This design balances the visual appeal needed for property discovery with the data-dense functionality required for comparison and analysis.
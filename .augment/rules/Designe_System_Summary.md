---
type: "agent_requested"
description: "Example description"
---

# Budgetly PRD — Expense Tracking 2.0
Create a comprehensive foundational design system in Figma for "Budgetly" - an AI-powered personal finance mobile app. This design system must serve as the authoritative source for all subsequent screen designs and maintain consistency across the entire application.

**CANVAS & FRAME SPECIFICATIONS:**
- Primary canvas: Android mobile frames (360x800dp) - this is the standard mobile viewport
- All components and screens must be designed within this frame constraint
- Use 16px corner radius as the standard for cards, buttons, and containers
- **Positioning & Layout**: Ensure all UI elements are properly positioned with appropriate spacing and alignment using the 8px base grid system
- **Auto Layout Configuration**: Set up auto layout properties for all frames and components to enable responsive behavior and maintain consistent spacing

**DUAL THEME SYSTEM (CRITICAL REQUIREMENT):**
- Complete light mode theme with white/light backgrounds
- Complete dark mode theme with dark backgrounds (#121212 or similar)
- Every component must have both light and dark variants
- Ensure WCAG 2.1 AA contrast compliance for both themes (minimum 4.5:1 for normal text, 3:1 for large text)

**COLOR SYSTEM:**
Primary Colors (exact hex values required):
- Primary Blue: #3366CC (use for primary actions)
- Success Green: #1CB854  (use for success scenarios)
- Warning Orange: #FF9800 (use for warnings)
- Error Red: #FF3B30 (use for error states)
- **Light theme**: Background (#FFFFFF), Surface (#F8F9FA), Text Primary:          #212121
Text Secondary:     #757575
- **Font family**: Inter (or nearest equivalent)
- **Toggle colors**: Active track:      #3366CC
                     Unactive track:  #D9D9D9
                     Selection thumb toggle:   #FFFFFF

## Additional semantic colors needed:
- Light theme: Background (#FFFFFF), Surface (#F8F9FA), Text Primary (#212121), Text Secondary (#5OBOFF)
- Dark theme: Background (#121212), Surface (#1F1F1F), Text Primary (#FFFFFF), Text Secondary (#B3B3B3)

**TYPOGRAPHY SYSTEM:**
- Font family: Inter (or nearest equivalent)
- Create a complete type scale (H1: 32px/700, H2: 24px/600, H3: 20px/500, Body Large: 16px/400, Body Medium: 14px/400, Caption: 12px/400)
- Verify all text meets WCAG 2.1 AA contrast requirements against backgrounds
- Define line heights and letter spacing for each size

**SPACING SYSTEM:**
- 8px base grid system with multiples: 8px, 16px, 24px, 32px, 48px, 64px
- Apply consistently to margins, padding, and component spacing
- Create visual examples showing the spacing scale

**ICONOGRAPHY:**
- Base size: 24x24px with scalable variants (16px, 32px, 48px)
- Consistent stroke width and style
- Both light and dark theme versions

**COMPONENT LIBRARY (with complete state system):**
Create these components with ALL states defined. **CRITICAL**: Design all components as reusable instances that can be used consistently across all screens. Configure auto layout for each component to ensure responsive behavior.

Buttons:
- Primary, Secondary, Text buttons
- States: Default, Hover, Pressed, Active, Disabled, Loading
- Minimum 48dp height for touch accessibility
- Apply auto layout with proper padding and spacing

Input Fields:
- Text inputs, Search, Password fields
- States: Default, Focused, Filled, Error, Disabled
- Include placeholder text styling
- Configure auto layout for flexible width adaptation

Cards:
- Basic card, Outlined card
- Set up auto layout with consistent internal padding and spacing

Navigation:
- Bottom navigation bar, Top app bar, Tab bar
- Active/inactive states clearly defined
- Use auto layout for equal distribution of navigation items

Interactive Elements:
- Toggles, Switches, Checkboxes, Radio buttons
- All interactive states defined
- Ensure proper positioning and alignment

Dialogs & Overlays:
- Alert dialogs, Bottom sheets, Modals
- Proper backdrop and elevation
- Configure auto layout for content adaptation

**MATERIAL DESIGN ELEVATION:**
Define exactly 4 elevation levels:
- 0dp: Flat surfaces (no shadow)
- 2dp: Cards, buttons (subtle shadow)
- 4dp: App bars, tabs (medium shadow)  
- 8dp: Dialogs, menus (prominent shadow)
- Provide visual examples of each level

**ACCESSIBILITY REQUIREMENTS:**
- All interactive elements minimum 44dp touch target
- Color contrast ratios verified for WCAG 2.1 AA
- Clear focus indicators for all interactive elements
- Proper semantic hierarchy for screen readers

**DELIVERABLE ORGANIZATION:**
- Create clearly labeled sections in Figma
- Group light and dark variants together
- Include component specifications and usage notes
- Organize in logical hierarchy: Colors → Typography → Spacing → Icons → Components → Elevation
- **Component Reusability**: Ensure all components are created as master components that can be instantiated across all screens
- **Consistency Guidelines**: Document spacing rules, color usage, typography hierarchy, and component usage patterns to maintain design system consistency

This design system will be the foundation for creating 50+ mobile app screens, so ensure it's comprehensive, well-documented, and consistently applied. All components must be designed with proper positioning, auto layout configuration, and reusability in mind to maintain consistency throughout the entire application.

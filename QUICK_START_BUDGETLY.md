# BUDGETLY DESIGN SYSTEM - QUICK START GUIDE

## 🚀 Get Started in 3 Steps

### Step 1: Prepare Your AI Agent (2 minutes)

#### Option A: Using Claude Desktop or Cursor
```
1. Connect to Figma using the MCP plugin
2. Join your Figma channel
3. Activate the design system prompt:
   "Use the design_system_strategy prompt"
```

#### Option B: Direct Prompt
Copy and paste this to your AI agent:

```
I need you to create the Budgetly design system in Figma. 

CRITICAL REQUIREMENTS:
1. Use ONLY Figma MCP tools
2. Convert all colors to RGB 0-1 format
3. Configure auto-layout for every component
4. Create ALL component states
5. Follow the 8px grid system
6. Implement both light and dark themes

Please read the specification from:
prompts/budgetly-design-system-enhanced.md

And follow the implementation guide from:
prompts/budgetly-implementation-guide.md

Start with Phase 1: Initial Setup
```

---

### Step 2: Provide the Specification (1 minute)

Give your AI agent access to these files:
- ✅ `prompts/budgetly-design-system-enhanced.md` (Main specification)
- ✅ `prompts/budgetly-implementation-guide.md` (Step-by-step guide)

Or copy the key specifications below:

---

### Step 3: Execute Phase by Phase (60-90 minutes total)

Monitor progress through each phase:

#### ✅ Phase 1: Setup (5-10 min)
- [ ] Connected to Figma
- [ ] Main frame created
- [ ] Section headers added

#### ✅ Phase 2: Colors (10-15 min)
- [ ] Primary colors created (4 colors)
- [ ] Light theme neutrals (4 colors)
- [ ] Dark theme neutrals (4 colors)
- [ ] All colors labeled

#### ✅ Phase 3: Typography (15-20 min)
- [ ] H1 created with properties
- [ ] H2 created with properties
- [ ] H3 created with properties
- [ ] Body Large created
- [ ] Body Medium created
- [ ] Caption created

#### ✅ Phase 4: Buttons (20-30 min)
- [ ] Primary button - Default
- [ ] Primary button - Hover
- [ ] Primary button - Pressed
- [ ] Primary button - Disabled
- [ ] Secondary button variants
- [ ] Text button variants

#### ✅ Phase 5: Inputs (20-30 min)
- [ ] Text input - Default
- [ ] Text input - Focused
- [ ] Text input - Error
- [ ] Text input - Disabled

#### ✅ Phase 6: Verification (10 min)
- [ ] All colors in RGB 0-1 format
- [ ] Auto-layout configured
- [ ] Accessibility validated
- [ ] Sample screens created

---

## 📋 ESSENTIAL SPECIFICATIONS

### Colors (RGB 0-1 Format)

#### Primary Colors
```javascript
Primary Blue:   {r: 0.2,   g: 0.4,   b: 0.8,   a: 1}
Success Green:  {r: 0.11,  g: 0.72,  b: 0.33,  a: 1}
Warning Orange: {r: 1,     g: 0.596, b: 0,     a: 1}
Error Red:      {r: 1,     g: 0.231, b: 0.188, a: 1}
```

#### Light Theme
```javascript
Background:     {r: 1,     g: 1,     b: 1,     a: 1}
Surface:        {r: 0.973, g: 0.976, b: 0.980, a: 1}
Text Primary:   {r: 0.129, g: 0.129, b: 0.129, a: 1}
Text Secondary: {r: 0.459, g: 0.459, b: 0.459, a: 1}
```

#### Dark Theme
```javascript
Background:     {r: 0.071, g: 0.071, b: 0.071, a: 1}
Surface:        {r: 0.122, g: 0.122, b: 0.122, a: 1}
Text Primary:   {r: 1,     g: 1,     b: 1,     a: 1}
Text Secondary: {r: 0.702, g: 0.702, b: 0.702, a: 1}
```

### Typography Scale
```
H1:          32px / 700 / 40px line-height / -0.5px letter-spacing
H2:          24px / 600 / 32px line-height / -0.25px letter-spacing
H3:          20px / 500 / 28px line-height / 0px letter-spacing
Body Large:  16px / 400 / 24px line-height / 0px letter-spacing
Body Medium: 14px / 400 / 20px line-height / 0px letter-spacing
Caption:     12px / 400 / 16px line-height / 0.4px letter-spacing
```

### Component Dimensions
```
Mobile Frame:    360 x 800 px
Button Height:   48 px
Input Height:    56 px
Card Width:      328 px (360 - 32 margin)
Corner Radius:   16 px
```

### Spacing System (8px Grid)
```
xs:  8px   (tight spacing)
sm:  16px  (small spacing)
md:  24px  (medium spacing)
lg:  32px  (large spacing)
xl:  48px  (extra large spacing)
xxl: 64px  (maximum spacing)
```

---

## 🎯 CRITICAL REMINDERS FOR AI AGENT

### ✅ DO:
1. **Convert colors**: Always use RGB 0-1 format
2. **Set auto-layout**: Configure for every component
3. **Create all states**: Don't skip any state variants
4. **Follow 8px grid**: All spacing must be multiples of 8
5. **Verify each step**: Use get_node_info() after creation
6. **Use parentId**: Maintain proper hierarchy
7. **Set corner radius**: 16px for all components
8. **Both themes**: Create light and dark variants

### ❌ DON'T:
1. Use hex colors directly
2. Skip auto-layout configuration
3. Create components without states
4. Use arbitrary spacing values
5. Forget to set padding and alignment
6. Mix naming conventions
7. Skip accessibility validation
8. Create only one theme

---

## 🔧 TOOL SEQUENCE TEMPLATE

### For Every Component:
```javascript
// 1. Create frame
create_frame({x, y, width, height, name, fillColor})

// 2. Set corner radius
set_corner_radius({nodeId, radius: 16})

// 3. Configure auto-layout
set_layout_mode({nodeId, layoutMode: "HORIZONTAL"})
set_padding({nodeId, paddingTop, paddingBottom, paddingLeft, paddingRight})
set_axis_align({nodeId, primaryAxisAlignItems, counterAxisAlignItems})
set_item_spacing({nodeId, itemSpacing})

// 4. Add children
create_text({x: 0, y: 0, text, fontSize, fontWeight, parentId})

// 5. Style children
set_fill_color({nodeId, r, g, b, a})

// 6. Verify
get_node_info({nodeId})
```

---

## 📊 PROGRESS TRACKING

### Time Estimates
- **Total Time**: 60-90 minutes
- **Foundation (Colors + Typography)**: 25-35 minutes
- **Components (Buttons + Inputs)**: 40-60 minutes
- **Verification**: 10 minutes

### Completion Percentage
```
Phase 1 Complete: 10%
Phase 2 Complete: 30%
Phase 3 Complete: 50%
Phase 4 Complete: 75%
Phase 5 Complete: 90%
Phase 6 Complete: 100%
```

---

## 🆘 TROUBLESHOOTING

### Issue: Colors look wrong
**Solution**: Verify RGB values are 0-1, not 0-255
```javascript
// Wrong: {r: 51, g: 102, b: 204}
// Right: {r: 0.2, g: 0.4, b: 0.8}
```

### Issue: Auto-layout not working
**Solution**: Call set_layout_mode BEFORE setting padding
```javascript
// Correct order:
1. set_layout_mode()
2. set_padding()
3. set_axis_align()
```

### Issue: Text not visible
**Solution**: Check contrast ratio
```javascript
// Light theme: dark text on light background
text: {r: 0.129, g: 0.129, b: 0.129}
background: {r: 1, g: 1, b: 1}
```

### Issue: Components misaligned
**Solution**: Use 8px grid for all coordinates
```javascript
// Good: x: 16, y: 24, x: 32
// Bad:  x: 15, y: 22, x: 30
```

---

## 🎨 SAMPLE PROMPT FOR AI AGENT

```
Create the Budgetly design system following these exact specifications:

PHASE 1: COLORS
Create color swatches for:
- Primary Blue {r: 0.2, g: 0.4, b: 0.8, a: 1}
- Success Green {r: 0.11, g: 0.72, b: 0.33, a: 1}
- Warning Orange {r: 1, g: 0.596, b: 0, a: 1}
- Error Red {r: 1, g: 0.231, b: 0.188, a: 1}

Each swatch should be 120x120px with label below.

PHASE 2: TYPOGRAPHY
Create text samples for all 6 type styles:
- H1: 32px/700/40px line-height
- H2: 24px/600/32px line-height
- H3: 20px/500/28px line-height
- Body Large: 16px/400/24px line-height
- Body Medium: 14px/400/20px line-height
- Caption: 12px/400/16px line-height

PHASE 3: BUTTON COMPONENT
Create primary button with 4 states:
- Default: Primary blue background, white text
- Hover: Darker blue background
- Pressed: Even darker blue background
- Disabled: Gray background, gray text

Dimensions: HUG x 48px, 16px corner radius, 24px horizontal padding

Use auto-layout: HORIZONTAL, CENTER alignment, 8px item spacing

After each phase, verify with get_node_info() and show me the result.

Start with Phase 1.
```

---

## 📚 REFERENCE FILES

1. **Full Specification**: `prompts/budgetly-design-system-enhanced.md`
2. **Implementation Guide**: `prompts/budgetly-implementation-guide.md`
3. **Analysis Document**: `BUDGETLY_DESIGN_SYSTEM_ANALYSIS.md`
4. **This Quick Start**: `QUICK_START_BUDGETLY.md`

---

## ✅ FINAL CHECKLIST

Before considering the design system complete:

- [ ] All 8 primary/semantic colors created
- [ ] All 6 typography styles created
- [ ] Button component with 4 states
- [ ] Input component with 4 states
- [ ] Card component in both themes
- [ ] All colors in RGB 0-1 format
- [ ] Auto-layout configured for all components
- [ ] 8px grid followed throughout
- [ ] Accessibility requirements met (contrast, touch targets)
- [ ] Naming convention followed
- [ ] Sample mobile screen created (360x800)
- [ ] Design system exported as image

---

## 🎉 SUCCESS CRITERIA

Your design system is complete when:
✅ All components render correctly in Figma
✅ Auto-layout works as expected
✅ Both light and dark themes are functional
✅ All accessibility requirements are met
✅ Components can be used to build actual screens
✅ Design system is well-organized and navigable

---

**Ready to start? Copy the sample prompt above and give it to your AI agent!**

**Estimated completion time: 60-90 minutes**

**Questions? Refer to the full documentation in the reference files.**


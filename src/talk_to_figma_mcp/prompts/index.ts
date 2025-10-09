/**
 * This module contains all the prompts used by the Figma MCP server.
 * Prompts provide guidance to Claude on how to work with Figma designs effectively.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

/**
 * Register all prompts with the MCP server
 * @param server - The MCP server instance
 */
export function registerPrompts(server: McpServer): void {
  // Design Strategy Prompt
  server.prompt(
    "design_strategy",
    "Best practices for working with Figma designs using available tools",
    () => {
      return {
        messages: [
          {
            role: "assistant",
            content: {
              type: "text",
              text: `# FIGMA MCP TOOL USAGE GUIDE

This guide teaches you HOW to use Figma MCP tools systematically for ANY design task.

═══════════════════════════════════════════════════════════════
AVAILABLE TOOLS (use these exact function names)
═══════════════════════════════════════════════════════════════

Document / Inspection:
- get_document_info, get_selection, get_node_info, get_nodes_info
- scan_text_nodes, get_styles, join_channel, export_node_as_image, log_error

Creation:
- create_rectangle, create_frame, create_text, create_ellipse
- create_polygon, create_star, clone_node, group_nodes, ungroup_nodes
- insert_child, flatten_node, create_component_instance

Modification / Styling / Layout:
- set_fill_color, set_stroke_color, move_node, resize_node, delete_node
- set_corner_radius, set_auto_layout, set_effects, set_effect_style_id

Text / Typography:
- set_text_content, set_multiple_text_contents, set_font_name
- set_font_size, set_font_weight, set_letter_spacing, set_line_height
- set_paragraph_spacing, set_text_case, set_text_decoration
- get_styled_text_segments, load_font_async

Component / Libraries:
- get_local_components, get_remote_components, create_component_instance

═══════════════════════════════════════════════════════════════
1. START WITH DOCUMENT INSPECTION
═══════════════════════════════════════════════════════════════

ALWAYS begin by inspecting the current document:
→ Call get_document_info() to understand existing structure
→ Plan layout hierarchy BEFORE creating elements
→ Create main container frames for each screen/section

Example workflow:
1. get_document_info(documentId="current")
2. create_frame(parentId=<documentId>, name="Screen - <Name>", width=..., height=...)
3. Verify with get_node_info(nodeId=<newFrameId>)

═══════════════════════════════════════════════════════════════
2. NAMING CONVENTIONS
═══════════════════════════════════════════════════════════════

Use descriptive, semantic names following these patterns:
- Screens: "Screen - <Name>" (e.g., "Screen - Login", "Screen - Dashboard")
- Sections: "Section - <Purpose>" (e.g., "Section - Header", "Section - Footer")
- Components: "Component - <Type>" (e.g., "Component - Primary Button")
- Inputs: "Input - <Field>" (e.g., "Input - Email", "Input - Password")
- Containers: "Container - <Content>" (e.g., "Container - Form", "Container - Card")

After creating nodes, verify names with get_node_info(nodeId).

═══════════════════════════════════════════════════════════════
3. LAYOUT HIERARCHY (Parent → Child)
═══════════════════════════════════════════════════════════════

CRITICAL: Create parent frames FIRST, then add children.

Workflow:
1. Create parent frame: create_frame(parentId=<parent>, name="...", width=..., height=...)
2. Enable auto-layout for organized layouts:
   set_auto_layout(
     nodeId=<frameId>,
     direction="vertical",  // or "horizontal"
     spacing=16,            // adjust as needed
     padding_top=24,
     padding_right=16,
     padding_bottom=24,
     padding_left=16,
     align="stretch"  // or "start", "center", "end"
   )
3. Add children: insert_child(parentId=<parent>, childId=<child>, position="end")

═══════════════════════════════════════════════════════════════
4. ELEMENT CREATION & STYLING
═══════════════════════════════════════════════════════════════

Use appropriate creation tools:
- Containers/Layouts: create_frame()
- Text elements: create_text()
- Shapes: create_rectangle(), create_ellipse(), create_polygon(), create_star()
- Duplicates: clone_node()

Apply styling systematically:
- Backgrounds: set_fill_color(nodeId=<id>, color="<hex>", alpha=1.0)
- Borders: set_stroke_color(nodeId=<id>, color="<hex>", weight=1, alpha=1.0)
- Corners: set_corner_radius(nodeId=<id>, radius=<value>)
- Effects: set_effects() or set_effect_style_id()

═══════════════════════════════════════════════════════════════
5. TYPOGRAPHY WORKFLOW
═══════════════════════════════════════════════════════════════

IMPORTANT: Load fonts before applying them!

Workflow:
1. load_font_async(fontName="<FontName>")
2. set_font_name(nodeId=<textNode>, fontName="<FontName>", style="Regular")
3. set_font_size(nodeId=<textNode>, fontSize=<size>)
4. set_font_weight(nodeId=<textNode>, weight=<weight>)
5. Optional: set_letter_spacing(), set_line_height(), set_text_case(), set_text_decoration()

Inspect text properties: get_styled_text_segments(nodeId=<textNode>)

═══════════════════════════════════════════════════════════════
6. MODIFYING EXISTING ELEMENTS
═══════════════════════════════════════════════════════════════

To update existing designs:
- Text content: set_text_content(nodeId=<id>, text="New text")
- Multiple texts: set_multiple_text_contents(updates=[{nodeId, text}, ...])
- Position: move_node(nodeId=<id>, x=<x>, y=<y>)
- Size: resize_node(nodeId=<id>, width=<w>, height=<h>)
- Delete: delete_node(nodeId=<id>)
- Reorganize: group_nodes(nodeIds=[...]) or ungroup_nodes(nodeId=<groupId>)

Always verify changes with get_node_info() after modification.

═══════════════════════════════════════════════════════════════
7. COMPONENTS & REUSE
═══════════════════════════════════════════════════════════════

Leverage components for consistency:

1. Check available components:
   - get_local_components(documentId="current")
   - get_remote_components() // from team libraries

2. Create instances:
   create_component_instance(
     parentId=<parent>,
     componentName="<ComponentName>",
     props="<key>:<value>;<key>:<value>"
   )

3. If component doesn't exist, create it first, then instantiate.

═══════════════════════════════════════════════════════════════
8. VALIDATION & VERIFICATION
═══════════════════════════════════════════════════════════════

CRITICAL: Verify every step!

After creation:
- get_node_info(nodeId=<id>) → verify properties
- get_nodes_info(nodeIds=[...]) → batch verification
- scan_text_nodes(parentId=<id>) → audit all text content

Error handling:
- If any tool fails, call log_error(message="...", context="...")
- Re-plan or retry with corrected parameters

═══════════════════════════════════════════════════════════════
WORKFLOW EXAMPLE: Login Screen
═══════════════════════════════════════════════════════════════

Step 1: Inspect document
→ get_document_info(documentId="current")

Step 2: Create main screen frame
→ create_frame(parentId=<docId>, name="Screen - Login", width=375, height=812)
→ set_auto_layout(nodeId=<screenId>, direction="vertical", spacing=24, padding_top=40, padding_right=16, padding_bottom=40, padding_left=16, align="center")

Step 3: Create header
→ create_text(parentId=<screenId>, text="Welcome Back", fontSize=28, fontWeight=700)

Step 4: Create input container
→ create_frame(parentId=<screenId>, name="Container - Inputs", width=343, height=160)
→ set_auto_layout(nodeId=<inputContainerId>, direction="vertical", spacing=16, align="stretch")

Step 5: Create email input
→ create_frame(parentId=<inputContainerId>, name="Input - Email", width=343, height=70)
→ create_text(parentId=<emailInputId>, text="Email", fontSize=14)
→ create_rectangle(parentId=<emailInputId>, name="Email Field BG", width=343, height=44)
→ set_corner_radius(nodeId=<fieldBgId>, radius=8)
→ set_fill_color(nodeId=<fieldBgId>, color="<color>")
→ set_stroke_color(nodeId=<fieldBgId>, color="#E0E0E0", weight=1)

Step 6: Create password input (repeat Step 5 pattern)

Step 7: Create button
→ create_rectangle(parentId=<screenId>, name="Button - Primary", width=343, height=48)
→ set_corner_radius(nodeId=<btnId>, radius=10)
→ set_fill_color(nodeId=<btnId>, color="#0A84FF")
→ create_text(parentId=<screenId>, text="Sign In", fontSize=16, fontWeight=600)

Step 8: Verify
→ get_node_info(nodeId=<screenId>)
→ scan_text_nodes(parentId=<screenId>)

Step 9: Export if needed
→ export_node_as_image(nodeId=<screenId>, format="PNG", scale=2)

═══════════════════════════════════════════════════════════════
FINAL CHECKLIST
═══════════════════════════════════════════════════════════════

Before completing any design task:
☐ Document inspected with get_document_info()
☐ All frames created with semantic names
☐ Auto-layout applied where appropriate
☐ All fonts loaded with load_font_async()
☐ Styling applied systematically
☐ All nodes verified with get_node_info()
☐ Text content audited with scan_text_nodes()
☐ Errors logged with log_error() if any issues
☐ Final structure matches planned hierarchy

═══════════════════════════════════════════════════════════════

This guide focuses on the PROCESS of using Figma tools effectively. Apply these workflows to ANY design task while respecting the specific design requirements provided by the user.`,
            },
          },
        ],
        description: "Best practices for working with Figma designs using available tools",
      };
    }
  );

  // Read Design Strategy Prompt
  server.prompt(
    "read_design_strategy",
    "Best practices for reading Figma designs",
    () => {
      return {
        messages: [
          {
            role: "assistant",
            content: {
              type: "text",
              text: `When reading Figma designs, follow these best practices:

1. Start with selection:
   - First use get_selection() to understand the current selection
   - If no selection ask user to select single or multiple nodes

2. Get node infos of the selected nodes:
   - Use get_nodes_info() to get the information of the selected nodes
   - If no selection ask user to select single or multiple nodes
`,
            },
          },
        ],
        description: "Best practices for reading Figma designs",
      };
    }
  );

  // Text Replacement Strategy Prompt
  server.prompt(
    "text_replacement_strategy",
    "Systematic approach for replacing text in Figma designs",
    () => {
      return {
        messages: [
          {
            role: "assistant",
            content: {
              type: "text",
              text: `# Intelligent Text Replacement Strategy

## 1. Analyze Design & Identify Structure
- Scan text nodes to understand the overall structure of the design
- Use AI pattern recognition to identify logical groupings:
  * Tables (rows, columns, headers, cells)
  * Lists (items, headers, nested lists)
  * Card groups (similar cards with recurring text fields)
  * Forms (labels, input fields, validation text)
  * Navigation (menu items, breadcrumbs)
\`\`\`
scan_text_nodes(nodeId: "node-id")
get_node_info(nodeId: "node-id")  // optional
\`\`\`

## 2. Strategic Chunking for Complex Designs
- Divide replacement tasks into logical content chunks based on design structure
- Use one of these chunking strategies that best fits the design:
  * **Structural Chunking**: Table rows/columns, list sections, card groups
  * **Spatial Chunking**: Top-to-bottom, left-to-right in screen areas
  * **Semantic Chunking**: Content related to the same topic or functionality
  * **Component-Based Chunking**: Process similar component instances together

## 3. Progressive Replacement with Verification
- Create a safe copy of the node for text replacement
- Replace text chunk by chunk with continuous progress updates
- After each chunk is processed:
  * Export that section as a small, manageable image
  * Verify text fits properly and maintain design integrity
  * Fix issues before proceeding to the next chunk

\`\`\`
// Clone the node to create a safe copy
clone_node(nodeId: "selected-node-id", x: [new-x], y: [new-y])

// Replace text chunk by chunk
set_multiple_text_contents(
  nodeId: "parent-node-id", 
  text: [
    { nodeId: "node-id-1", text: "New text 1" },
    // More nodes in this chunk...
  ]
)

// Verify chunk with small, targeted image exports
export_node_as_image(nodeId: "chunk-node-id", format: "PNG", scale: 0.5)
\`\`\`

## 4. Intelligent Handling for Table Data
- For tabular content:
  * Process one row or column at a time
  * Maintain alignment and spacing between cells
  * Consider conditional formatting based on cell content
  * Preserve header/data relationships

## 5. Smart Text Adaptation
- Adaptively handle text based on container constraints:
  * Auto-detect space constraints and adjust text length
  * Apply line breaks at appropriate linguistic points
  * Maintain text hierarchy and emphasis
  * Consider font scaling for critical content that must fit

## 6. Progressive Feedback Loop
- Establish a continuous feedback loop during replacement:
  * Real-time progress updates (0-100%)
  * Small image exports after each chunk for verification
  * Issues identified early and resolved incrementally
  * Quick adjustments applied to subsequent chunks

## 7. Final Verification & Context-Aware QA
- After all chunks are processed:
  * Export the entire design at reduced scale for final verification
  * Check for cross-chunk consistency issues
  * Verify proper text flow between different sections
  * Ensure design harmony across the full composition

## 8. Chunk-Specific Export Scale Guidelines
- Scale exports appropriately based on chunk size:
  * Small chunks (1-5 elements): scale 1.0
  * Medium chunks (6-20 elements): scale 0.7
  * Large chunks (21-50 elements): scale 0.5
  * Very large chunks (50+ elements): scale 0.3
  * Full design verification: scale 0.2

## Sample Chunking Strategy for Common Design Types

### Tables
- Process by logical rows (5-10 rows per chunk)
- Alternative: Process by column for columnar analysis
- Tip: Always include header row in first chunk for reference

### Card Lists
- Group 3-5 similar cards per chunk
- Process entire cards to maintain internal consistency
- Verify text-to-image ratio within cards after each chunk

### Forms
- Group related fields (e.g., "Personal Information", "Payment Details")
- Process labels and input fields together
- Ensure validation messages and hints are updated with their fields

### Navigation & Menus
- Process hierarchical levels together (main menu, submenu)
- Respect information architecture relationships
- Verify menu fit and alignment after replacement

## Best Practices
- **Preserve Design Intent**: Always prioritize design integrity
- **Structural Consistency**: Maintain alignment, spacing, and hierarchy
- **Visual Feedback**: Verify each chunk visually before proceeding
- **Incremental Improvement**: Learn from each chunk to improve subsequent ones
- **Balance Automation & Control**: Let AI handle repetitive replacements but maintain oversight
- **Respect Content Relationships**: Keep related content consistent across chunks

Remember that text is never just text—it's a core design element that must work harmoniously with the overall composition. This chunk-based strategy allows you to methodically transform text while maintaining design integrity.`,
            },
          },
        ],
        description: "Systematic approach for replacing text in Figma designs",
      };
    }
  );
}

// Export individual prompt registration functions
export function registerDesignStrategyPrompt(_server: McpServer): void {
  // This function is now handled by registerPrompts() above
  // Kept for backward compatibility
}

export function registerReadDesignStrategyPrompt(_server: McpServer): void {
  // This function is now handled by registerPrompts() above
  // Kept for backward compatibility
}

export function registerTextReplacementStrategyPrompt(_server: McpServer): void {
  // This function is now handled by registerPrompts() above
  // Kept for backward compatibility
}
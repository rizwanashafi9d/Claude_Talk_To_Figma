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
              text: `When working with Figma designs, follow these best practices and always use available MCP tools in the correct order:

1. Start with Document Structure:
   - Always begin by calling 'get_document_info()' to understand the current document.
   - Plan your layout hierarchy before creating any elements.
   - Create a main container frame for each screen or section using 'create_frame()'.
   - Verify each frame creation with 'get_node_info()'.
   - Use current selection with 'get_selection()' to inspect the active node or frame.
   - Use 'get_styles()' for a color/text style audit when needed.

2. Naming Conventions:
   - Use clear, descriptive, and semantic names for every element.
   - Follow a consistent naming pattern:
     * Screens → "Screen - Login"
     * Containers → "Container - Header"
     * Inputs → "Input - Email"
     * Buttons → "Button - Primary"
   - Group related elements logically and consistently.

3. Layout Hierarchy:
   - Always create parent frames first, then child elements inside them.
   - For form or login screens:
     * Start with the main screen container frame.
     * Create a logo container at the top.
     * Group input fields in a dedicated input container.
     * Add action buttons (login, submit) after inputs.
     * Add secondary elements (forgot password, signup links) last.
   - Use 'set_auto_layout()' to maintain spacing and alignment.

4. Input Fields Structure:
   - Each input field should have its own frame.
   - Add a label text above or inside the input using 'create_text()'.
   - Create a rectangle background for the input field with create_rectangle().
   - Apply 'set_corner_radius()' and 'set_stroke_color()' for styling.
   - Group related inputs (e.g., username/password) together inside a frame.

5. Element Creation & Styling:
   - Use 'create_frame()' for containers and structure.
   - Use 'create_text()' for labels, buttons, and links.
   - Use Shapes: create_rectangle(), create_ellipse(), create_polygon(), create_star()
   - Apply styles using:
     * 'set_fill_color()' for backgrounds.
     * 'set_stroke_color()' for borders.
     * 'set_font_size()', 'set_font_weight()', and 'set_font_name()' for typography, set_letter_spacing(), set_line_height(), set_text_case(), set_text_decoration().
   - Always call 'load_font_async()' before applying any text styles.

6. Modifying Existing Elements:
   - Use 'set_text_content'(nodeId, text) to update text.
   - Adjust layout with 'resize_node()', 'move_node()', or 'delete_node()' if needed.
   - After modification, verify using 'get_node_info()'.
   - Use Effects: set_effects() or set_effect_style_id()

7. Visual Hierarchy:
   - Arrange elements in top-to-bottom logical order.
   - Maintain consistent spacing via auto-layout.
   - Font hierarchy:
     * Large → Headings or welcome text
     * Medium → Input labels
     * Normal → Button text
     * Small → Helper or link text

9. Validation & Verification:
   - After each step, confirm accuracy using:
     * get_node_info(nodeId) for single element.
     * get_nodes_info(nodeIds) for multiple elements.
   - Use scan_text_nodes() to check all text for consistency.
   - Log any detected issue using log_error(message, context).

10. Best Practices:
   - Use parentId correctly to maintain hierarchy.
   - insert_child, flatten_node, create_component_instance
   - Keep related elements grouped inside frames.
   - Ensure spacing and alignment are consistent.
   - Always verify structure before completing a screen.

Example Login Screen Structure:
- Screen - Login (main frame)
  - Logo Container (frame)
    - Logo (image/text)
  - Welcome Text (text)
  - Input Container (frame)
    - Input - Email (frame)
      - Label (text)
      - Field (rectangle)
    - Input - Password (frame)
      - Label (text)
      - Field (rectangle)
  - Button - Login (frame)
    - Button Text (text)
  - Helper Links (frame)
    - Forgot Password (text)
    - Don't have account (text)

Final Checklist:
☐ Document inspected with 'get_document_info()'.
☐ Semantic naming applied.
☐ Auto-layout set for containers.
☐ Fonts loaded and applied.
☐ Verified using 'get_node_info()' and 'scan_text_nodes()'.
☐ All elements grouped and aligned properly.`,

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

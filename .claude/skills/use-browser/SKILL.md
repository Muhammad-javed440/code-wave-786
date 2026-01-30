---
name: use-browser
description: Comprehensive browser automation using Playwright MCP tools for web scraping, testing, monitoring, and interactive web tasks. Use when users need to (1) Extract data from websites, (2) Test web applications, (3) Automate web workflows, (4) Debug or monitor websites, (5) Take screenshots, (6) Fill forms, (7) Navigate and interact with web pages, or any other browser automation task.
---

# Use Browser

Automate browser interactions using Playwright MCP tools for web scraping, testing, debugging, and interactive web tasks.

## Core Workflow

All browser tasks follow this pattern:

1. **Navigate** to the target URL
2. **Snapshot** to understand page structure
3. **Interact** with page elements as needed
4. **Verify** results via snapshots, console, or network
5. **Extract** data or capture evidence

## Essential Tools

### Navigation and Page State

- `browser_navigate` - Navigate to URL
- `browser_navigate_back` - Go to previous page
- `browser_snapshot` - Capture accessibility tree (preferred for understanding page structure)
- `browser_take_screenshot` - Capture visual image (for visual issues or evidence)
- `browser_wait_for` - Wait for text to appear/disappear or time to pass

### Interaction

- `browser_click` - Click elements (buttons, links)
- `browser_type` - Type text into fields
- `browser_fill_form` - Fill multiple form fields at once (recommended)
- `browser_select_option` - Select dropdown options
- `browser_hover` - Hover over elements
- `browser_drag` - Drag and drop between elements
- `browser_press_key` - Press keyboard keys

### Inspection and Debugging

- `browser_console_messages` - Get JavaScript console logs/errors
- `browser_network_requests` - View network requests and responses
- `browser_evaluate` - Execute custom JavaScript
- `mcp__ide__getDiagnostics` - Get language diagnostics if applicable

### Advanced

- `browser_tabs` - Manage multiple tabs
- `browser_handle_dialog` - Handle alerts/confirms
- `browser_file_upload` - Upload files
- `browser_resize` - Resize browser window
- `browser_run_code` - Run custom Playwright code

## Task-Specific Guides

### Web Scraping and Data Extraction

For extracting data from websites, see [references/scraping.md](references/scraping.md).

**Quick pattern**:
```markdown
1. browser_navigate to target URL
2. browser_wait_for expected content to load
3. browser_snapshot to capture page structure
4. Parse snapshot content or use browser_evaluate to extract data
5. Handle pagination by clicking "Next" and repeating
```

**When to read scraping.md**:
- Need to extract data from websites
- Handle dynamic/JavaScript-rendered content
- Scrape multiple pages or paginated data
- Deal with login requirements
- Handle infinite scroll or complex navigation

### Web Testing and Automation

For testing applications and automating workflows, see [references/testing.md](references/testing.md).

**Quick pattern**:
```markdown
1. browser_navigate to application
2. browser_fill_form with test data
3. browser_click submit/action buttons
4. browser_wait_for expected outcome
5. browser_console_messages to verify no errors
6. browser_snapshot to verify final state
```

**When to read testing.md**:
- Test web application functionality
- Automate repetitive web workflows
- Verify form submissions and CRUD operations
- Test navigation and user interactions
- Validate UI behavior and state changes

### Website Monitoring and Debugging

For debugging issues and monitoring websites, see [references/debugging.md](references/debugging.md).

**Quick pattern**:
```markdown
1. browser_navigate to problematic page
2. browser_snapshot to see current state
3. browser_console_messages to check for errors
4. browser_network_requests to find failed requests
5. browser_take_screenshot for visual issues
6. browser_evaluate to inspect application state
```

**When to read debugging.md**:
- Debug JavaScript errors
- Investigate failed network requests
- Diagnose visual or layout issues
- Monitor application performance
- Check application state and storage
- Perform regression testing

## Common Patterns

### Taking Screenshots

**Full page**:
```markdown
browser_take_screenshot with fullPage=true
```

**Specific element**:
```markdown
1. browser_snapshot to get element ref
2. browser_take_screenshot with element description and ref
```

### Filling Forms

**Simple forms** - Use `browser_fill_form`:
```markdown
browser_fill_form with array of fields:
- name: "Email", type: "textbox", ref: <from snapshot>, value: "user@example.com"
- name: "Subscribe", type: "checkbox", ref: <from snapshot>, value: "true"
```

**Complex forms** - Use individual tools:
- `browser_type` for text fields needing special handling
- `browser_click` for individual checkboxes/radios
- `browser_select_option` for dropdowns

### Handling Dynamic Content

```markdown
1. Navigate to page
2. Wait for specific content: browser_wait_for text="Expected text"
3. If content doesn't appear, check console_messages for errors
4. Verify network_requests completed successfully
```

### Working with Dialogs

```markdown
1. Perform action that triggers dialog
2. Handle immediately: browser_handle_dialog accept=true/false
3. For prompts, include promptText parameter
```

### Managing Multiple Tabs

```markdown
1. List tabs: browser_tabs action="list"
2. Open new: browser_tabs action="new"
3. Switch: browser_tabs action="select" index=N
4. Close: browser_tabs action="close" index=N
```

## Best Practices

### Always Snapshot First

Before interacting with elements, use `browser_snapshot` to:
- Understand page structure
- Get element references (refs)
- Verify page loaded correctly
- Identify available interactions

### Use Appropriate Waits

- Wait for specific text: `browser_wait_for text="Success"`
- Wait for text to disappear: `browser_wait_for textGone="Loading..."`
- Wait for time: `browser_wait_for time=2` (seconds)

### Verify Actions Completed

After interactions, verify success:
- Check console for errors: `browser_console_messages`
- Verify network requests succeeded: `browser_network_requests`
- Snapshot to confirm state changed
- Look for success messages or redirects

### Handle Errors Gracefully

- Check console messages for JavaScript errors
- Monitor network for failed requests
- Use try-catch patterns when appropriate
- Provide clear error messages with diagnostic info

### Be Efficient

- Use `browser_fill_form` instead of multiple `browser_type` calls
- Use `browser_snapshot` instead of `browser_take_screenshot` for data extraction
- Minimize navigation - stay on page when possible
- Batch related actions together

## Error Recovery

### Element Not Found

1. Take fresh snapshot to verify element exists
2. Wait for element to appear: `browser_wait_for`
3. Check if page fully loaded
4. Verify correct ref from latest snapshot

### Action Failed

1. Check console_messages for JavaScript errors
2. Review network_requests for failures
3. Take screenshot to see visual state
4. Verify element is clickable/visible/enabled

### Page Not Loading

1. Check network_requests for failed resources
2. Review console_messages for errors
3. Increase wait time
4. Verify URL is correct and accessible

## Browser Management

### Initial Setup

Most users have browsers pre-installed. If you encounter "browser not installed" errors:
```markdown
browser_install - Installs the configured browser
```

### Browser State

- Browser persists between commands in a session
- Use `browser_close` to close browser explicitly
- Cookies and session persist during session
- Local storage and session storage maintained

### Resize for Testing

```markdown
browser_resize width=1920 height=1080  # Desktop
browser_resize width=375 height=667    # Mobile
```

## Reference Files

Load these as needed for detailed patterns:

- **scraping.md** - Web scraping patterns, pagination, dynamic content
- **testing.md** - Testing workflows, verification methods, common scenarios
- **debugging.md** - Debugging techniques, monitoring, error diagnosis

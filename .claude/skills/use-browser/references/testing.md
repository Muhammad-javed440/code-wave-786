# Web Testing and Automation

## Quick Start

1. Navigate to application URL
2. Perform test actions (click, type, fill forms)
3. Verify expected outcomes
4. Check for errors in console/network

## Testing Patterns

### Basic UI Testing

```markdown
1. Navigate to page under test
2. Snapshot to verify initial state
3. Perform user actions
4. Snapshot to verify result
5. Check console for errors
```

### Form Testing

**Simple Form**:
```markdown
1. Navigate to form page
2. Use browser_fill_form with all field values
3. Click submit button
4. Wait for success message or redirect
5. Verify outcome
```

**Complex Form**:
- Use browser_type for individual fields that need special handling
- Use browser_click for checkboxes/radio buttons individually
- Use browser_select_option for dropdowns
- Handle multi-step forms by waiting between steps

### Navigation Testing

```markdown
1. Click navigation element
2. Wait for page load: browser_wait_for
3. Verify URL changed (from snapshot or evaluate)
4. Check page content loaded correctly
```

### Interactive Element Testing

**Buttons**:
```markdown
- Click: browser_click
- Verify action completed
- Check console for errors
```

**Dropdowns**:
```markdown
- Select option: browser_select_option
- Verify selection applied
- Check dependent fields updated
```

**Drag and Drop**:
```markdown
- Use browser_drag from source to target
- Verify element moved/action completed
```

**Hover Effects**:
```markdown
- Use browser_hover on element
- Snapshot to verify hover state
- Check visual changes
```

## Verification Methods

### Visual Verification

- Use browser_snapshot to capture current state
- Compare against expected content/structure
- Check for presence/absence of elements

### Console Verification

```markdown
browser_console_messages: Check for:
- JavaScript errors (error level)
- Warning messages (warning level)
- Expected log output (info/debug level)
```

### Network Verification

```markdown
browser_network_requests: Verify:
- API calls made correctly
- Requests succeeded (status 200/201)
- No unexpected failed requests
- Proper request/response data
```

### State Verification

Use browser_evaluate to check:
- JavaScript variable values
- DOM element states
- Local storage contents
- Session data

Example:
```javascript
() => {
  return {
    isLoggedIn: localStorage.getItem('user') !== null,
    cartItems: window.store.getState().cart.length,
    currentPage: window.location.pathname
  };
}
```

## Common Test Scenarios

### Login Flow

```markdown
1. Navigate to login page
2. Fill credentials: browser_fill_form
3. Click login button
4. Wait for redirect to dashboard
5. Verify user logged in (check elements/state)
6. Check no console errors
```

### CRUD Operations

**Create**:
```markdown
1. Navigate to create form
2. Fill form data
3. Submit
4. Verify success message
5. Verify item appears in list
```

**Read**:
```markdown
1. Navigate to list/detail page
2. Verify data displayed correctly
3. Check all expected fields present
```

**Update**:
```markdown
1. Navigate to edit form
2. Verify current values loaded
3. Modify fields
4. Submit
5. Verify changes applied
```

**Delete**:
```markdown
1. Click delete button
2. Confirm dialog (browser_handle_dialog)
3. Verify item removed
4. Check success notification
```

### File Upload

```markdown
1. Navigate to upload page
2. Use browser_file_upload with file path(s)
3. Wait for upload completion
4. Verify file processed/displayed
```

### Multi-Tab Testing

```markdown
1. Get current tabs: browser_tabs action="list"
2. Open new tab: browser_tabs action="new"
3. Switch tabs: browser_tabs action="select" index=N
4. Test in each tab
5. Close tabs: browser_tabs action="close"
```

## Handling Test Failures

### Debugging Failed Tests

1. Take screenshot: browser_take_screenshot
2. Check console: browser_console_messages
3. Review network: browser_network_requests
4. Evaluate state: browser_evaluate

### Common Issues

**Element Not Found**:
- Wait for element: browser_wait_for
- Check if page loaded fully
- Verify correct selector/ref from snapshot

**Timing Issues**:
- Add appropriate waits
- Wait for specific text to appear
- Check network requests completed

**Dialog Blocking**:
- Handle alerts/confirms: browser_handle_dialog
- Check for unexpected popups

## Best Practices

1. **Always wait for state changes** - Don't assume instant updates
2. **Verify actions completed** - Check console and network
3. **Use meaningful snapshots** - Capture state before/after actions
4. **Handle dialogs promptly** - Don't let alerts block execution
5. **Clean up test data** - Reset state between tests when possible
6. **Check for errors** - Always verify no console errors occurred
7. **Use stable selectors** - Prefer role-based over brittle selectors

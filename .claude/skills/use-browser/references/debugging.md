# Website Monitoring and Debugging

## Quick Start

1. Navigate to the problematic page
2. Take snapshot to see current state
3. Check console for errors
4. Review network requests
5. Investigate and diagnose issue

## Debugging Workflow

### Initial Investigation

```markdown
1. Navigate to page: browser_navigate
2. Capture state: browser_snapshot
3. Check JavaScript errors: browser_console_messages (error level)
4. Check network issues: browser_network_requests
5. Take screenshot if visual issue: browser_take_screenshot
```

### Progressive Debugging

```markdown
1. Identify the issue type (visual, functional, performance)
2. Reproduce the issue consistently
3. Isolate the cause using targeted checks
4. Verify fix resolves the issue
```

## Common Debugging Scenarios

### JavaScript Errors

**Check Console**:
```markdown
browser_console_messages with level="error"
```

Look for:
- Syntax errors
- Reference errors (undefined variables)
- Type errors
- Promise rejections
- Third-party library errors

**Diagnose Source**:
- Use browser_evaluate to check variable states
- Verify expected objects/functions exist
- Check if dependencies loaded correctly

### Network Issues

**Check Failed Requests**:
```markdown
browser_network_requests (failed requests highlighted)
```

Common issues:
- 404: Resource not found
- 500: Server error
- 401/403: Authentication issues
- CORS errors
- Timeout errors

**Investigate API Failures**:
- Check request URL and parameters
- Verify authentication headers
- Check request payload
- Review response data

### Visual/Layout Issues

**Take Screenshots**:
```markdown
browser_take_screenshot for full page or specific element
```

**Check Rendered State**:
```markdown
browser_evaluate to inspect:
- Computed styles: getComputedStyle(element)
- Element dimensions: getBoundingClientRect()
- Visibility: element.offsetParent !== null
- Z-index stacking issues
```

**Responsive Issues**:
```markdown
1. Resize browser: browser_resize
2. Take screenshots at different sizes
3. Check media query breakpoints
```

### Performance Issues

**Slow Page Load**:
```markdown
1. Check network_requests for slow requests
2. Look for large resources
3. Check for blocking scripts
4. Verify async/defer attributes
```

**High Memory Usage**:
```markdown
browser_evaluate to check:
- Memory leaks (growing arrays/objects)
- Event listener accumulation
- Detached DOM nodes
```

### Interactive Element Issues

**Element Not Clickable**:
```markdown
1. Snapshot to verify element visible
2. Hover to check if obscured: browser_hover
3. Check z-index and pointer-events via evaluate
4. Verify element dimensions
```

**Form Not Submitting**:
```markdown
1. Check console for validation errors
2. Verify form fields valid
3. Check network for submit request
4. Look for event.preventDefault() blocking submission
```

### State Management Issues

**Check Application State**:
```markdown
browser_evaluate to inspect:
- Redux/Vuex store state
- React component state
- Local storage data
- Session storage data
- Cookies
```

Example:
```javascript
() => {
  return {
    localStorage: {...localStorage},
    sessionStorage: {...sessionStorage},
    cookies: document.cookie,
    reduxState: window.__REDUX_DEVTOOLS_EXTENSION__?.()
  };
}
```

## Monitoring Patterns

### Continuous Monitoring

```markdown
1. Navigate to page
2. Wait for page to stabilize
3. Check console messages
4. Check network requests
5. Take snapshot/screenshot
6. Repeat at intervals
```

### Error Detection

```markdown
1. Set up monitoring loop
2. Check for new console errors
3. Check for failed network requests
4. Alert on threshold breaches
5. Capture diagnostic information
```

### Regression Testing

```markdown
1. Navigate to feature page
2. Perform critical user actions
3. Verify expected behavior
4. Check no new errors introduced
5. Compare with baseline
```

## Advanced Debugging

### Browser DevTools Integration

**Console Messages**:
- Filter by level (error, warning, info, debug)
- Look for patterns in error messages
- Track error frequency

**Network Analysis**:
- Check request/response timing
- Verify correct headers sent
- Inspect response payloads
- Monitor WebSocket connections

### Custom Diagnostics

Use browser_evaluate for custom checks:

```javascript
// Check for specific conditions
() => {
  const diagnostics = {
    hasJQuery: typeof $ !== 'undefined',
    reactVersion: window.React?.version,
    userAgent: navigator.userAgent,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight
    },
    performance: performance.timing
  };
  return diagnostics;
}
```

### Screenshot Comparison

```markdown
1. Take baseline screenshot: browser_take_screenshot
2. Make changes or wait for issue
3. Take comparison screenshot
4. Identify visual differences
```

### Multi-Browser Testing

```markdown
1. Close current browser: browser_close
2. Change browser configuration
3. Reopen and navigate
4. Compare behavior across browsers
```

## Debugging Tools

### Available Browser Tools

- **Snapshot**: Accessibility tree view of page structure
- **Screenshot**: Visual capture of page or elements
- **Console Messages**: JavaScript execution logs and errors
- **Network Requests**: HTTP/API call monitoring
- **Evaluate**: Custom JavaScript execution for inspection

### Diagnostic Checklist

When debugging, systematically check:

- [ ] Console for JavaScript errors
- [ ] Network for failed requests
- [ ] Page loaded completely
- [ ] Required resources loaded (CSS, JS, images)
- [ ] No CORS issues
- [ ] Authentication working
- [ ] Form validation passing
- [ ] Event handlers attached
- [ ] State initialized correctly
- [ ] No timing/race conditions

## Best Practices

1. **Reproduce consistently** - Ensure reliable reproduction steps
2. **Isolate the issue** - Narrow down to specific component/action
3. **Check console first** - Errors often reveal root cause
4. **Verify network** - Many issues are API-related
5. **Use snapshots liberally** - Understand page state
6. **Take screenshots** - Visual reference for layout issues
7. **Document findings** - Track patterns and solutions
8. **Test fixes** - Verify issue resolved completely

# Web Scraping and Data Extraction

## Quick Start

1. Navigate to the target URL
2. Take a snapshot to understand page structure
3. Extract data using selectors or evaluation
4. Handle pagination and dynamic content

## Common Patterns

### Basic Page Scraping

```markdown
1. Navigate to URL: browser_navigate
2. Wait for content: browser_wait_for
3. Snapshot page: browser_snapshot
4. Extract data: browser_evaluate or analyze snapshot content
```

### Multi-Page Scraping

```markdown
1. Navigate to starting URL
2. Extract data from current page
3. Find and click "Next" button: browser_click
4. Repeat until no more pages
```

### Dynamic Content

For JavaScript-rendered content:
- Use browser_wait_for to wait for specific text/elements
- Use browser_snapshot after content loads
- Check console messages if content fails to load: browser_console_messages

### Data Extraction Methods

**From Snapshot (Preferred)**:
- browser_snapshot returns structured content
- Parse markdown output for text and links
- More efficient than evaluate for simple text extraction

**From JavaScript Evaluation**:
- Use browser_evaluate for complex DOM queries
- Access computed styles, hidden data
- Execute custom extraction logic

Example:
```javascript
browser_evaluate: () => {
  return Array.from(document.querySelectorAll('.product')).map(el => ({
    title: el.querySelector('.title').textContent,
    price: el.querySelector('.price').textContent,
    url: el.querySelector('a').href
  }));
}
```

## Handling Common Scenarios

### Login Required

```markdown
1. Navigate to login page
2. Fill form: browser_fill_form with credentials
3. Click submit button: browser_click
4. Wait for redirect: browser_wait_for
5. Proceed with scraping
```

### Infinite Scroll

```markdown
1. Take initial snapshot
2. Scroll to bottom: browser_evaluate with window.scrollTo
3. Wait for new content: browser_wait_for
4. Repeat until no new content appears
```

### Rate Limiting

- Use browser_wait_for with time parameter between requests
- Monitor network_requests for rate limit responses
- Implement exponential backoff if needed

### CAPTCHA/Bot Detection

- May require human intervention
- Consider using browser_take_screenshot to show CAPTCHA
- Some sites may block automation entirely

## Error Handling

- Check console_messages for JavaScript errors
- Monitor network_requests for failed API calls
- Use browser_wait_for to ensure content loads
- Handle navigation failures gracefully

## Best Practices

1. **Always snapshot first** - Understand page structure before extracting
2. **Wait for content** - Don't assume immediate rendering
3. **Respect robots.txt** - Check site policies
4. **Handle errors** - Network issues, missing elements
5. **Be efficient** - Minimize unnecessary navigation
6. **Use appropriate selectors** - Role-based when possible

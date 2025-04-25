// playwright-highlight-operator-tags.js
const { chromium } = require('playwright');

/**
 * Scans a webpage for elements with operator tags and highlights them
 * @param {string} url - The URL of the webpage to test
 * @param {string} operatorAttr - The specific operator attribute to highlight (e.g., 'operator-info', 'operator-access')
 * @param {string} attrValue - Optional specific value to match (e.g., 'allow', 'deny')
 */
async function highlightOperatorTags(url, operatorAttr = null, attrValue = null) {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Navigate to the specified URL
  await page.goto(url);
  console.log(`Navigated to ${url}`);
  
  // Wait for the page to be fully loaded
  await page.waitForLoadState('networkidle');
  
  // Inject a style to create a highlight effect we can apply to elements
  await page.addStyleTag({
    content: `
      .operator-highlight {
        outline: 3px solid red !important;
        background-color: rgba(255, 0, 0, 0.1) !important;
        position: relative;
      }
      
      .operator-badge {
        position: absolute;
        top: 0;
        left: 0;
        background-color: red;
        color: white;
        padding: 2px 6px;
        font-size: 12px;
        border-radius: 3px;
        max-width: 300px;
        word-wrap: break-word;
        z-index: 10000;
      }
    `
  });
  
  // Function to find and highlight elements with operator tags
  const highlightResults = await page.evaluate((operatorAttr, attrValue) => {
    const results = {
      total: 0,
      byType: {},
      elements: []
    };
    
    // Find all elements with attribute names starting with "operator-"
    const allElements = document.querySelectorAll('*');
    const operatorElements = [];
    
    allElements.forEach(el => {
      const attributes = Array.from(el.attributes);
      const operatorAttributes = attributes.filter(attr => 
        attr.name.startsWith('operator-') || el.tagName.toLowerCase() === 'operator'
      );
      
      if (operatorAttributes.length > 0 || el.tagName.toLowerCase() === 'operator') {
        // If looking for specific attribute and value, filter accordingly
        if (operatorAttr) {
          if (attrValue) {
            // Match specific attribute and value
            if (el.getAttribute(operatorAttr) === attrValue) {
              operatorElements.push(el);
            }
          } else {
            // Match any element with the specific attribute
            if (el.hasAttribute(operatorAttr)) {
              operatorElements.push(el);
            }
          }
        } else {
          // No specific attribute requested, include all operator-tagged elements
          operatorElements.push(el);
        }
      }
    });
    
    results.total = operatorElements.length;
    
    // Apply highlighting to found elements
    operatorElements.forEach((el, index) => {
      // Create a badge to show the operator attributes
      const badge = document.createElement('div');
      badge.className = 'operator-badge';
      
      // Collect all operator attributes
      const attributes = Array.from(el.attributes);
      const operatorAttributes = attributes
        .filter(attr => attr.name.startsWith('operator-'))
        .map(attr => `${attr.name}="${attr.value}"`);
      
      // If it's an operator tag itself, note that too
      if (el.tagName.toLowerCase() === 'operator') {
        operatorAttributes.unshift('<operator> element');
      }
      
      // Create the badge content
      badge.textContent = operatorAttributes.join(', ');
      
      // Add the highlight class
      el.classList.add('operator-highlight');
      
      // Add the badge to the element
      el.style.position = 'relative';
      el.appendChild(badge);
      
      // Track statistics
      operatorAttributes.forEach(attr => {
        const attrName = attr.split('=')[0];
        results.byType[attrName] = (results.byType[attrName] || 0) + 1;
      });
      
      // Save information about this element
      const rect = el.getBoundingClientRect();
      results.elements.push({
        tagName: el.tagName,
        attributes: operatorAttributes,
        position: {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height
        }
      });
    });
    
    return results;
  }, operatorAttr, attrValue);
  
  // Output results
  console.log(`Found ${highlightResults.total} elements with operator tags`);
  console.log('Breakdown by attribute type:');
  console.log(highlightResults.byType);
  
  if (highlightResults.total === 0) {
    console.log('No operator tags found on this page.');
  } else {
    console.log('Elements have been highlighted on the page.');
    console.log('Press Enter to exit...');
    
    // Keep the browser open until the user presses Enter
    await new Promise(resolve => process.stdin.once('data', resolve));
  }
  
  await browser.close();
  return highlightResults;
}

// Example usage:
// 1. Find and highlight all elements with any operator tag
// highlightOperatorTags('http://example.com/your-page.html');

// 2. Find and highlight only elements with the operator-access attribute
// highlightOperatorTags('http://example.com/your-page.html', 'operator-access');

// 3. Find and highlight only elements with operator-access="deny"
// highlightOperatorTags('http://example.com/your-page.html', 'operator-access', 'deny');

// Run the script with parameters from command line
if (require.main === module) {
  // Check if URL is provided as command line argument
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.log('Usage: node playwright-highlight-operator-tags.js <url> [operatorAttr] [attrValue]');
    console.log('Examples:');
    console.log('  node playwright-highlight-operator-tags.js https://example.com');
    console.log('  node playwright-highlight-operator-tags.js https://example.com operator-access');
    console.log('  node playwright-highlight-operator-tags.js https://example.com operator-access deny');
    process.exit(1);
  }
  
  const url = args[0];
  const operatorAttr = args.length >= 2 ? args[1] : null;
  const attrValue = args.length >= 3 ? args[2] : null;
  
  highlightOperatorTags(url, operatorAttr, attrValue)
    .catch(err => {
      console.error('Error:', err);
      process.exit(1);
    });
}

module.exports = { highlightOperatorTags };
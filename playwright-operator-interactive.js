// playwright-operator-interactive.js
const { chromium } = require('playwright');

/**
 * Scans a webpage for elements with operator tags, highlights them, and allows clicking
 * @param {string} url - The URL of the webpage to test
 * @param {string} operatorAttr - The specific operator attribute to highlight (e.g., 'operator-info', 'operator-access')
 * @param {string} attrValue - Optional specific value to match (e.g., 'allow', 'deny')
 * @param {boolean} enableClicking - Whether to enable interactive clicking mode
 */
async function interactWithOperatorTags(url, operatorAttr = null, attrValue = null, enableClicking = true) {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Navigate to the specified URL
  await page.goto(url);
  console.log(`Navigated to ${url}`);
  
  // Wait for the page to be fully loaded
  await page.waitForLoadState('networkidle');
  
  // Inject styles for highlighting and interactive elements
  await page.addStyleTag({
    content: `
      .operator-highlight {
        outline: 3px solid red !important;
        background-color: rgba(255, 0, 0, 0.1) !important;
        position: relative !important;
        cursor: pointer !important;
        transition: all 0.3s ease !important;
      }
      
      .operator-highlight:hover {
        outline: 3px solid darkred !important;
        background-color: rgba(255, 0, 0, 0.2) !important;
      }
      
      .operator-badge {
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        background-color: red !important;
        color: white !important;
        padding: 2px 6px !important;
        font-size: 12px !important;
        border-radius: 3px !important;
        max-width: 300px !important;
        word-wrap: break-word !important;
        z-index: 10000 !important;
        pointer-events: none !important;
      }
      
      .operator-click-overlay {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        background-color: rgba(0, 0, 0, 0.7) !important;
        z-index: 9999 !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: center !important;
        align-items: center !important;
        color: white !important;
        font-family: sans-serif !important;
        padding: 20px !important;
      }
      
      .operator-controls {
        position: fixed !important;
        bottom: 20px !important;
        right: 20px !important;
        background-color: #333 !important;
        color: white !important;
        padding: 10px !important;
        border-radius: 5px !important;
        z-index: 10001 !important;
        font-family: sans-serif !important;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5) !important;
      }
      
      .operator-controls button {
        background-color: #555 !important;
        color: white !important;
        border: none !important;
        padding: 5px 10px !important;
        margin: 0 5px !important;
        border-radius: 3px !important;
        cursor: pointer !important;
      }
      
      .operator-controls button:hover {
        background-color: #777 !important;
      }
      
      .operator-highlight.operator-selected {
        outline: 3px solid blue !important;
        background-color: rgba(0, 0, 255, 0.2) !important;
      }
    `
  });
  
  // Inject the interactive control panel and set up event handlers
  if (enableClicking) {
    await page.evaluate(() => {
      // Create control panel
      const controlPanel = document.createElement('div');
      controlPanel.className = 'operator-controls';
      controlPanel.innerHTML = `
        <div style="margin-bottom: 10px;">Operator Tag Controls</div>
        <button id="clickSelectedBtn">Click Selected Element</button>
        <button id="showAllBtn">Show All Elements</button>
        <button id="exitBtn">Exit Interactive Mode</button>
      `;
      document.body.appendChild(controlPanel);
      
      // Set up global state
      window.operatorInteractive = {
        selectedElement: null,
        originalClick: null,
        exitCallback: null
      };
      
      // Event listeners for control buttons
      document.getElementById('clickSelectedBtn').addEventListener('click', () => {
        if (window.operatorInteractive.selectedElement) {
          console.log('Clicking selected element');
          
          // Store the original click event temporarily
          const originalElement = window.operatorInteractive.selectedElement;
          
          // Remove the highlighting and selection to make the click more natural
          originalElement.classList.remove('operator-highlight');
          originalElement.classList.remove('operator-selected');
          
          // Find and remove the badge if it exists
          const badge = originalElement.querySelector('.operator-badge');
          if (badge) badge.remove();
          
          // Execute the click
          originalElement.click();
          
          // Re-add the highlighting after a short delay
          setTimeout(() => {
            originalElement.classList.add('operator-highlight');
          }, 1000);
        } else {
          alert('No element selected. Please select an element first.');
        }
      });
      
      document.getElementById('showAllBtn').addEventListener('click', () => {
        const elements = document.querySelectorAll('.operator-highlight');
        elements.forEach(el => {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
      });
      
      document.getElementById('exitBtn').addEventListener('click', () => {
        if (window.operatorInteractive.exitCallback) {
          window.operatorInteractive.exitCallback();
        }
      });
      
      // Function to handle selection of operator-tagged elements
      window.selectOperatorElement = (element) => {
        // Deselect previous element if any
        if (window.operatorInteractive.selectedElement) {
          window.operatorInteractive.selectedElement.classList.remove('operator-selected');
        }
        
        // Select new element
        element.classList.add('operator-selected');
        window.operatorInteractive.selectedElement = element;
        
        // Scroll element into view
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Log the element details
        console.log('Selected element:', element);
        console.log('Operator attributes:', Array.from(element.attributes)
          .filter(attr => attr.name.startsWith('operator-'))
          .map(attr => `${attr.name}="${attr.value}"`));
      };
    });
  }
  
  // Function to find and highlight elements with operator tags
  const highlightResults = await page.evaluate((operatorAttr, attrValue, enableClicking) => {
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
      if (el.style.position !== 'fixed' && el.style.position !== 'absolute') {
        el.style.position = 'relative';
      }
      el.appendChild(badge);
      
      // Add click handlers for interactive mode
      if (enableClicking) {
        el.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          window.selectOperatorElement(el);
          return false;
        });
      }
      
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
  }, operatorAttr, attrValue, enableClicking);
  
  // Output results
  console.log(`Found ${highlightResults.total} elements with operator tags`);
  console.log('Breakdown by attribute type:');
  console.log(highlightResults.byType);
  
  if (highlightResults.total === 0) {
    console.log('No operator tags found on this page.');
    await browser.close();
    return highlightResults;
  }
  
  if (enableClicking) {
    console.log('\nInteractive Mode Instructions:');
    console.log('1. Click on any highlighted element to select it');
    console.log('2. Use the control panel buttons to interact:');
    console.log('   - "Click Selected Element": Performs a click on the selected element');
    console.log('   - "Show All Elements": Scrolls through all tagged elements');
    console.log('   - "Exit Interactive Mode": Closes the browser and exits the program');
    
    // Set up a way for the page to signal when to exit
    await page.exposeFunction('signalExit', () => {
      console.log('Exiting interactive mode...');
      browser.close();
    });
    
    // Connect the exit button to our exposed function
    await page.evaluate(() => {
      window.operatorInteractive.exitCallback = () => window.signalExit();
    });
    
    // Wait for the exit signal
    await page.waitForFunction(() => false, { timeout: 0 }).catch(() => {});
  } else {
    console.log('Elements have been highlighted on the page.');
    console.log('Press Enter to exit...');
    
    // Keep the browser open until the user presses Enter
    await new Promise(resolve => process.stdin.once('data', resolve));
    await browser.close();
  }
  
  return highlightResults;
}

// Example usage:
// 1. Find, highlight, and enable clicking all elements with any operator tag
// interactWithOperatorTags('http://example.com/your-page.html');

// 2. Find and highlight only elements with the operator-access attribute
// interactWithOperatorTags('http://example.com/your-page.html', 'operator-access');

// 3. Find and highlight only elements with operator-access="deny"
// interactWithOperatorTags('http://example.com/your-page.html', 'operator-access', 'deny');

// 4. Disable interactive clicking mode
// interactWithOperatorTags('http://example.com/your-page.html', null, null, false);

// Run the script with parameters from command line
if (require.main === module) {
  // Check if URL is provided as command line argument
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.log('Usage: node playwright-operator-interactive.js <url> [operatorAttr] [attrValue] [--no-click]');
    console.log('Examples:');
    console.log('  node playwright-operator-interactive.js https://example.com');
    console.log('  node playwright-operator-interactive.js https://example.com operator-access');
    console.log('  node playwright-operator-interactive.js https://example.com operator-access deny');
    console.log('  node playwright-operator-interactive.js https://example.com --no-click');
    process.exit(1);
  }
  
  const url = args[0];
  
  // Check if --no-click flag is present
  const noClickIndex = args.findIndex(arg => arg === '--no-click');
  const enableClicking = noClickIndex === -1;
  
  // Remove the --no-click flag from the args if present
  if (noClickIndex !== -1) {
    args.splice(noClickIndex, 1);
  }
  
  const operatorAttr = args.length >= 2 ? args[1] : null;
  const attrValue = args.length >= 3 ? args[2] : null;
  
  interactWithOperatorTags(url, operatorAttr, attrValue, enableClicking)
    .catch(err => {
      console.error('Error:', err);
      process.exit(1);
    });
}

module.exports = { interactWithOperatorTags };
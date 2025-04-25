# Operator Tags

An open standard for AI agent interaction with web content.

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Status: Draft](https://img.shields.io/badge/Status-Draft-orange.svg)
![Version: 0.1.0](https://img.shields.io/badge/Version-0.1.0-green.svg)

**Website**: [www.operatortags.com](https://www.operatortags.com)

## Overview

Operator Tags is an open standard designed to enable AI agents and assistants to safely and effectively interact with web content. By embedding semantic metadata directly into HTML elements, website owners can specify how AI systems should interpret, access, and interact with their content.

### Purpose

- Give website owners control over AI interactions with their content
- Protect sensitive or proprietary information
- Ensure accurate interpretation of web content by AI systems
- Create AI-friendly interactive experiences
- Develop paywalled or premium content with clear access controls

## Quick Start

The simplest way to start using Operator Tags is to add attributes to your HTML elements:

```html
<!-- Basic information for AI agents -->
<div operator-info="product description" operator-access="allow">
    Product details here...
</div>

<!-- Content that AI agents should not access -->
<div operator-access="deny">
    Internal pricing strategy notes...
</div>

<!-- Content requiring payment to access -->
<div operator-access="conditional" operator-must-pay="true">
    Premium analysis content...
</div>
```

## Core Attributes

| Attribute | Description | Values | Example |
|-----------|-------------|--------|---------|
| `operator-info` | Descriptive information | String | `operator-info="product pricing"` |
| `operator-label` | Short reference label | String | `operator-label="price-tag"` |
| `operator-role` | Semantic role | String | `operator-role="navigation"` |
| `operator-access` | Access permission | allow, deny, conditional | `operator-access="allow"` |
| `operator-importance` | Processing priority | critical, high, medium, low | `operator-importance="high"` |

## Access Control Tags

Control whether and how AI agents can access your content:

```html
<!-- Basic access control -->
<div operator-access="allow">Allowed content</div>
<div operator-access="deny">Restricted content</div>

<!-- Conditional access -->
<div operator-access="conditional" operator-must-authenticate="true">
    Content requiring authentication
</div>

<!-- Must-read content -->
<div operator-must-read="true">
    Important disclaimer that AI must present to users
</div>

<!-- Paid content -->
<div operator-must-pay="true">
    Premium content requiring payment
</div>
```

## Content Protection Tags

Protect your content from unwanted AI actions:

```html
<!-- Prevent screenshots -->
<div operator-no-screenshot="true">Confidential information</div>

<!-- Prevent quoting -->
<div operator-no-quote="true">Do not quote this content</div>

<!-- Prevent summarization -->
<div operator-no-summarize="true">Do not summarize this content</div>

<!-- Specify attribution requirements -->
<div operator-attribution="© 2025 Example Corp">Content with attribution</div>
```

## Implementation Methods

There are three ways to implement Operator Tags:

### 1. Direct HTML Attributes

Add attributes directly to HTML elements:

```html
<p operator-info="pricing details" operator-access="allow">$99.99</p>
```

### 2. Custom Element

Use the dedicated `<operator>` element:

```html
<operator operator-info="special instructions" operator-access="allow">
    Instructions for AI agents...
</operator>
```

### 3. HTTP Headers

For page-wide settings, use HTTP headers:

```
Operator-Access: deny-screenshot
Operator-Access-Control: must-authenticate
Operator-Privacy: no-process-pii
```

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to get involved.

## Specification

For the complete specification, see [SPECIFICATION.md](SPECIFICATION.md).

## Examples

For implementation examples, see [EXAMPLES.md](EXAMPLES.md).

## Testing Tools

We provide several Playwright-based tools to help you test and visualize your implementation of Operator Tags.

### 1. Highlighting Operator Tags

The `playwright-highlight-operator-tags.js` script helps you identify and visualize elements with operator tags on your website.

```bash
# Install dependencies
npm install playwright

# Basic usage - highlights all operator tags
node playwright-highlight-operator-tags.js https://your-website.com

# Filter by specific attribute
node playwright-highlight-operator-tags.js https://your-website.com operator-access

# Filter by specific attribute and value
node playwright-highlight-operator-tags.js https://your-website.com operator-access deny
```

### 2. Interactive Clicking Tool

The `playwright-operator-interactive.js` script allows you to not only highlight elements with operator tags but also interactively click on them to test behavior.

```bash
# Basic usage with interactive clicking
node playwright-operator-interactive.js https://your-website.com

# Focus on elements with operator-can-click="true"
node playwright-operator-interactive.js https://your-website.com operator-can-click true

# Disable interactive mode (highlighting only)
node playwright-operator-interactive.js https://your-website.com --no-click
```

This tool provides a control panel with options to:
- Click the selected element
- Show all tagged elements
- Exit interactive mode

### 3. Form Filling Tool

The `playwright-operator-typing.js` script specializes in testing input fields with operator tags, particularly those with the `operator-can-fill` attribute.

```bash
# Test elements with operator-can-fill="true"
node playwright-operator-typing.js https://your-website.com

# Test all input elements regardless of operator tags
node playwright-operator-typing.js https://your-website.com "" ""

# Test elements with specific attributes
node playwright-operator-typing.js https://your-website.com operator-access allow
```

This tool provides advanced features:
- Type custom text into selected elements
- Fill all fields simultaneously
- Generate context-aware random data for each field type
- Clear all fields
- Submit forms

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

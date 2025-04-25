# Operator Tags Specification

Version: 0.1.0  
Status: Draft  
Last Updated: April 25, 2025

## Introduction

This document defines the Operator Tags specification, an open standard for marking up web content with metadata that guides AI agents on how to interact with and process that content.

## Conformance Requirements

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC2119](https://tools.ietf.org/html/rfc2119).

## Terminology

- **Operator Tag**: An HTML attribute or custom element that defines how AI agents should interact with content.
- **AI Agent**: Any automated system that processes web content, including but not limited to web crawlers, digital assistants, and AI models.
- **Content Owner**: The person or entity that owns or manages the web content.

## Core Attributes

### operator-info

Provides descriptive information about the element for AI agents.

- **Value Type**: String
- **Usage**: `operator-info="product pricing information"`

### operator-label

Provides a short label for the element that AIs can reference.

- **Value Type**: String
- **Usage**: `operator-label="price-tag"`

### operator-role

Defines the semantic role of the element (similar to ARIA roles).

- **Value Type**: String
- **Usage**: `operator-role="navigation"`

### operator-importance

Indicates the importance level for AI processing.

- **Value Type**: Enumerated - "critical", "high", "medium", "low"
- **Usage**: `operator-importance="high"`

### operator-version

Indicates the version of the operator tag specification.

- **Value Type**: String (semver)
- **Usage**: `operator-version="1.0.0"`

## Access Control Attributes

### operator-access

Controls whether AI agents can access, process, or interact with content.

- **Value Type**: Enumerated - "allow", "deny", "conditional"
- **Usage**: `operator-access="allow"`

### operator-must-pay

Indicates content requires payment to access.

- **Value Type**: Boolean or payment details
- **Usage**: `operator-must-pay="true"` or `operator-must-pay="subscription-required"`

### operator-must-authenticate

Requires authentication before access.

- **Value Type**: Boolean
- **Usage**: `operator-must-authenticate="true"`

### operator-must-read

Content must be read/presented to users.

- **Value Type**: Boolean
- **Usage**: `operator-must-read="true"`

### operator-access-level

Required access level for content.

- **Value Type**: Enumerated - "public", "registered", "premium", "admin"
- **Usage**: `operator-access-level="premium"`

### operator-condition

Custom condition for access.

- **Value Type**: String
- **Usage**: `operator-condition="subscription-active"`

## Interaction Attributes

### operator-can-click

Whether AI can click/activate this element.

- **Value Type**: Boolean
- **Usage**: `operator-can-click="true"`

### operator-can-fill

Whether AI can fill in form fields.

- **Value Type**: Boolean
- **Usage**: `operator-can-fill="true"`

### operator-can-navigate

Whether AI can navigate to linked resources.

- **Value Type**: Boolean
- **Usage**: `operator-can-navigate="true"`

### operator-can-select

Whether AI can select options.

- **Value Type**: Boolean
- **Usage**: `operator-can-select="true"`

### operator-interaction

General interaction permissions.

- **Value Type**: Enumerated - "none", "read", "limited", "full"
- **Usage**: `operator-interaction="limited"`

## Content Control Attributes

### operator-no-screenshot

Prevents taking screenshots of content.

- **Value Type**: Boolean
- **Usage**: `operator-no-screenshot="true"`

### operator-no-quote

Prevents quoting this content.

- **Value Type**: Boolean
- **Usage**: `operator-no-quote="true"`

### operator-no-summarize

Prevents summarizing this content.

- **Value Type**: Boolean
- **Usage**: `operator-no-summarize="true"`

### operator-no-translate

Prevents translation of content.

- **Value Type**: Boolean
- **Usage**: `operator-no-translate="true"`

### operator-attribution

Attribution requirements.

- **Value Type**: String
- **Usage**: `operator-attribution="© 2025 Example Inc."`

### operator-license

License information for content.

- **Value Type**: String
- **Usage**: `operator-license="CC-BY-4.0"`

## Semantic Attributes

### operator-content-type

Type of content contained.

- **Value Type**: String
- **Usage**: `operator-content-type="product-description"`

### operator-language

Language of the content.

- **Value Type**: ISO language code
- **Usage**: `operator-language="en-US"`

### operator-sentiment

Intended sentiment of content.

- **Value Type**: Enumerated - "positive", "negative", "neutral"
- **Usage**: `operator-sentiment="positive"`

### operator-context

Additional context information.

- **Value Type**: String
- **Usage**: `operator-context="financial advice disclaimer"`

### operator-entity

Entity information (person, place, etc.).

- **Value Type**: String
- **Usage**: `operator-entity="organization: Acme Inc."`

## Privacy Attributes

### operator-pii

Indicates presence of Personally Identifiable Information.

- **Value Type**: Boolean
- **Usage**: `operator-pii="true"`

### operator-no-store

Content should not be stored.

- **Value Type**: Boolean
- **Usage**: `operator-no-store="true"`

### operator-no-process

Content should not be processed.

- **Value Type**: Boolean
- **Usage**: `operator-no-process="true"`

### operator-privacy-level

Privacy sensitivity level.

- **Value Type**: Enumerated - "public", "low", "medium", "high", "critical"
- **Usage**: `operator-privacy-level="high"`

### operator-data-category

Category of data contained.

- **Value Type**: String
- **Usage**: `operator-data-category="health"`

## Implementation Methods

Operator Tags can be implemented in three ways:

### 1. HTML Attributes

Add attributes directly to HTML elements:

```html
<div operator-info="product description" operator-access="allow">
    Product details here
</div>
```

### 2. Custom Element

Use the dedicated `<operator>` element:

```html
<operator operator-info="special instructions" operator-access="allow">
    Instructions for AI agents
</operator>
```

### 3. HTTP Headers

For page-wide settings, use HTTP headers:

```
Operator-Access: deny-screenshot
Operator-Access-Control: must-authenticate
Operator-Privacy: no-process-pii
```

## Processing Model

AI agents encountering Operator Tags SHOULD follow this processing model:

1. Parse all operator tags in the document.
2. Respect access controls before processing content.
3. Apply interaction restrictions during content interaction.
4. Apply content protection rules when storing or outputting content.
5. Use semantic information to enhance understanding of content.
6. Apply privacy protections as specified.

## Security Considerations

- Operator Tags are advisory and rely on AI agent compliance.
- Content owners should not rely solely on Operator Tags for security-critical content protection.
- AI providers should implement appropriate validation to prevent spoofing or misleading tags.

## Privacy Considerations

- AI agents SHOULD respect privacy tags to protect user data.
- Content with `operator-pii="true"` SHOULD be handled with additional care.
- When `operator-no-store="true"` is present, AI agents SHOULD NOT permanently store the content.

## Backwards Compatibility

Operator Tags are designed to be ignored by web browsers and other agents that do not understand them, ensuring backwards compatibility with existing web infrastructure.

## Future Considerations

The following areas are being considered for future versions of the specification:

- Standardized vocabulary for common content types and contexts
- Authentication and verification mechanisms
- Integration with existing semantic web standards
- Machine-readable policy expressions
- Inheritance rules for nested elements
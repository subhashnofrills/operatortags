# Operator Tags Examples

This document provides practical examples of how to implement Operator Tags in various scenarios.

## Basic Examples

### Simple Page Section

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Example Page</title>
</head>
<body>
    <h1 operator-info="page title" operator-access="allow">Welcome to Our Website</h1>
    
    <div operator-info="public description" operator-access="allow">
        <p>This is our company's public information that can be freely accessed by AI agents.</p>
    </div>
    
    <div operator-info="internal notes" operator-access="deny">
        <p>These are internal notes that should not be processed by AI agents.</p>
        <p>Profit margin target: 35%</p>
    </div>
</body>
</html>
```

### Mixed Content Page

```html
<article operator-info="news article" operator-content-type="news">
    <h1 operator-access="allow">Breaking News: New Renewable Energy Policy</h1>
    
    <div class="byline" operator-access="allow">
        By Jane Smith, Senior Energy Correspondent
    </div>
    
    <div class="article-content" operator-access="allow" operator-no-quote="false">
        The government announced today a new renewable energy policy that will
        dramatically change how energy is produced and consumed.
    </div>
    
    <div class="subscriber-only" 
         operator-access="conditional" 
         operator-must-authenticate="true"
         operator-info="premium content">
        According to insider sources, this policy will impact the energy sector by...
    </div>
    
    <div class="comments" operator-access="allow" operator-info="user comments">
        <div class="comment">This policy is long overdue! - GreenEnergy23</div>
        <div class="comment">I'm concerned about implementation costs - EconomyFirst</div>
    </div>
</article>
```

## E-commerce Examples

### Product Page

```html
<div class="product-container">
    <h1 operator-info="product name" operator-access="allow">Ultra HD Smart TV</h1>
    
    <div class="product-images" operator-access="allow" operator-no-screenshot="true">
        <img src="tv-front.jpg" alt="TV Front View">
        <img src="tv-side.jpg" alt="TV Side View">
    </div>
    
    <div class="product-description" operator-info="product details" operator-access="allow">
        65-inch Ultra HD Smart TV with voice control and AI-powered picture quality.
    </div>
    
    <div class="pricing" operator-info="pricing details" operator-access="allow">
        <p>Regular Price: $1,299.99</p>
        <p>Sale Price: $999.99</p>
    </div>
    
    <div class="internal-notes" operator-access="deny">
        Profit margin: 22%, Competitor pricing: $1,099 at BestBuy
    </div>
    
    <div class="reviews" operator-access="allow" operator-info="customer reviews">
        <div class="review">★★★★★ Amazing picture quality! - John D.</div>
        <div class="review">★★★★☆ Good TV for the price. - Sarah M.</div>
    </div>
    
    <div class="premium-content" 
         operator-access="conditional" 
         operator-must-pay="true" 
         operator-info="expert review">
        Expert analysis: This TV outperforms competitors in its price range by...
    </div>
</div>
```

### Checkout Form

```html
<form operator-info="checkout form">
    <div class="form-section" operator-info="customer information">
        <label for="name">Full Name:</label>
        <input type="text" id="name" 
               operator-can-fill="true" 
               operator-info="customer name">
        
        <label for="email">Email:</label>
        <input type="email" id="email" 
               operator-can-fill="true" 
               operator-info="customer email" 
               operator-pii="true">
    </div>
    
    <div class="form-section" operator-info="payment information" operator-privacy-level="high">
        <label for="card-number">Credit Card Number:</label>
        <input type="text" id="card-number" 
               operator-can-fill="false" 
               operator-info="credit card number" 
               operator-pii="true">
        
        <label for="cvv">CVV:</label>
        <input type="text" id="cvv" 
               operator-can-fill="false" 
               operator-info="security code" 
               operator-pii="true">
    </div>
    
    <button type="submit" 
            operator-can-click="true" 
            operator-info="submit order button">
        Complete Order
    </button>
</form>
```

## Content Websites

### Blog Article with Paywall

```html
<article>
    <h1 operator-access="allow" operator-info="article title">
        10 Essential Tips for Sustainable Living
    </h1>
    
    <div class="author-info" operator-access="allow" operator-info="author information">
        By Maria Johnson | Published: April 20, 2025
    </div>
    
    <div class="article-preview" operator-access="allow" operator-info="free preview">
        <p>Sustainable living has become increasingly important in today's world. 
           Here we share some practical tips that anyone can implement...</p>
        
        <p>The first tip is to reduce single-use plastics by investing in reusable 
           alternatives such as water bottles, shopping bags, and food containers.</p>
    </div>
    
    <div class="paywall-notice" operator-access="allow" operator-info="paywall notice">
        <p>To continue reading, please subscribe to our premium content.</p>
        <button operator-can-click="true" operator-info="subscription button">
            Subscribe Now
        </button>
    </div>
    
    <div class="premium-content" 
         operator-access="conditional" 
         operator-must-pay="true" 
         operator-info="premium article content">
        <p>2. Opt for energy-efficient appliances to reduce your carbon footprint...</p>
        <p>3. Start composting to divert waste from landfills...</p>
        <!-- Additional premium content -->
    </div>
</article>
```

### Must-Read Disclaimer

```html
<div class="legal-disclaimer" 
     operator-access="allow" 
     operator-must-read="true" 
     operator-info="important legal disclaimer">
    <p>The information provided on this website does not constitute professional medical advice. 
       Always consult with a qualified healthcare provider before making any decisions 
       regarding your health.</p>
</div>
```

## Advanced Usage

### Custom Operator Element

```html
<div class="content-section">
    <h2>Investment Opportunities</h2>
    
    <p>Our company offers various investment options including stocks, bonds, and mutual funds.</p>
    
    <operator operator-info="financial disclaimer" 
             operator-must-read="true" 
             operator-access="allow">
        Past performance is not indicative of future results. Investment involves risk.
        All investment decisions should be made after consulting with a financial advisor.
    </operator>
    
    <div class="investment-details">
        <!-- Investment details here -->
    </div>
</div>
```

### HTTP Headers Example

For page-wide settings, you can use HTTP headers:

```
Operator-Access: allow
Operator-No-Screenshot: true
Operator-Must-Authenticate: false
Operator-Privacy-Level: medium
```

### Mixed Tag Types

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Mixed Tag Types Example</title>
    <!-- Page-level settings via meta tags -->
    <meta name="operator-version" content="1.0.0">
    <meta name="operator-access" content="allow">
</head>
<body>
    <h1>Financial Planning Guide</h1>
    
    <!-- Standard div with operator attributes -->
    <div operator-info="introduction" operator-access="allow">
        <p>This guide helps you understand the basics of financial planning.</p>
    </div>
    
    <!-- Using the operator element -->
    <operator operator-info="risk warning" operator-must-read="true">
        All investments carry risk. You may lose some or all of your investment.
    </operator>
    
    <!-- Conditional access section -->
    <section operator-access="conditional" operator-must-authenticate="true">
        <h2>Premium Financial Strategies</h2>
        <p>This section contains our premium investment strategies...</p>
    </section>
    
    <!-- Form with interaction controls -->
    <form>
        <label for="investment-amount">Investment Amount:</label>
        <input type="number" id="investment-amount" 
               operator-can-fill="true" 
               operator-info="investment amount field">
               
        <button type="submit" 
                operator-can-click="true" 
                operator-info="calculate returns button">
            Calculate Returns
        </button>
    </form>
</body>
</html>
```

## Implementation Best Practices

1. **Be Specific with Information**:
   ```html
   <!-- Good -->
   <div operator-info="quarterly revenue data" operator-access="deny">
       Q1 2025: $1.2M
   </div>
   
   <!-- Better -->
   <div operator-info="internal quarterly revenue data" 
        operator-access="deny"
        operator-privacy-level="high"
        operator-data-category="financial">
       Q1 2025: $1.2M
   </div>
   ```

2. **Group Related Content**:
   ```html
   <!-- Apply tags to container elements when possible -->
   <section operator-access="allow" operator-info="company history">
       <h2>Our History</h2>
       <p>Founded in 2010, our company has...</p>
       <p>In 2015, we expanded to international markets...</p>
   </section>
   ```

3. **Be Consistent**:
   Use consistent naming conventions and attribute values across your site.

4. **Don't Over-Tag**:
   Focus on important elements that need special handling rather than tagging everything.
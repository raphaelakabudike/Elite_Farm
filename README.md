# GreenFields Poultry Farm Website

A modern, responsive website for a poultry farm business featuring e-commerce functionality, product catalog, and customer engagement features.

## 🌟 Features

### Core Pages
- **Homepage**: Eye-catching hero section, featured products, testimonials, and trust indicators
- **About Us**: Farm story, mission, values, timeline, and team introduction
- **Products**: Filterable product catalog with detailed information
- **Contact**: Contact form, business information, and map integration placeholder
- **Shopping Cart**: Full cart management with quantity controls and order summary
- **FAQ**: Collapsible questions organized by category
- **Delivery Info**: Delivery zones, schedules, and fees
- **Legal Pages**: Privacy Policy, Terms & Conditions, Refund Policy

### E-commerce Features
- Product catalog with 6 sample products (eggs, broilers, layers)
- Add to cart functionality with localStorage persistence
- Shopping cart with quantity management
- Order summary with delivery fee calculation
- Product filtering by category
- Responsive product cards with hover effects

### Design Features
- Modern, premium design with vibrant colors
- Fully responsive (mobile, tablet, desktop)
- Smooth animations and transitions
- Glassmorphism effects
- Custom design system with CSS variables
- SEO-optimized structure

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for best experience)

### Installation

1. **Simple Method** (Double-click to open):
   - Navigate to the project folder
   - Double-click `index.html` to open in your default browser

2. **Using a Local Server** (Recommended):
   
   **Option A: Using Python**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Then open http://localhost:8000 in your browser
   ```
   
   **Option B: Using PHP**
   ```bash
   php -S localhost:8000
   
   # Then open http://localhost:8000 in your browser
   ```
   
   **Option C: Using VS Code Live Server**
   - Install "Live Server" extension in VS Code
   - Right-click on `index.html`
   - Select "Open with Live Server"

## 📁 Project Structure

```
baryonic-pioneer/
├── index.html              # Homepage
├── about.html              # About Us page
├── products.html           # Products catalog
├── contact.html            # Contact page
├── cart.html               # Shopping cart
├── faq.html                # FAQ page
├── delivery.html           # Delivery information
├── privacy.html            # Privacy policy
├── terms.html              # Terms & conditions
├── refund.html             # Refund policy
├── styles/
│   ├── global.css          # Design system & base styles
│   ├── components.css      # Navigation & footer styles
│   ├── home.css            # Homepage-specific styles
│   └── notifications.css   # Notification styles
└── js/
    ├── main.js             # Main JavaScript functionality
    └── cart.js             # Cart-specific functionality
```

## 🎨 Design System

### Color Palette
- **Primary Green**: `#2d5016` (Deep Forest Green)
- **Primary Light**: `#4a7c2c` (Fresh Green)
- **Secondary Orange**: `#d97706` (Warm Orange)
- **Accent Yellow**: `#fbbf24` (Egg Yolk Yellow)

### Typography
- **Headings**: Outfit (Google Fonts)
- **Body**: Inter (Google Fonts)

## 🛠️ Customization

### Updating Products
Edit the `products` array in `js/main.js`:

```javascript
const products = [
    {
        id: 'unique-id',
        name: 'Product Name',
        category: 'Category',
        price: 45,
        unit: 'per unit',
        description: 'Product description',
        image: 'path/to/image.jpg',
        badge: 'Badge Text',
        available: true
    },
    // Add more products...
];
```

### Changing Colors
Update CSS variables in `styles/global.css`:

```css
:root {
    --color-primary: #2d5016;
    --color-secondary: #d97706;
    /* ... other colors */
}
```

### Adding Images
Replace placeholder images by:
1. Creating an `assets/images/` folder
2. Adding your product images
3. Updating the `image` property in the products array

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript**: No frameworks, pure JS
- **LocalStorage**: For cart persistence

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Performance
- No external dependencies (except Google Fonts)
- Optimized CSS with minimal specificity
- Efficient JavaScript with event delegation
- Fast loading times

## 🚀 Deployment

### Deploy to GitHub Pages
1. Create a GitHub repository
2. Push your code
3. Go to Settings > Pages
4. Select main branch as source
5. Your site will be live at `https://username.github.io/repo-name`

### Deploy to Netlify
1. Drag and drop the project folder to Netlify
2. Your site will be live instantly

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts

## 📝 Future Enhancements

- Backend integration for real orders
- Payment gateway integration (Stripe, PayStack)
- User authentication and accounts
- Order tracking system
- Admin dashboard
- Blog section
- Live chat support
- Email notifications
- Product reviews and ratings

## 📄 License

This project is created for demonstration purposes. Feel free to use and modify as needed.

## 👥 Contact

For questions or support:
- Email: info@greenfieldspoultry.com
- Phone: +233 24 123 4567

---

**Built with ❤️ for GreenFields Poultry Farm**

# Kanwalpreet Singh - AI/ML Portfolio

A modern, responsive portfolio website showcasing AI/ML projects, achievements, and professional experience. Built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Live Features

- **Dynamic Content Management**: All content managed via YAML files for easy updates
- **Real-time LeetCode Integration**: Live stats from LeetCode profile
- **Animated Counters**: Smooth counting animations for all statistics
- **Responsive Design**: Optimized for all devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **SEO Optimized**: Meta tags and structured data for better search visibility

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Content Management**: YAML files with API routes
- **External APIs**: LeetCode Stats API

## 📁 Project Structure

```
├── content/                 # YAML content files
│   ├── hero.yml            # Hero section content
│   ├── about.yml           # About page content
│   ├── projects.yml        # Projects data
│   ├── achievements.yml    # Achievements and awards
│   ├── contact.yml         # Contact information
│   ├── demos.yml           # Demo applications
│   └── testimonials.yml    # Client testimonials
├── src/
│   ├── app/                # Next.js App Router pages
│   ├── components/         # React components
│   ├── lib/                # Utility functions
│   └── types/              # TypeScript type definitions
├── public/                 # Static assets
└── scripts/                # Development scripts
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ikanwalkhalsa/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Content Management

All website content is managed through YAML files in the `content/` directory:

- **hero.yml**: Hero section, stats, and main messaging
- **about.yml**: Bio, journey, and expertise areas
- **projects.yml**: Project portfolio with detailed descriptions
- **achievements.yml**: Awards, certifications, and achievements
- **contact.yml**: Contact information and form settings
- **demos.yml**: AI demo applications

### Updating Content

1. Edit the relevant YAML file in `content/`
2. The development server automatically refreshes content
3. Changes are reflected immediately in the browser

## 🎨 Key Features

### Dynamic Statistics
- Real-time LeetCode statistics integration
- Animated counters for all metrics
- Customizable stats display

### Project Showcase
- 12+ AI/ML projects with detailed descriptions
- Technology stacks and impact metrics
- GitHub links and demo availability

### Professional Achievements
- Coding competitions and awards
- Professional certifications
- LinkedIn integration

### Interactive Elements
- Smooth scroll animations
- Hover effects and transitions
- Responsive testimonials carousel

## 🔧 Development Scripts

```bash
# Development with auto-refresh
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type checking
npm run type-check
```

## 🌐 Deployment Options

### 1. Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### 2. Docker
```bash
# Build image
docker build -t portfolio .

# Run container
docker run -p 3000:3000 portfolio
```

### 3. Traditional Hosting
```bash
# Build static export
npm run build

# Deploy the 'out' directory to your hosting provider
```

## 🔗 External Integrations

- **LeetCode API**: Real-time coding statistics
- **LinkedIn**: Professional profile integration
- **GitHub**: Project repositories and contributions

## 📱 Responsive Design

- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interactions
- Fast loading times

## 🎯 SEO Features

- Meta tags optimization
- Structured data markup
- Open Graph tags
- Twitter Card support
- Sitemap generation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

- **Email**: [Your Email]
- **LinkedIn**: [https://www.linkedin.com/in/ikanwalkhalsa/](https://www.linkedin.com/in/ikanwalkhalsa/)
- **GitHub**: [https://github.com/ikanwalkhalsa](https://github.com/ikanwalkhalsa)
- **LeetCode**: [https://leetcode.com/u/kanwalpreetsingh/](https://leetcode.com/u/kanwalpreetsingh/)

---

Built with ❤️ using Next.js and TypeScript
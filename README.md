# The Lattice Network

A sophisticated landing page for The Lattice - a community for young, analytical, systems-oriented minds shaping business with depth, foresight, and integrity.

## 🚀 Features

- **Animated Lattice Background**: Dynamic canvas-based network visualization with glowing nodes
- **Ambient Grid Animation**: Subtle drifting geometric patterns
- **Wave Animations**: Flowing SVG waves for depth
- **Intelligent Cursor Interactions**: Magnetic pull and dynamic highlighting (desktop)
- **Diagonal Section Transitions**: Smooth reveal animations mirroring the lattice concept
- **Fully Responsive**: Optimized for all devices (mobile, tablet, desktop)
- **Performance Optimized**: Built with Next.js 15 for maximum speed

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.5 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + shadcn/ui
- **Animations**: Framer Motion

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Install dependencies
npm install

# Run development server
npm run dev
```

## 🌐 Deploy to Vercel

### Quick Deploy

1. Push your code to GitHub/GitLab
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Click "Deploy"

### Build Configuration

Vercel will automatically detect Next.js and use these settings:

- **Build Command**: `npm install && npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

## 🎨 Design System

- **Colors**: Deep navy gradient (#0a1b2f → #122a45)
- **Typography**: Inter font family
- **Style**: Minimal, futuristic, analytical
- **Animations**: Subtle, deliberate, systems-oriented

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── LatticeBackground.tsx
│   ├── AmbientGrid.tsx
│   ├── WaveAnimation.tsx
│   ├── CursorInteraction.tsx
│   ├── SectionTransition.tsx
│   └── ...
└── lib/                 # Utility functions
    └── utils.ts
```

## 🔧 Development

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## ⚡ Performance Optimizations

- Server Components by default
- Image optimization with Next.js Image
- Automatic code splitting
- Canvas-based animations (GPU accelerated)
- Lazy loading for sections
- Optimized bundle size

## 🐛 Troubleshooting

### Build Fails on Vercel

1. Check that `.npmrc` contains `legacy-peer-deps=true`
2. Ensure no lock files are committed (package-lock.json, bun.lock)
3. Check build logs for specific errors

### Animations Not Working

1. Ensure JavaScript is enabled
2. Check browser console for errors
3. Try clearing browser cache

### Responsive Issues

1. Test on actual devices, not just browser resize
2. Check viewport meta tag in layout.tsx
3. Verify Tailwind responsive classes are applied

## 📝 License

All rights reserved - The Lattice Network

## 🤝 Contact

- Email: [your-email]
- Discord: [your-discord]
- LinkedIn: [your-linkedin]

---

**"Truth emerges from clarity, not noise."**
# E-Commerce Project

A modern e-commerce application built with React, Redux, and Tailwind CSS.

## Tech Stack

- React (Vite)
- Redux & Redux Thunk
- React Router v5
- Tailwind CSS
- Axios
- React Toastify
- Lucide React Icons

## Features

- Modern and responsive design
- Image slider with multiple banners
- Product catalog
- Shopping cart functionality
- User authentication
- Secure checkout process

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```

## Deployment

### Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

### Alternative Deployment Options

#### Netlify
1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Deploy:
```bash
netlify deploy
```

#### Render
1. Connect your GitHub repository to Render
2. Select "Static Site" as your service type
3. Use the following build settings:
   - Build Command: `npm run build`
   - Publish Directory: `dist`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

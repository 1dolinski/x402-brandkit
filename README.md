# x402 BrandKit

A Next.js + TypeScript application that uses x402 endpoints to generate all brand files required for a new app, miniapp, or webpage. Hosted on Vercel.

## Features

- **Favicon Generation**: Generate favicons in multiple sizes (16x16, 32x32, Apple Touch Icon)
- **Logo Generation**: Create logos in SVG and PNG formats
- **Description Generation**: Get brand descriptions in multiple lengths (short, medium, long) with keywords
- **All-in-one Generation**: Generate all brand assets with a single API call

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Hosting**: Vercel
- **Styling**: CSS Modules

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/1dolinski/x402-brandkit.git
cd x402-brandkit
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Endpoints

### Generate Favicon

```
POST /api/generate/favicon
```

**Request Body:**
```json
{
  "name": "Brand Name",
  "description": "Optional brand description",
  "style": "modern"
}
```

**Response:**
```json
{
  "favicon16": "base64-encoded-image",
  "favicon32": "base64-encoded-image",
  "appleTouchIcon": "base64-encoded-image",
  "format": "png"
}
```

### Generate Logo

```
POST /api/generate/logo
```

**Request Body:**
```json
{
  "name": "Brand Name",
  "description": "Optional brand description",
  "style": "modern"
}
```

**Response:**
```json
{
  "svg": "SVG content",
  "png": "base64-encoded-image",
  "width": 512,
  "height": 512
}
```

### Generate Description

```
POST /api/generate/description
```

**Request Body:**
```json
{
  "name": "Brand Name",
  "description": "Optional brand description",
  "style": "modern"
}
```

**Response:**
```json
{
  "short": "160 character description",
  "medium": "300 character description",
  "long": "500 character description",
  "keywords": ["keyword1", "keyword2"]
}
```

### Generate All Assets

```
POST /api/generate/all
```

**Request Body:**
```json
{
  "name": "Brand Name",
  "description": "Optional brand description",
  "style": "modern"
}
```

**Response:**
```json
{
  "favicon": { ... },
  "logo": { ... },
  "description": { ... }
}
```

## Style Options

- `modern`: Contemporary, clean design
- `classic`: Traditional, timeless style
- `minimal`: Simple, stripped-down aesthetic
- `playful`: Fun, energetic appearance

## Deployment

### Deploy to Vercel

The easiest way to deploy is using the Vercel Platform:

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com/new)
3. Vercel will automatically detect Next.js and configure the build
4. Click "Deploy"

### Manual Deployment

```bash
npm run build
npm start
```

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
x402-brandkit/
├── app/
│   ├── api/
│   │   └── generate/
│   │       ├── all/
│   │       ├── description/
│   │       ├── favicon/
│   │       └── logo/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── page.module.css
├── lib/
│   └── x402-client.ts
├── public/
├── next.config.js
├── tsconfig.json
├── vercel.json
└── package.json
```

## License

ISC

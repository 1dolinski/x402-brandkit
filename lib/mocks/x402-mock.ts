/**
 * Mock x402 API responses for testing
 * In production, these would come from actual x402 endpoints
 */

import { BrandRequest, FaviconResponse, LogoResponse, DescriptionResponse } from '../x402-client';

// Simple SVG logo generator
function generateMockSVG(name: string, colors: string[] = ['#667eea', '#764ba2']): string {
  return `<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors[0]};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colors[1] || colors[0]};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="64" fill="url(#grad)"/>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" 
        font-family="Arial, sans-serif" font-size="200" font-weight="bold" fill="white">
    ${name.charAt(0).toUpperCase()}
  </text>
</svg>`;
}

// Convert SVG to base64
function svgToBase64(svg: string): string {
  return Buffer.from(svg).toString('base64');
}

// Generate a simple PNG from canvas (in a real implementation, this would use proper image generation)
function generateMockPNG(name: string, size: number, colors: string[] = ['#667eea', '#764ba2']): string {
  // This is a placeholder - in reality, you'd use a proper image generation library
  // For now, we'll return a simple base64 encoded image
  const svg = generateMockSVG(name, colors);
  return svgToBase64(svg);
}

export async function mockGenerateFavicon(request: BrandRequest): Promise<FaviconResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const colors = request.colors || ['#667eea', '#764ba2'];
  
  return {
    favicon16: generateMockPNG(request.name, 16, colors),
    favicon32: generateMockPNG(request.name, 32, colors),
    appleTouchIcon: generateMockPNG(request.name, 180, colors),
    format: 'png',
  };
}

export async function mockGenerateLogo(request: BrandRequest): Promise<LogoResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const colors = request.colors || ['#667eea', '#764ba2'];
  const svg = generateMockSVG(request.name, colors);
  
  return {
    svg,
    png: svgToBase64(svg),
    width: 512,
    height: 512,
  };
}

export async function mockGenerateDescription(request: BrandRequest): Promise<DescriptionResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const name = request.name;
  const desc = request.description || `${name} is an innovative brand`;
  const styleWords = {
    modern: 'cutting-edge, contemporary',
    classic: 'timeless, traditional',
    minimal: 'clean, simple',
    playful: 'fun, energetic',
  };
  const styleDesc = styleWords[request.style || 'modern'];
  
  return {
    short: `${name} - ${desc.substring(0, 140)}`,
    medium: `${name} is a ${styleDesc} brand that ${desc}. We focus on delivering exceptional quality and memorable experiences.`,
    long: `${name} represents a ${styleDesc} approach to branding. ${desc}. Our mission is to create meaningful connections with our audience through innovative design and authentic storytelling. We believe in the power of great branding to transform businesses and create lasting impressions.`,
    keywords: [
      name.toLowerCase(),
      ...(request.style ? [request.style] : []),
      'brand',
      'design',
      'innovation',
      'quality',
    ],
  };
}

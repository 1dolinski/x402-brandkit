/**
 * x402 API Client for brand generation
 * Provides functions to generate favicons, logos, and descriptions
 */

const X402_API_BASE = 'https://x402.com/api';

export interface BrandRequest {
  name: string;
  description?: string;
  colors?: string[];
  style?: 'modern' | 'classic' | 'minimal' | 'playful';
}

export interface FaviconResponse {
  favicon16: string; // base64 encoded image
  favicon32: string; // base64 encoded image
  appleTouchIcon: string; // base64 encoded image
  format: string;
}

export interface LogoResponse {
  svg: string; // SVG content
  png: string; // base64 encoded image
  width: number;
  height: number;
}

export interface DescriptionResponse {
  short: string; // Short description (160 chars)
  medium: string; // Medium description (300 chars)
  long: string; // Long description (500 chars)
  keywords: string[];
}

/**
 * Generate favicon in multiple sizes
 */
export async function generateFavicon(request: BrandRequest): Promise<FaviconResponse> {
  const response = await fetch(`${X402_API_BASE}/favicon`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`Failed to generate favicon: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Generate logo in SVG and PNG formats
 */
export async function generateLogo(request: BrandRequest): Promise<LogoResponse> {
  const response = await fetch(`${X402_API_BASE}/logo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`Failed to generate logo: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Generate brand descriptions of various lengths
 */
export async function generateDescription(request: BrandRequest): Promise<DescriptionResponse> {
  const response = await fetch(`${X402_API_BASE}/description`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`Failed to generate description: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Generate all brand assets at once
 */
export async function generateAllBrandAssets(request: BrandRequest) {
  const [favicon, logo, description] = await Promise.all([
    generateFavicon(request),
    generateLogo(request),
    generateDescription(request),
  ]);

  return {
    favicon,
    logo,
    description,
  };
}

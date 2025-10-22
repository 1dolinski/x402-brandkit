'use client';

import { useState } from 'react';
import styles from './page.module.css';

interface BrandAssets {
  favicon?: {
    favicon16: string;
    favicon32: string;
    appleTouchIcon: string;
  };
  logo?: {
    svg: string;
    png: string;
    width: number;
    height: number;
  };
  description?: {
    short: string;
    medium: string;
    long: string;
    keywords: string[];
  };
}

export default function Home() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [style, setStyle] = useState<'modern' | 'classic' | 'minimal' | 'playful'>('modern');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [assets, setAssets] = useState<BrandAssets | null>(null);

  const handleGenerate = async () => {
    if (!name.trim()) {
      setError('Please enter a brand name');
      return;
    }

    setLoading(true);
    setError('');
    setAssets(null);

    try {
      const response = await fetch('/api/generate/all', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim() || undefined,
          style,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to generate brand assets');
      }

      const data = await response.json();
      setAssets(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = (base64: string, filename: string) => {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${base64}`;
    link.download = filename;
    link.click();
  };

  const downloadSVG = (svgContent: string, filename: string) => {
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>x402 BrandKit</h1>
          <p className={styles.subtitle}>
            Generate professional brand assets instantly
          </p>
        </div>

        <div className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>
              Brand Name *
            </label>
            <input
              id="name"
              type="text"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your brand name"
              disabled={loading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="description" className={styles.label}>
              Description (optional)
            </label>
            <textarea
              id="description"
              className={styles.textarea}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your brand..."
              disabled={loading}
              rows={3}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="style" className={styles.label}>
              Style
            </label>
            <select
              id="style"
              className={styles.select}
              value={style}
              onChange={(e) => setStyle(e.target.value as 'modern' | 'classic' | 'minimal' | 'playful')}
              disabled={loading}
            >
              <option value="modern">Modern</option>
              <option value="classic">Classic</option>
              <option value="minimal">Minimal</option>
              <option value="playful">Playful</option>
            </select>
          </div>

          <button
            className={styles.button}
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Brand Assets'}
          </button>

          {error && <div className={styles.error}>{error}</div>}
        </div>

        {assets && (
          <div className={styles.results}>
            <h2 className={styles.resultsTitle}>Your Brand Assets</h2>

            {assets.favicon && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Favicon</h3>
                <div className={styles.faviconGrid}>
                  <div className={styles.faviconItem}>
                    <img
                      src={`data:image/png;base64,${assets.favicon.favicon16}`}
                      alt="Favicon 16x16"
                      className={styles.faviconImg}
                    />
                    <p>16x16</p>
                    <button
                      className={styles.downloadBtn}
                      onClick={() => downloadImage(assets.favicon!.favicon16, 'favicon-16x16.png')}
                    >
                      Download
                    </button>
                  </div>
                  <div className={styles.faviconItem}>
                    <img
                      src={`data:image/png;base64,${assets.favicon.favicon32}`}
                      alt="Favicon 32x32"
                      className={styles.faviconImg}
                    />
                    <p>32x32</p>
                    <button
                      className={styles.downloadBtn}
                      onClick={() => downloadImage(assets.favicon!.favicon32, 'favicon-32x32.png')}
                    >
                      Download
                    </button>
                  </div>
                  <div className={styles.faviconItem}>
                    <img
                      src={`data:image/png;base64,${assets.favicon.appleTouchIcon}`}
                      alt="Apple Touch Icon"
                      className={styles.faviconImg}
                    />
                    <p>Apple Touch</p>
                    <button
                      className={styles.downloadBtn}
                      onClick={() => downloadImage(assets.favicon!.appleTouchIcon, 'apple-touch-icon.png')}
                    >
                      Download
                    </button>
                  </div>
                </div>
              </div>
            )}

            {assets.logo && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Logo</h3>
                <div className={styles.logoPreview}>
                  <img
                    src={`data:image/png;base64,${assets.logo.png}`}
                    alt="Logo"
                    className={styles.logoImg}
                  />
                </div>
                <div className={styles.logoActions}>
                  <button
                    className={styles.downloadBtn}
                    onClick={() => downloadImage(assets.logo!.png, 'logo.png')}
                  >
                    Download PNG
                  </button>
                  <button
                    className={styles.downloadBtn}
                    onClick={() => downloadSVG(assets.logo!.svg, 'logo.svg')}
                  >
                    Download SVG
                  </button>
                </div>
              </div>
            )}

            {assets.description && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Descriptions</h3>
                <div className={styles.descriptions}>
                  <div className={styles.descriptionItem}>
                    <h4>Short (160 chars)</h4>
                    <p className={styles.descriptionText}>{assets.description.short}</p>
                  </div>
                  <div className={styles.descriptionItem}>
                    <h4>Medium (300 chars)</h4>
                    <p className={styles.descriptionText}>{assets.description.medium}</p>
                  </div>
                  <div className={styles.descriptionItem}>
                    <h4>Long (500 chars)</h4>
                    <p className={styles.descriptionText}>{assets.description.long}</p>
                  </div>
                  {assets.description.keywords.length > 0 && (
                    <div className={styles.descriptionItem}>
                      <h4>Keywords</h4>
                      <div className={styles.keywords}>
                        {assets.description.keywords.map((keyword, idx) => (
                          <span key={idx} className={styles.keyword}>
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

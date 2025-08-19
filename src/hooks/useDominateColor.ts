import { useState, useEffect, useCallback } from 'react';

type UseDominantColorResult = {
    dominantColor: string | null;
    loading: boolean;
    error: string | null;
};

function useDominantColor(imageUrl: string | null): UseDominantColorResult {
    const [dominantColor, setDominantColor] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getDominantColor = useCallback(async (url: string): Promise<string> => {
        // Create canvas and image elements
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        if (!ctx) {
            throw new Error('Canvas context not available');
        }

        const img = new Image();
        img.crossOrigin = 'Anonymous';

        // Load image
        await new Promise<void>((resolve, reject) => {
            img.onload = () => resolve();
            img.onerror = () => reject(new Error('Image load failed'));
            img.src = url;
        });

        // Set canvas dimensions (scaled down for performance)
        const MAX_SIZE = 200;
        const scale = Math.min(MAX_SIZE / img.width, MAX_SIZE / img.height, 1);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        // Draw image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

        // Sample pixels more efficiently
        const pixelCount = canvas.width * canvas.height;
        const sampleStep = Math.max(1, Math.floor(pixelCount / 1000)); // Sample ~1000 pixels
        let r = 0, g = 0, b = 0, count = 0;

        for (let i = 0; i < imageData.length; i += 4 * sampleStep) {
            r += imageData[i];
            g += imageData[i + 1];
            b += imageData[i + 2];
            count++;
        }

        // Calculate average color
        const avgR = Math.round(r / count);
        const avgG = Math.round(g / count);
        const avgB = Math.round(b / count);

        // Convert to hex
        return `#${[avgR, avgG, avgB]
            .map(c => c.toString(16).padStart(2, '0'))
            .join('')}`;
    }, []);

    useEffect(() => {
        if (!imageUrl) {
            setDominantColor(null);
            return;
        }

        let isMounted = true;

        const fetchColor = async () => {
            try {
                setLoading(true);
                setError(null);

                const color = await getDominantColor(imageUrl);

                if (isMounted) {
                    setDominantColor(color);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : 'Unknown error');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchColor();

        return () => {
            isMounted = false;
        };
    }, [imageUrl, getDominantColor]);

    return { dominantColor, loading, error };
}

export default useDominantColor;
import { useCallback, useEffect, useRef, useState } from 'react';
import imageCompression from 'browser-image-compression';

const MAX_BYTES = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ['image/png', 'image/jpeg'];

export default function useImageUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [isPreparing, setIsPreparing] = useState(false);
  const objectUrlRef = useRef('');

  const clearPreview = useCallback(() => {
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    objectUrlRef.current = '';
  }, []);

  const remove = useCallback(() => {
    clearPreview();
    setFile(null); setPreview(''); setError('');
  }, [clearPreview]);

  const selectFile = useCallback(async (candidate) => {
    if (!candidate) return false;
    if (!ACCEPTED_TYPES.includes(candidate.type)) {
      setError('Please choose a PNG, JPG, or JPEG image.'); return false;
    }
    if (candidate.size > MAX_BYTES) {
      setError('Image must be 5 MB or smaller.'); return false;
    }
    if (file && candidate.name === file.name && candidate.size === file.size && candidate.lastModified === file.lastModified) {
      setError('This image has already been selected.'); return false;
    }
    setError(''); setIsPreparing(true);
    try {
      const compressed = await imageCompression(candidate, {
        maxSizeMB: 1.5,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: candidate.type,
      });
      clearPreview();
      objectUrlRef.current = URL.createObjectURL(compressed);
      setFile(compressed); setPreview(objectUrlRef.current);
      return true;
    } catch {
      setError('We could not prepare that image. Please try another one.'); return false;
    } finally { setIsPreparing(false); }
  }, [clearPreview, file]);

  useEffect(() => () => clearPreview(), [clearPreview]);
  return { file, preview, error, isPreparing, selectFile, remove };
}

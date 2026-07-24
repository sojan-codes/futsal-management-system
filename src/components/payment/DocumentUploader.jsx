import { useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CloudUpload, ImagePlus, LoaderCircle } from 'lucide-react';
import ImagePreview from './ImagePreview';

export default function DocumentUploader({ label, upload, required = true }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const pick = (files) => upload.selectFile(files?.[0]);
  return <div className="document-uploader">
    <div className="upload-label-row"><label>{label}{required && <em>*</em>}</label>{upload.file && <span className="upload-ready">Ready</span>}</div>
    <div className={`upload-dropzone ${dragging ? 'is-dragging' : ''} ${upload.error ? 'has-error' : ''}`} role="button" tabIndex={0}
      onClick={() => inputRef.current?.click()} onKeyDown={(event) => event.key === 'Enter' && inputRef.current?.click()}
      onDragOver={(event) => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)}
      onDrop={(event) => { event.preventDefault(); setDragging(false); pick(event.dataTransfer.files); }}>
      <input ref={inputRef} type="file" accept="image/png,image/jpeg" onChange={(event) => pick(event.target.files)} />
      {upload.isPreparing ? <LoaderCircle className="upload-spinner" size={28} /> : <><span className="upload-icon"><CloudUpload size={25} /></span><strong>Drop image here or <b>browse files</b></strong><small>PNG, JPG or JPEG · Max 5 MB</small></>}
    </div>
    {upload.error && <p className="field-error">{upload.error}</p>}
    <AnimatePresence><ImagePreview file={upload.file} preview={upload.preview} onRemove={upload.remove} /></AnimatePresence>
  </div>;
}

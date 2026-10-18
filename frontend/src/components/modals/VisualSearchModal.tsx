import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Upload, Sparkles, Image as ImageIcon } from 'lucide-react';

interface VisualSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SAMPLE_SEARCHES = [
  { label: 'Kundan Choker', term: 'Kundan Choker' },
  { label: 'Polki Rani Haar', term: 'Rani Haar' },
  { label: 'Temple Necklace', term: 'Temple' },
];

export const VisualSearchModal: React.FC<VisualSearchModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleFileChange = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSearchImage = () => {
    onClose();
    navigate('/shop?search=Kundan');
  };

  const handleSampleClick = (term: string) => {
    onClose();
    navigate(`/shop?search=${encodeURIComponent(term)}`);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div onClick={onClose} className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" />

      <div className="relative w-full max-w-lg bg-[#FFFFFF] border border-[#E5E1DC] rounded-[4px] shadow-2xl overflow-hidden z-10 animate-fade-in">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#EEEAE4] flex items-center justify-between bg-[#FFFDF8]">
          <div>
            <h3 className="font-serif text-2xl font-normal text-[#2B2723]">
              Find Jewellery by Image
            </h3>
            <p className="text-xs text-[#7A736E] mt-0.5 font-sans">
              Upload a jewellery image and discover similar styles.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 text-[#7A736E] hover:text-[#2B2723] rounded transition-colors"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Upload Area */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-[4px] p-8 text-center cursor-pointer transition-all duration-200 ${
              isDragging
                ? 'border-[#C89B3C] bg-[#FFFDF8]'
                : 'border-[#E5E1DC] hover:border-[#C89B3C] bg-[#FAFAF8]'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
            />

            {previewUrl ? (
              <div className="space-y-3">
                <img
                  src={previewUrl}
                  alt="Search preview"
                  className="w-32 h-32 object-cover rounded mx-auto border border-[#E5E1DC]"
                />
                <p className="text-xs text-[#2B2723] font-medium truncate">
                  {selectedFile?.name}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#FFFDF8] border border-[#E5E1DC] flex items-center justify-center mx-auto text-[#C89B3C]">
                  <Upload className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-[#2B2723] uppercase tracking-wider">
                    Drag &amp; Drop Image Here
                  </p>
                  <p className="text-[11px] text-[#7A736E]">
                    or click to browse JPG, PNG, WEBP files
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action Button */}
          {selectedFile && (
            <button
              type="button"
              onClick={handleSearchImage}
              className="w-full py-3 bg-[#2B2723] hover:bg-[#C89B3C] text-white text-xs font-medium uppercase tracking-[0.18em] transition-colors rounded-[2px] flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Search Matching Designs</span>
            </button>
          )}

          {/* Sample Searches */}
          <div className="pt-2 border-t border-[#EEEAE4]">
            <span className="text-[10px] uppercase tracking-[0.18em] font-medium text-[#C89B3C] block mb-2.5">
              Sample Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_SEARCHES.map((sample) => (
                <button
                  key={sample.label}
                  type="button"
                  onClick={() => handleSampleClick(sample.term)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FFFDF8] hover:bg-white text-[#2B2723] hover:text-[#C89B3C] border border-[#EEEAE4] hover:border-[#C89B3C] rounded text-xs transition-colors font-sans"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-[#C89B3C] stroke-[1.5]" />
                  <span>{sample.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

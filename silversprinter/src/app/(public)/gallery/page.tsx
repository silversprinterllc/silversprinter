'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const photos = [
  { src: '/gallery/DSC04726.JPG', alt: 'SilverSprinter — side profile, palm trees' },
  { src: '/gallery/DSC04731.JPG', alt: 'SilverSprinter — front three-quarter view' },
  { src: '/gallery/IMG_5615.jpg', alt: 'SilverSprinter — exterior shoot' },
  { src: '/gallery/IMG_5622.jpg', alt: 'SilverSprinter — exterior detail' },
  { src: '/gallery/IMG_5646.jpg', alt: 'SilverSprinter — exterior detail' },
  { src: '/gallery/IMG_5650.jpg', alt: 'SilverSprinter — exterior detail' },
  { src: '/gallery/IMG_5651.jpg', alt: 'SilverSprinter — exterior detail' },
  { src: '/gallery/IMG_5654.jpg', alt: 'SilverSprinter — exterior detail' },
  { src: '/gallery/IMG_5655.jpg', alt: 'SilverSprinter — exterior detail' },
  { src: '/gallery/IMG_5657.jpg', alt: 'SilverSprinter — exterior detail' },
  { src: '/gallery/IMG_5663.jpg', alt: 'SilverSprinter — exterior detail' },
  { src: '/gallery/IMG_5668.jpg', alt: 'SilverSprinter — exterior detail' },
  { src: '/gallery/IMG_5678.jpg', alt: 'SilverSprinter — exterior detail' },
  { src: '/gallery/IMG_5679.jpg', alt: 'SilverSprinter — exterior detail' },
  { src: '/gallery/IMG_5680.jpg', alt: 'SilverSprinter — exterior detail' },
  { src: '/gallery/IMG_5689.jpg', alt: 'SilverSprinter — exterior detail' },
  { src: '/gallery/IMG_5690.jpg', alt: 'SilverSprinter — exterior detail' },
  { src: '/gallery/IMG_5704.jpg', alt: 'SilverSprinter — exterior detail' },
  { src: '/gallery/IMG_5706.jpg', alt: 'SilverSprinter — exterior detail' },
  { src: '/gallery/IMG_5714.jpg', alt: 'SilverSprinter — exterior detail' },
  { src: '/gallery/IMG_5740.jpg', alt: 'SilverSprinter — exterior detail' },
  { src: '/gallery/IMG_5742.jpg', alt: 'SilverSprinter — exterior detail' },
  { src: '/gallery/IMG_5758.jpg', alt: 'SilverSprinter — exterior detail' },
  { src: '/gallery/IMG_5774.jpg', alt: 'SilverSprinter — exterior detail' },
  { src: '/gallery/IMG_5780.jpg', alt: 'SilverSprinter — exterior detail' },
]

export default function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = (i: number) => setLightboxIndex(i)
  const closeLightbox = () => setLightboxIndex(null)
  const prev = () => setLightboxIndex(i => (i! - 1 + photos.length) % photos.length)
  const next = () => setLightboxIndex(i => (i! + 1) % photos.length)

  return (
    <main className="min-h-screen bg-onyx-900 text-cream-200">

      {/* ── Header ── */}
      <section className="pt-28 pb-12 px-6 text-center border-b border-gold-800/40">
        <p className="text-gold-400 font-sans text-xs tracking-[0.25em] uppercase mb-3">
          The Fleet
        </p>
        <h1 className="font-serif text-5xl md:text-6xl text-cream-100 mb-4">
          Gallery
        </h1>
        <div className="w-16 h-px bg-gold-500 mx-auto mb-5" />
        <p className="font-sans text-onyx-300 text-sm max-w-md mx-auto">
          25 photos · Professional shoot, June 2021
        </p>
      </section>

      {/* ── Grid ── */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {photos.map((photo, i) => (
            <button
              key={photo.src}
              onClick={() => openLightbox(i)}
              className="group relative aspect-[4/3] overflow-hidden bg-onyx-800 focus:outline-none"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Gold overlay on hover */}
              <div className="absolute inset-0 bg-gold-500/0 group-hover:bg-gold-500/10 transition-colors duration-300" />
            </button>
          ))}
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 text-cream-300 hover:text-gold-400 transition-colors z-10"
            aria-label="Close"
          >
            <X size={28} />
          </button>

          {/* Prev */}
          <button
            onClick={e => { e.stopPropagation(); prev() }}
            className="absolute left-4 text-cream-300 hover:text-gold-400 transition-colors z-10 p-2"
            aria-label="Previous"
          >
            <ChevronLeft size={36} />
          </button>

          {/* Image */}
          <div
            className="relative w-full max-w-5xl max-h-[85vh] mx-16"
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={photos[lightboxIndex].src}
              alt={photos[lightboxIndex].alt}
              width={1400}
              height={900}
              className="object-contain w-full max-h-[85vh]"
              priority
            />
            {/* Caption */}
            <p className="mt-3 text-center font-sans text-onyx-300 text-xs tracking-widest uppercase">
              {lightboxIndex + 1} / {photos.length}
            </p>
          </div>

          {/* Next */}
          <button
            onClick={e => { e.stopPropagation(); next() }}
            className="absolute right-4 text-cream-300 hover:text-gold-400 transition-colors z-10 p-2"
            aria-label="Next"
          >
            <ChevronRight size={36} />
          </button>
        </div>
      )}
    </main>
  )
}

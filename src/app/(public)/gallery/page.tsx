'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const photos = [
  { src: '/gallery/DSC04726.JPG', alt: 'Mercedes Sprinter — side profile' },
  { src: '/gallery/DSC04731.JPG', alt: 'Front three-quarter view' },
  { src: '/gallery/DSC04741.JPG', alt: 'Front view' },
  { src: '/gallery/DSC04746.JPG', alt: 'Exterior detail' },
  { src: '/gallery/DSC04751.JPG', alt: 'Exterior detail' },
  { src: '/gallery/DSC04756.JPG', alt: 'Exterior detail' },
  { src: '/gallery/DSC04761.JPG', alt: 'Exterior detail' },
  { src: '/gallery/DSC04766.JPG', alt: 'Exterior detail' },
  { src: '/gallery/DSC04771.JPG', alt: 'Exterior detail' },
  { src: '/gallery/DSC04776.JPG', alt: 'Exterior detail' },
  { src: '/gallery/DSC04786.JPG', alt: 'Exterior detail' },
  { src: '/gallery/DSC04796.JPG', alt: 'Interior — front cabin' },
  { src: '/gallery/DSC04801.JPG', alt: 'Interior detail' },
  { src: '/gallery/DSC04806.JPG', alt: 'Interior detail' },
  { src: '/gallery/DSC04816.JPG', alt: 'Interior detail' },
  { src: '/gallery/DSC04826.JPG', alt: 'Interior detail' },
  { src: '/gallery/DSC04836.JPG', alt: 'Interior detail' },
  { src: '/gallery/DSC04841.JPG', alt: 'Interior detail' },
  { src: '/gallery/DSC04846.JPG', alt: 'Interior detail' },
  { src: '/gallery/DSC04851.JPG', alt: 'Rear exterior' },
  { src: '/gallery/DSC04861.JPG', alt: 'Exterior detail' },
  { src: '/gallery/DSC04866.JPG', alt: 'Exterior detail' },
  { src: '/gallery/DSC04886.JPG', alt: 'Exterior detail' },
  { src: '/gallery/DSC04896.JPG', alt: 'Exterior detail' },
  { src: '/gallery/DSC04901.JPG', alt: 'Exterior detail' },
]

export default function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = (i: number) => setLightboxIndex(i)
  const closeLightbox = () => setLightboxIndex(null)
  const prev = () => setLightboxIndex((i) => ((i ?? 0) - 1 + photos.length) % photos.length)
  const next = () => setLightboxIndex((i) => ((i ?? 0) + 1) % photos.length)

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#f0e6d0]">

      {/* ── Header ── */}
      <section className="pt-28 pb-12 px-6 text-center border-b border-[#433d38]/40">
        <p className="text-[#c9a96e] font-sans text-xs tracking-[0.25em] uppercase mb-3">
          The Van
        </p>
        <h1 className="font-serif text-5xl md:text-6xl text-[#f0e6d0] mb-4">
          Gallery
        </h1>
        <div className="w-16 h-px bg-[#c9a96e] mx-auto mb-5" />
        <p className="font-sans text-[#5f5850] text-sm max-w-md mx-auto">
          25 photos · Professional shoot
        </p>
      </section>

      {/* ── Masonry Grid ── */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3">
          {photos.map((photo, i) => (
            <button
              key={photo.src}
              onClick={() => openLightbox(i)}
              className="group relative w-full overflow-hidden bg-[#1a1612] break-inside-avoid block border border-transparent hover:border-[#c9a96e]/50 transition-colors duration-300 focus:outline-none"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={800}
                height={600}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105 block"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
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
            className="absolute top-5 right-5 text-[#f0e6d0] hover:text-[#c9a96e] transition-colors z-10"
            aria-label="Close"
          >
            <X size={28} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-4 text-[#f0e6d0] hover:text-[#c9a96e] transition-colors z-10 p-2"
            aria-label="Previous"
          >
            <ChevronLeft size={36} />
          </button>

          {/* Image */}
          <div
            className="relative w-full max-w-5xl max-h-[85vh] mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[lightboxIndex].src}
              alt={photos[lightboxIndex].alt}
              width={1400}
              height={900}
              className="object-contain w-full max-h-[85vh]"
              priority
            />
            <p className="mt-3 text-center font-sans text-[#5f5850] text-xs tracking-widest uppercase">
              {lightboxIndex + 1} / {photos.length}
            </p>
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-4 text-[#f0e6d0] hover:text-[#c9a96e] transition-colors z-10 p-2"
            aria-label="Next"
          >
            <ChevronRight size={36} />
          </button>
        </div>
      )}
    </main>
  )
}

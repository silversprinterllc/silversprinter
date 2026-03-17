'use client'
import { useEffect, useState } from 'react'
import { useWizard } from '../BookingWizard'
import { AddonCard } from '../AddonCard'
import { QuoteBar } from '../QuoteBar'
import { Button } from '@/components/ui/Button'

const MUSIC_OPTIONS = ['Classical', 'Jazz', 'R&B', 'Pop', 'Hip-Hop', 'Ambient', 'No Music']
const LIGHTING_OPTIONS = ['Warm', 'Cool White', 'Deep Blue', 'Romantic Red', 'Off']

export function Step2Customize() {
  const { state, update, next, back } = useWizard()
  const [addons, setAddons] = useState<any[]>([])
  const [chauffeurs, setChauffeurs] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/addons').then((r) => r.json()).then(setAddons).catch(() => {})
    fetch('/api/chauffeurs').then((r) => r.json()).then(setChauffeurs).catch(() => {})
  }, [])

  function toggleAddon(id: string) {
    const current = state.addonIds
    const updated = current.includes(id) ? current.filter((a) => a !== id) : [...current, id]
    update({ addonIds: updated })
  }

  return (
    <div className="pb-32">
      <h2 className="font-serif text-3xl text-[#f0e6d0] mb-8">Customize your experience</h2>

      {/* Add-ons */}
      <div className="mb-10">
        <p className="text-xs tracking-widest uppercase text-[#5f5850] mb-3">Enhancements</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {addons.map((a) => (
            <AddonCard
              key={a.id}
              id={a.id}
              name={a.name}
              description={a.description}
              price={Number(a.price)}
              selected={state.addonIds.includes(a.id)}
              onToggle={toggleAddon}
            />
          ))}
        </div>
      </div>

      {/* Chauffeur */}
      <div className="mb-10">
        <p className="text-xs tracking-widest uppercase text-[#5f5850] mb-3">Chauffeur Preference</p>
        <div className="space-y-2">
          <button
            onClick={() => update({ chauffeurId: null })}
            className={`w-full text-left px-4 py-3 border text-sm transition-colors ${
              state.chauffeurId === null ? 'border-[#c9a96e] text-[#c9a96e] bg-[#c9a96e]/5' : 'border-[#433d38] text-[#5f5850] hover:border-[#5f5850]'
            }`}
          >
            No preference — assign best available
          </button>
          {chauffeurs.map((c) => (
            <button
              key={c.id}
              onClick={() => update({ chauffeurId: c.id })}
              className={`w-full text-left px-4 py-3 border text-sm transition-colors ${
                state.chauffeurId === c.id ? 'border-[#c9a96e] bg-[#c9a96e]/5' : 'border-[#433d38] hover:border-[#5f5850]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[#f0e6d0]">{c.name}</span>
                <span className="text-[#5f5850] text-xs">★ {Number(c.rating).toFixed(2)} · {c.totalTrips} trips</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Cabin preferences */}
      <div className="mb-10">
        <p className="text-xs tracking-widest uppercase text-[#5f5850] mb-3">Cabin Preferences</p>
        <div className="border border-[#433d38]/50 bg-[#1a1612] p-6 space-y-6">
          {/* Temperature */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[#a09890]">Cabin Temperature</span>
              <span className="text-[#c9a96e]">{state.cabinTemp}°F</span>
            </div>
            <input
              type="range"
              min={60}
              max={80}
              value={state.cabinTemp}
              onChange={(e) => update({ cabinTemp: Number(e.target.value) })}
              className="w-full accent-[#c9a96e]"
            />
            <div className="flex justify-between text-xs text-[#433d38] mt-1">
              <span>60°F</span><span>80°F</span>
            </div>
          </div>

          {/* Music */}
          <div>
            <p className="text-sm text-[#a09890] mb-2">Music Style</p>
            <div className="flex flex-wrap gap-2">
              {MUSIC_OPTIONS.map((m) => (
                <button
                  key={m}
                  onClick={() => update({ musicPreference: m })}
                  className={`px-3 py-1.5 text-xs border transition-colors ${
                    state.musicPreference === m
                      ? 'border-[#c9a96e] text-[#c9a96e]'
                      : 'border-[#433d38] text-[#5f5850] hover:border-[#5f5850]'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Lighting */}
          <div>
            <p className="text-sm text-[#a09890] mb-2">Lighting Mood</p>
            <div className="flex flex-wrap gap-2">
              {LIGHTING_OPTIONS.map((l) => (
                <button
                  key={l}
                  onClick={() => update({ lightingMood: l })}
                  className={`px-3 py-1.5 text-xs border transition-colors ${
                    state.lightingMood === l
                      ? 'border-[#c9a96e] text-[#c9a96e]'
                      : 'border-[#433d38] text-[#5f5850] hover:border-[#5f5850]'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Welcome note */}
          <div>
            <label className="text-sm text-[#a09890] block mb-2">Welcome Note</label>
            <textarea
              value={state.welcomeNote}
              onChange={(e) => update({ welcomeNote: e.target.value })}
              placeholder="e.g. Celebrating an anniversary — champagne ready please"
              rows={2}
              className="w-full rounded-sm bg-[#0a0a0a] border border-[#433d38] text-[#f0e6d0] placeholder-[#5f5850] px-3 py-2.5 text-sm focus:outline-none focus:border-[#c9a96e] resize-none"
            />
          </div>
        </div>
      </div>

      {/* Special requests */}
      <div className="mb-8">
        <label className="text-xs tracking-widest uppercase text-[#5f5850] block mb-2">Special Requests</label>
        <textarea
          value={state.notes}
          onChange={(e) => update({ notes: e.target.value })}
          placeholder="Any additional requests for your chauffeur or our team..."
          rows={3}
          className="w-full rounded-sm bg-[#1a1612] border border-[#433d38] text-[#f0e6d0] placeholder-[#5f5850] px-3 py-2.5 text-sm focus:outline-none focus:border-[#c9a96e] resize-none"
        />
      </div>

      <div className="flex justify-between">
        <Button variant="ghost" onClick={back}>Back</Button>
        <Button size="lg" onClick={next}>Review Booking</Button>
      </div>

      <QuoteBar quote={state.quote} loading={false} />
    </div>
  )
}

"use client";

import { useState } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface WaterfrontQuizResult {
  // Vessel
  hasVessel: "yes" | "no" | "planning";
  vesselType: string;
  vesselLengthFt: number;
  vesselDraftFt: number;
  vesselBeamFt: number;
  airDraftFt: number; // clearance needed for mast / superstructure

  // Access
  fixedBridges: "yes" | "no" | "flexible";
  minWaterDepthFt: number;
  waterAccessTypes: string[]; // "ocean" | "intracoastal" | "canal" | "bay" | "river"

  // Dockage
  dockRequired: boolean;
  dockCovered: boolean;
  boatLiftRequired: boolean;
  numVessels: number;

  // Lifestyle
  boatingLifestyle: string[]; // "offshore" | "coastal_cruising" | "day_trips" | "sport_fishing" | "racing"

  // Property
  priceMaxM: number; // millions
  bedrooms: number;
  preferredAreas: string[];

  // Contact
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const EMPTY: WaterfrontQuizResult = {
  hasVessel: "yes",
  vesselType: "",
  vesselLengthFt: 0,
  vesselDraftFt: 0,
  vesselBeamFt: 0,
  airDraftFt: 0,
  fixedBridges: "flexible",
  minWaterDepthFt: 0,
  waterAccessTypes: [],
  dockRequired: true,
  dockCovered: false,
  boatLiftRequired: false,
  numVessels: 1,
  boatingLifestyle: [],
  priceMaxM: 0,
  bedrooms: 0,
  preferredAreas: [],
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

// ---------------------------------------------------------------------------
// Static options
// ---------------------------------------------------------------------------

const VESSEL_TYPES = [
  { id: "center_console", label: "Center Console", icon: "⚓" },
  { id: "sport_yacht", label: "Sport Yacht", icon: "🛥" },
  { id: "motor_yacht", label: "Motor Yacht", icon: "🚢" },
  { id: "mega_yacht", label: "Mega Yacht (65 ft+)", icon: "⛵" },
  { id: "sailboat", label: "Sailboat / Sailing Yacht", icon: "⛵" },
  { id: "catamaran", label: "Catamaran", icon: "⛵" },
  { id: "fishing", label: "Sport Fishing / Sportfish", icon: "🎣" },
  { id: "pontoon", label: "Pontoon / Deck Boat", icon: "🛶" },
];

const WATER_ACCESS_TYPES = [
  { id: "ocean", label: "Direct Ocean Access" },
  { id: "intracoastal", label: "Intracoastal Waterway" },
  { id: "deep_canal", label: "Deep-Water Canal" },
  { id: "bay", label: "Bay / Harbor" },
  { id: "river", label: "River" },
];

const LIFESTYLE_TYPES = [
  { id: "offshore", label: "Offshore / Blue Water" },
  { id: "coastal_cruising", label: "Coastal Cruising" },
  { id: "day_trips", label: "Day Trips & Entertaining" },
  { id: "sport_fishing", label: "Sport Fishing" },
  { id: "racing", label: "Racing" },
  { id: "bahamas", label: "Bahamas Runs" },
];

const AREAS = [
  "Palm Beach",
  "Jupiter",
  "Tequesta",
  "Juno Beach",
  "Singer Island",
  "North Palm Beach",
  "Palm Beach Gardens",
  "Boca Raton",
  "Delray Beach",
  "Highland Beach",
  "Fort Lauderdale",
  "Lighthouse Point",
  "Hillsboro Beach",
  "Deerfield Beach",
  "Pompano Beach",
  "Miami Beach",
  "Coconut Grove",
  "Key Biscayne",
  "Open to any waterfront",
];

const PRICE_OPTIONS = [
  { label: "Under $2M", value: 2 },
  { label: "$2M – $5M", value: 5 },
  { label: "$5M – $10M", value: 10 },
  { label: "$10M – $20M", value: 20 },
  { label: "$20M+", value: 50 },
];

const BED_OPTIONS = [3, 4, 5, 6, 7];

const TOTAL_STEPS = 7;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function toggle<T>(arr: T[], val: T): T[] {
  return arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ProgressBar({ step }: { step: number }) {
  const pct = Math.round(((step - 1) / (TOTAL_STEPS - 1)) * 100);
  return (
    <div className="w-full mb-10">
      <div className="flex justify-between text-xs text-cream/40 mb-2 font-mono tracking-widest uppercase">
        <span>Start</span>
        <span>{pct}% Complete</span>
      </div>
      <div className="h-px bg-white/10 w-full">
        <div
          className="h-px bg-gold transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function StepHeading({
  step,
  title,
  subtitle,
}: {
  step: number;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8">
      <p className="text-gold text-xs tracking-[0.3em] uppercase font-mono mb-3">
        Step {step} of {TOTAL_STEPS}
      </p>
      <h2 className="text-3xl font-serif text-cream mb-2">{title}</h2>
      {subtitle && (
        <p className="text-cream/50 text-sm leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}

function ChoiceCard({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        px-5 py-4 border text-left transition-all duration-200 text-sm
        ${
          selected
            ? "border-gold bg-gold/10 text-cream"
            : "border-white/10 text-cream/60 hover:border-white/30 hover:text-cream/90"
        }
      `}
    >
      {children}
    </button>
  );
}

function SliderField({
  label,
  sublabel,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  sublabel?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-baseline mb-2">
        <div>
          <span className="text-cream/80 text-sm">{label}</span>
          {sublabel && (
            <span className="text-cream/40 text-xs ml-2">{sublabel}</span>
          )}
        </div>
        <span className="text-gold font-mono text-lg">
          {value === 0 ? "—" : `${value} ${unit}`}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-gold h-px cursor-pointer"
        style={{ accentColor: "#c9a96e" }}
      />
      <div className="flex justify-between text-cream/25 text-xs mt-1 font-mono">
        <span>{min} {unit}</span>
        <span>{max} {unit}</span>
      </div>
    </div>
  );
}

function TextInput({
  label,
  placeholder,
  value,
  type = "text",
  onChange,
}: {
  label: string;
  placeholder?: string;
  value: string;
  type?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mb-5">
      <label className="block text-cream/60 text-xs tracking-widest uppercase mb-2 font-mono">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 text-cream placeholder-cream/20
                   px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
      />
    </div>
  );
}

function NavButtons({
  onBack,
  onNext,
  nextLabel = "Continue",
  nextDisabled = false,
  isLast = false,
}: {
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  isLast?: boolean;
}) {
  return (
    <div className="flex gap-3 mt-10">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 border border-white/15 text-cream/50 text-sm
                     hover:border-white/30 hover:text-cream/80 transition-all"
        >
          Back
        </button>
      )}
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className={`
          flex-1 py-3 text-sm tracking-widest uppercase font-mono transition-all
          ${
            nextDisabled
              ? "bg-white/5 text-cream/20 cursor-not-allowed"
              : isLast
              ? "bg-gold text-onyx hover:bg-gold/90"
              : "bg-white/10 text-cream hover:bg-white/15"
          }
        `}
      >
        {nextLabel}
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Steps
// ---------------------------------------------------------------------------

function Step1({
  data,
  set,
  onNext,
}: {
  data: WaterfrontQuizResult;
  set: (k: keyof WaterfrontQuizResult, v: unknown) => void;
  onNext: () => void;
}) {
  return (
    <div>
      <StepHeading
        step={1}
        title="Your Vessel"
        subtitle="We'll use this to match you only with properties your boat can actually call home."
      />

      <p className="text-cream/50 text-xs tracking-widest uppercase mb-4 font-mono">
        Do you currently own a vessel?
      </p>
      <div className="grid grid-cols-3 gap-3 mb-8">
        {(
          [
            { id: "yes", label: "Yes, I own one" },
            { id: "planning", label: "Purchasing soon" },
            { id: "no", label: "Not yet" },
          ] as const
        ).map((opt) => (
          <ChoiceCard
            key={opt.id}
            selected={data.hasVessel === opt.id}
            onClick={() => set("hasVessel", opt.id)}
          >
            {opt.label}
          </ChoiceCard>
        ))}
      </div>

      {data.hasVessel !== "no" && (
        <>
          <p className="text-cream/50 text-xs tracking-widest uppercase mb-4 font-mono">
            Vessel type
          </p>
          <div className="grid grid-cols-2 gap-3">
            {VESSEL_TYPES.map((vt) => (
              <ChoiceCard
                key={vt.id}
                selected={data.vesselType === vt.id}
                onClick={() => set("vesselType", vt.id)}
              >
                <span className="mr-2">{vt.icon}</span>
                {vt.label}
              </ChoiceCard>
            ))}
          </div>
        </>
      )}

      <NavButtons
        onNext={onNext}
        nextDisabled={
          data.hasVessel !== "no" && data.vesselType === ""
        }
      />
    </div>
  );
}

function Step2({
  data,
  set,
  onBack,
  onNext,
}: {
  data: WaterfrontQuizResult;
  set: (k: keyof WaterfrontQuizResult, v: unknown) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const isSail =
    data.vesselType === "sailboat" || data.vesselType === "catamaran";

  return (
    <div>
      <StepHeading
        step={2}
        title="Vessel Dimensions"
        subtitle="These numbers determine which docks can accommodate you and which canals you can navigate."
      />

      <SliderField
        label="Length Overall (LOA)"
        sublabel="hull tip to stern"
        value={data.vesselLengthFt}
        min={0}
        max={200}
        step={5}
        unit="ft"
        onChange={(v) => set("vesselLengthFt", v)}
      />
      <SliderField
        label="Beam"
        sublabel="widest point"
        value={data.vesselBeamFt}
        min={0}
        max={50}
        step={1}
        unit="ft"
        onChange={(v) => set("vesselBeamFt", v)}
      />
      <SliderField
        label="Draft"
        sublabel="waterline to keel"
        value={data.vesselDraftFt}
        min={0}
        max={20}
        step={0.5}
        unit="ft"
        onChange={(v) => set("vesselDraftFt", v)}
      />
      {isSail && (
        <SliderField
          label="Air Draft (Mast Height)"
          sublabel="waterline to masthead"
          value={data.airDraftFt}
          min={0}
          max={200}
          step={5}
          unit="ft"
          onChange={(v) => set("airDraftFt", v)}
        />
      )}
      {!isSail && data.vesselLengthFt > 0 && (
        <div className="border border-white/5 bg-white/3 px-5 py-4 text-xs text-cream/40 leading-relaxed">
          Air draft — the clearance needed under bridges — is typically 15–25 ft
          for powerboats of this size. We will apply a default unless you
          specify otherwise.{" "}
          <button
            type="button"
            onClick={() => set("airDraftFt", 15)}
            className="text-gold underline underline-offset-2"
          >
            Specify manually
          </button>
        </div>
      )}

      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
  );
}

function Step3({
  data,
  set,
  onBack,
  onNext,
}: {
  data: WaterfrontQuizResult;
  set: (k: keyof WaterfrontQuizResult, v: unknown) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div>
      <StepHeading
        step={3}
        title="Water Access & Depth"
        subtitle="What kind of waterway access matters most to you, and what can your hull handle?"
      />

      <p className="text-cream/50 text-xs tracking-widest uppercase mb-4 font-mono">
        Access type (select all that work for you)
      </p>
      <div className="grid grid-cols-1 gap-3 mb-8">
        {WATER_ACCESS_TYPES.map((opt) => (
          <ChoiceCard
            key={opt.id}
            selected={data.waterAccessTypes.includes(opt.id)}
            onClick={() =>
              set("waterAccessTypes", toggle(data.waterAccessTypes, opt.id))
            }
          >
            {opt.label}
          </ChoiceCard>
        ))}
      </div>

      <p className="text-cream/50 text-xs tracking-widest uppercase mb-4 font-mono">
        Fixed bridge tolerance
      </p>
      <div className="grid grid-cols-3 gap-3 mb-8">
        {(
          [
            { id: "no", label: "No fixed bridges" },
            { id: "flexible", label: "Depends on clearance" },
            { id: "yes", label: "Bridges are fine" },
          ] as const
        ).map((opt) => (
          <ChoiceCard
            key={opt.id}
            selected={data.fixedBridges === opt.id}
            onClick={() => set("fixedBridges", opt.id)}
          >
            {opt.label}
          </ChoiceCard>
        ))}
      </div>

      <SliderField
        label="Minimum water depth at dock"
        sublabel="mean low water"
        value={data.minWaterDepthFt}
        min={0}
        max={20}
        step={0.5}
        unit="ft"
        onChange={(v) => set("minWaterDepthFt", v)}
      />

      <NavButtons
        onBack={onBack}
        onNext={onNext}
        nextDisabled={data.waterAccessTypes.length === 0}
      />
    </div>
  );
}

function Step4({
  data,
  set,
  onBack,
  onNext,
}: {
  data: WaterfrontQuizResult;
  set: (k: keyof WaterfrontQuizResult, v: unknown) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div>
      <StepHeading
        step={4}
        title="Dockage Requirements"
        subtitle="What does the ideal berth at your home look like?"
      />

      <p className="text-cream/50 text-xs tracking-widest uppercase mb-4 font-mono">
        On-property dock required?
      </p>
      <div className="grid grid-cols-3 gap-3 mb-8">
        {(
          [
            { id: true, label: "Required" },
            { id: "preferred", label: "Preferred" },
            { id: false, label: "Marina slip is fine" },
          ] as { id: boolean | string; label: string }[]
        ).map((opt) => (
          <ChoiceCard
            key={String(opt.id)}
            selected={data.dockRequired === opt.id}
            onClick={() => set("dockRequired", opt.id)}
          >
            {opt.label}
          </ChoiceCard>
        ))}
      </div>

      <p className="text-cream/50 text-xs tracking-widest uppercase mb-3 font-mono">
        Dockage features needed
      </p>
      <div className="grid grid-cols-2 gap-3 mb-8">
        <ChoiceCard
          selected={data.dockCovered}
          onClick={() => set("dockCovered", !data.dockCovered)}
        >
          Covered boathouse / boat port
        </ChoiceCard>
        <ChoiceCard
          selected={data.boatLiftRequired}
          onClick={() => set("boatLiftRequired", !data.boatLiftRequired)}
        >
          Boat lift
        </ChoiceCard>
      </div>

      <p className="text-cream/50 text-xs tracking-widest uppercase mb-4 font-mono">
        Number of vessels to accommodate
      </p>
      <div className="flex gap-3">
        {[1, 2, 3, 4].map((n) => (
          <ChoiceCard
            key={n}
            selected={data.numVessels === n}
            onClick={() => set("numVessels", n)}
          >
            {n === 4 ? "4+" : n}
          </ChoiceCard>
        ))}
      </div>

      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
  );
}

function Step5({
  data,
  set,
  onBack,
  onNext,
}: {
  data: WaterfrontQuizResult;
  set: (k: keyof WaterfrontQuizResult, v: unknown) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div>
      <StepHeading
        step={5}
        title="How You Use the Water"
        subtitle="Your lifestyle shapes which locations and property types will serve you best."
      />

      <p className="text-cream/50 text-xs tracking-widest uppercase mb-4 font-mono">
        Select all that apply
      </p>
      <div className="grid grid-cols-2 gap-3">
        {LIFESTYLE_TYPES.map((lt) => (
          <ChoiceCard
            key={lt.id}
            selected={data.boatingLifestyle.includes(lt.id)}
            onClick={() =>
              set("boatingLifestyle", toggle(data.boatingLifestyle, lt.id))
            }
          >
            {lt.label}
          </ChoiceCard>
        ))}
      </div>

      <NavButtons
        onBack={onBack}
        onNext={onNext}
        nextDisabled={data.boatingLifestyle.length === 0}
      />
    </div>
  );
}

function Step6({
  data,
  set,
  onBack,
  onNext,
}: {
  data: WaterfrontQuizResult;
  set: (k: keyof WaterfrontQuizResult, v: unknown) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div>
      <StepHeading
        step={6}
        title="Property Criteria"
        subtitle="A few final details to focus your results."
      />

      <p className="text-cream/50 text-xs tracking-widest uppercase mb-4 font-mono">
        Budget
      </p>
      <div className="grid grid-cols-3 gap-3 mb-8 sm:grid-cols-5">
        {PRICE_OPTIONS.map((p) => (
          <ChoiceCard
            key={p.value}
            selected={data.priceMaxM === p.value}
            onClick={() => set("priceMaxM", p.value)}
          >
            {p.label}
          </ChoiceCard>
        ))}
      </div>

      <p className="text-cream/50 text-xs tracking-widest uppercase mb-4 font-mono">
        Minimum bedrooms
      </p>
      <div className="flex gap-3 mb-8">
        {BED_OPTIONS.map((b) => (
          <ChoiceCard
            key={b}
            selected={data.bedrooms === b}
            onClick={() => set("bedrooms", b)}
          >
            {b === 7 ? "7+" : b}
          </ChoiceCard>
        ))}
      </div>

      <p className="text-cream/50 text-xs tracking-widest uppercase mb-4 font-mono">
        Preferred areas (select all)
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {AREAS.map((area) => (
          <ChoiceCard
            key={area}
            selected={data.preferredAreas.includes(area)}
            onClick={() =>
              set("preferredAreas", toggle(data.preferredAreas, area))
            }
          >
            <span className="text-xs">{area}</span>
          </ChoiceCard>
        ))}
      </div>

      <NavButtons
        onBack={onBack}
        onNext={onNext}
        nextDisabled={data.priceMaxM === 0 || data.bedrooms === 0}
      />
    </div>
  );
}

function Step7({
  data,
  set,
  onBack,
  onSubmit,
  submitted,
}: {
  data: WaterfrontQuizResult;
  set: (k: keyof WaterfrontQuizResult, v: unknown) => void;
  onBack: () => void;
  onSubmit: () => void;
  submitted: boolean;
}) {
  const valid =
    data.firstName.trim() &&
    data.lastName.trim() &&
    data.email.includes("@");

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="text-gold text-4xl mb-6">✦</div>
        <h2 className="text-3xl font-serif text-cream mb-4">
          We&apos;ll be in touch.
        </h2>
        <p className="text-cream/50 text-sm leading-relaxed max-w-sm mx-auto">
          Your profile has been received. A Barefoot Realty advisor will reach
          out within 24 hours with properties matched to your vessel and
          lifestyle criteria.
        </p>
        <div className="mt-8 border border-white/10 px-6 py-5 text-left max-w-sm mx-auto">
          <p className="text-cream/30 text-xs tracking-widest uppercase mb-3 font-mono">
            Your Summary
          </p>
          <ul className="text-cream/60 text-xs space-y-2">
            {data.vesselLengthFt > 0 && (
              <li>
                Vessel:{" "}
                <span className="text-cream">
                  {data.vesselLengthFt}′ {data.vesselType.replace(/_/g, " ")}
                </span>
              </li>
            )}
            {data.vesselDraftFt > 0 && (
              <li>
                Draft: <span className="text-cream">{data.vesselDraftFt} ft</span>
              </li>
            )}
            <li>
              Water access:{" "}
              <span className="text-cream">
                {data.waterAccessTypes.join(", ")}
              </span>
            </li>
            <li>
              Fixed bridges:{" "}
              <span className="text-cream">{data.fixedBridges}</span>
            </li>
            <li>
              Budget:{" "}
              <span className="text-cream">${data.priceMaxM}M</span>
            </li>
            <li>
              Areas:{" "}
              <span className="text-cream">
                {data.preferredAreas.slice(0, 3).join(", ")}
                {data.preferredAreas.length > 3 ? "…" : ""}
              </span>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div>
      <StepHeading
        step={7}
        title="Your Contact Details"
        subtitle="A Barefoot Realty advisor will reach out with a curated shortlist matched to your exact criteria."
      />

      <div className="grid grid-cols-2 gap-4">
        <TextInput
          label="First Name"
          value={data.firstName}
          onChange={(v) => set("firstName", v)}
        />
        <TextInput
          label="Last Name"
          value={data.lastName}
          onChange={(v) => set("lastName", v)}
        />
      </div>
      <TextInput
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={data.email}
        onChange={(v) => set("email", v)}
      />
      <TextInput
        label="Phone (optional)"
        type="tel"
        placeholder="+1 (561) 000-0000"
        value={data.phone}
        onChange={(v) => set("phone", v)}
      />

      <p className="text-cream/25 text-xs leading-relaxed mt-2">
        Your information is shared only with Barefoot Realty advisors.
        We do not sell or distribute client data.
      </p>

      <NavButtons
        onBack={onBack}
        onNext={onSubmit}
        nextLabel="Find My Properties →"
        nextDisabled={!valid}
        isLast
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main quiz component
// ---------------------------------------------------------------------------

interface WaterfrontQuizProps {
  /** Called with the completed result when the user submits */
  onComplete?: (result: WaterfrontQuizResult) => void;
}

export default function WaterfrontQuiz({ onComplete }: WaterfrontQuizProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<WaterfrontQuizResult>(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  function set(key: keyof WaterfrontQuizResult, value: unknown) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function next() {
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }
  function back() {
    setStep((s) => Math.max(s - 1, 1));
  }

  function handleSubmit() {
    setSubmitted(true);
    onComplete?.(data);
  }

  const stepProps = { data, set };

  return (
    <div
      className="min-h-screen bg-onyx flex items-center justify-center px-4 py-16"
      style={{ backgroundColor: "#0a0a0a", color: "#f0e6d0" }}
    >
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-gold text-xs tracking-[0.4em] uppercase font-mono mb-3">
            Barefoot Realty &amp; Investments
          </p>
          <h1 className="text-4xl font-serif text-cream">
            Find Your Waterfront Home
          </h1>
        </div>

        {!submitted && <ProgressBar step={step} />}

        {/* Steps */}
        {step === 1 && <Step1 {...stepProps} onNext={next} />}
        {step === 2 && <Step2 {...stepProps} onBack={back} onNext={next} />}
        {step === 3 && <Step3 {...stepProps} onBack={back} onNext={next} />}
        {step === 4 && <Step4 {...stepProps} onBack={back} onNext={next} />}
        {step === 5 && <Step5 {...stepProps} onBack={back} onNext={next} />}
        {step === 6 && <Step6 {...stepProps} onBack={back} onNext={next} />}
        {step === 7 && (
          <Step7
            {...stepProps}
            onBack={back}
            onSubmit={handleSubmit}
            submitted={submitted}
          />
        )}
      </div>
    </div>
  );
}

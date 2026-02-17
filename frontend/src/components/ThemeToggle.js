import { Moon, Sun } from "lucide-react";

const ThemeToggle = ({ isDark, onToggle, className = "", compact = false }) => {
  const switchBase =
    "relative inline-flex h-8 w-14 items-center rounded-full border overflow-hidden transition-all duration-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1c3ff9]/50";
  const switchTone = isDark
    ? "border-[#2F5FFF] shadow-[0_0_0_1px_rgba(59,130,246,0.35),0_0_18px_rgba(37,99,235,0.35)]"
    : "border-[#D4DBEB] shadow-[0_0_0_1px_rgba(148,163,184,0.18)]";
  const knobBase =
    "absolute left-1 top-1 inline-flex h-6 w-6 items-center justify-center rounded-full border shadow-[0_3px_10px_rgba(15,23,42,0.25)] transition-all duration-700";
  const knobTone = isDark ? "bg-[#F8FBFF] border-[#D9E5FF]" : "bg-white border-[#E2E8F6]";

  const skyStyle = isDark
    ? {
        background:
          "linear-gradient(135deg, #050A15 0%, #0A1A32 48%, #1B3C75 100%)",
      }
    : {
        background:
          "linear-gradient(135deg, #F4F8FF 0%, #E9F0FF 48%, #D4E3FF 100%)",
      };

  const horizonStyle = isDark
    ? {
        background:
          "linear-gradient(180deg, rgba(12,25,46,0.2) 0%, rgba(4,9,18,0.82) 100%)",
      }
    : {
        background:
          "linear-gradient(180deg, rgba(148,163,184,0.08) 0%, rgba(191,219,254,0.42) 100%)",
      };

  const renderSwitch = () => (
    <button
      type="button"
      onClick={onToggle}
      className={`${switchBase} ${switchTone}`}
      aria-label={isDark ? "Passer en mode jour" : "Passer en mode nuit"}
      title={isDark ? "Passer en mode jour" : "Passer en mode nuit"}
    >
      <span className="absolute inset-0 transition-all duration-700" style={skyStyle} />
      <span className="absolute inset-x-0 bottom-0 h-[45%] transition-all duration-700" style={horizonStyle} />

      <span
        className={`absolute h-1 w-1 rounded-full bg-white transition-all duration-700 ${
          isDark ? "left-2 top-2 opacity-90 animate-pulse" : "left-1 top-5 opacity-0"
        }`}
        style={{ animationDelay: "120ms" }}
      />
      <span
        className={`absolute h-1 w-1 rounded-full bg-white transition-all duration-700 ${
          isDark ? "left-4 top-3 opacity-75 animate-pulse" : "left-2 top-5 opacity-0"
        }`}
        style={{ animationDelay: "240ms" }}
      />

      <span
        className={`${knobBase} ${knobTone} ${
          isDark ? "translate-x-6 translate-y-[1px]" : "translate-x-0 -translate-y-[1px]"
        }`}
      >
        <Sun
          className={`absolute h-3.5 w-3.5 text-[#A16207] transition-all duration-700 ${
            isDark ? "opacity-0 scale-50 rotate-90" : "opacity-100 scale-100 rotate-0"
          }`}
        />
        <Moon
          className={`absolute h-3.5 w-3.5 text-[#1D4ED8] transition-all duration-700 ${
            isDark ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 -rotate-90"
          }`}
        />
      </span>
    </button>
  );

  if (compact) {
    return (
      <div className={className}>{renderSwitch()}</div>
    );
  }

  return (
    <div className={`inline-flex items-center justify-between rounded-xl border border-[#E4EAF7] bg-[#F7FAFF] px-3 py-2 dark:border-[#2A2E39] dark:bg-[#101722] ${className}`}>
      <span className="text-xs font-semibold text-[#334155] dark:text-[#D7E2F7]">
        {isDark ? "Mode nuit" : "Mode jour"}
      </span>
      <div className="ml-3">{renderSwitch()}</div>
    </div>
  );
};

export default ThemeToggle;

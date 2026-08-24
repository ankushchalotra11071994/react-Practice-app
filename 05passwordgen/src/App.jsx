import { useState, useCallback, useEffect, useRef } from "react";

const LETTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

function classOf(ch) {
  if (NUMBERS.includes(ch)) return "number";
  if (LETTERS.includes(ch)) return "letter";
  return "symbol";
}

const CHAR_COLOR = {
  letter: "text-slate-900",
  number: "text-teal-600",
  symbol: "text-rose-600",
};

function strengthOf(bits) {
  if (bits < 40) return { label: "Weak", bar: "bg-rose-500", text: "text-rose-600" };
  if (bits < 60) return { label: "Fair", bar: "bg-amber-500", text: "text-amber-600" };
  if (bits < 90) return { label: "Strong", bar: "bg-teal-500", text: "text-teal-600" };
  return { label: "Excellent", bar: "bg-indigo-600", text: "text-indigo-600" };
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [hasNumber, setHasNumber] = useState(true);
  const [hasSymbol, setHasSymbol] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const passwordRef = useRef(null);

  const charset =
    LETTERS + (hasNumber ? NUMBERS : "") + (hasSymbol ? SYMBOLS : "");

  const generate = useCallback(() => {
    const pool =
      LETTERS + (hasNumber ? NUMBERS : "") + (hasSymbol ? SYMBOLS : "");

    const bytes = new Uint32Array(length);
    crypto.getRandomValues(bytes);

    let pass = "";
    for (let i = 0; i < length; i++) {
      pass += pool.charAt(bytes[i] % pool.length);
    }
    setPassword(pass);
    setCopied(false);
  }, [length, hasNumber, hasSymbol]);

  useEffect(() => {
    generate();
  }, [generate]);

  const bits = Math.round(length * Math.log2(charset.length));
  const strength = strengthOf(bits);
  const barWidth = Math.min(100, Math.round((bits / 128) * 100));

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      const el = passwordRef.current;
      if (el) {
        const range = document.createRange();
        range.selectNodeContents(el);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-sm">
        <div className="px-6 pt-6 pb-4 border-b border-slate-100">
          <h1 className="text-lg font-medium text-slate-900">
            Password generator
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Characters are colored by type so you can see the mix at a glance.
          </p>
        </div>

        <div className="px-6 py-6">
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
            <div
              ref={passwordRef}
              className="font-mono text-xl sm:text-2xl break-all leading-relaxed select-all"
              aria-live="polite"
              aria-label="Generated password"
            >
              {password
                ? password
                    .split("")
                    .map((ch, i) => (
                      <span key={i} className={CHAR_COLOR[classOf(ch)]}>
                        {ch}
                      </span>
                    ))
                : <span className="text-slate-400">Generating…</span>}
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 pt-3 border-t border-slate-200 text-xs">
              <span className="flex items-center gap-1.5 text-slate-500">
                <span className="w-2 h-2 rounded-full bg-slate-900" />
                letters
              </span>
              <span className="flex items-center gap-1.5 text-slate-500">
                <span className="w-2 h-2 rounded-full bg-teal-600" />
                numbers
              </span>
              <span className="flex items-center gap-1.5 text-slate-500">
                <span className="w-2 h-2 rounded-full bg-rose-600" />
                symbols
              </span>
            </div>
          </div>

          <div className="flex gap-2 mt-3">
            <button
              onClick={generate}
              className="flex-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-white text-sm font-medium py-2.5 transition-colors"
            >
              Generate new
            </button>
            <button
              onClick={copy}
              className="rounded-lg border border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-slate-700 text-sm font-medium px-5 py-2.5 transition-colors"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <div className="mt-6">
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-sm text-slate-600">Strength</span>
              <span className="text-sm">
                <span className={`font-medium ${strength.text}`}>
                  {strength.label}
                </span>
                <span className="text-slate-400 font-mono ml-2">
                  {bits} bits
                </span>
              </span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${strength.bar} rounded-full transition-all duration-300`}
                style={{ width: `${barWidth}%` }}
              />
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-baseline justify-between mb-2">
              <label htmlFor="length" className="text-sm text-slate-600">
                Length
              </label>
              <span className="font-mono text-sm text-slate-900">{length}</span>
            </div>
            <input
              id="length"
              type="range"
              min="4"
              max="64"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>

          <div className="mt-5 space-y-1">
            <Toggle
              id="numbers"
              label="Include numbers"
              hint="0–9"
              checked={hasNumber}
              onChange={setHasNumber}
            />
            <Toggle
              id="symbols"
              label="Include symbols"
              hint="!@#$%^&*"
              checked={hasSymbol}
              onChange={setHasSymbol}
            />
          </div>

          <p className="mt-5 text-xs text-slate-400">
            Pool size {charset.length} characters. Generated with
            crypto.getRandomValues.
          </p>
        </div>
      </div>
    </div>
  );
}

function Toggle({ id, label, hint, checked, onChange }) {
  return (
    <label
      htmlFor={id}
      className="flex items-center justify-between py-2 cursor-pointer group"
    >
      <span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors">
        {label}
        <span className="font-mono text-xs text-slate-400 ml-2">{hint}</span>
      </span>
      <span className="relative inline-flex items-center">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <span className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-indigo-600 peer-focus:ring-2 peer-focus:ring-indigo-500 peer-focus:ring-offset-2 transition-colors" />
        <span className="absolute left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-4" />
      </span>
    </label>
  );
}

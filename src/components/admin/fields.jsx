// Plain presentational form-field markup shared across admin forms. These
// are uncontrolled native inputs read via FormData in a server action, so
// none of this needs to be a Client Component.

export function Field({ label, help, children }) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</label>
      {children}
      {help && <p className="text-xs text-muted-foreground mt-1">{help}</p>}
    </div>
  );
}

const inputClass = 'w-full min-h-[40px] px-3 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary';

export function TextInput({ name, defaultValue, placeholder, required, type = 'text' }) {
  return <input type={type} name={name} defaultValue={defaultValue ?? ''} placeholder={placeholder} required={required} className={inputClass} />;
}

export function NumberInput({ name, defaultValue, placeholder, step = 'any' }) {
  return <input type="number" step={step} name={name} defaultValue={defaultValue ?? ''} placeholder={placeholder} className={inputClass} />;
}

export function TextArea({ name, defaultValue, rows = 4, placeholder }) {
  return <textarea name={name} defaultValue={defaultValue ?? ''} rows={rows} placeholder={placeholder} className={inputClass} />;
}

export function SelectInput({ name, defaultValue, options }) {
  return (
    <select name={name} defaultValue={defaultValue ?? options[0]} className={inputClass}>
      {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  );
}

export function CheckboxInput({ name, defaultChecked, label }) {
  return (
    <label className="flex items-center gap-2 min-h-[40px] cursor-pointer">
      <input type="checkbox" name={name} defaultChecked={!!defaultChecked} className="w-4 h-4 rounded border-border text-primary focus:ring-primary" />
      <span className="text-sm">{label}</span>
    </label>
  );
}

export function SaveButton() {
  return (
    <button type="submit" className="px-6 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:scale-[1.02] transition-transform">
      Save
    </button>
  );
}

export default function InputBox({ label,placeholder,onChange,type, value,disabled}) {
    return (
      <div className="p-1">
        <div className="font-semibold pl-1">{label}</div>
        <input type={`${type?type:"text"}`} onChange={onChange} value={value}  placeholder={placeholder} disabled={disabled} className="w-[100%] placeholder:pl-3 p-1.5 rounded-md border-solid border border-slate-400 mt-1"/>
      </div>
    );
  }
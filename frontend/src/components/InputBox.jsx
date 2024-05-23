export default function InputBox({ label,placeholder,onChange}) {
    return (
      <div className="p-1">
        <div className="font-semibold pl-1">{label}</div>
        <input type="text" onChange={onChange}  placeholder={placeholder} className="w-[100%] placeholder:pl-3 p-1.5 rounded-md border-solid border border-slate-400 mt-1"/>
      </div>
    );
  }
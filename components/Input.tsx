interface InputProps {
  label: string;
  placeholder: string;
  name: string;
  textarea?: boolean;
  onChangeText?: (text: string) => void;
  value?: string;
}
const Input = (props: InputProps) => {
  const Component = props.textarea ? "textarea" : "input";
  return (
    <label className="text-zinc-700 font-medium flex flex-col gap-1">
      {props.label}
      <Component
        type="text"
        value={props.value}
        onChange={(e) => props.onChangeText?.(e.target.value)}
        name={props.name}
        placeholder={props.placeholder}
        className="w-full px-4 py-3 max-sm:p-2 rounded font-normal bg-white border border-zinc-200 text-base placeholder:text-zinc-300 outline-none focus:outline focus:outline-black focus:border-black outline-offset-0 outline-1"
      />
    </label>
  );
};

export default Input;

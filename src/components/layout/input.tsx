import { Search } from "lucide-react";
import React, { ChangeEvent } from "react";
import { useRouter } from "next/navigation";

interface inputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const Input = ({ value, onChange, placeholder }: inputProps) => {
  const router = useRouter();

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    router.push(`/search?query=${value}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex items-center w-full max-w-87.5"
    >
      <button
        type="submit"
        className="absolute left-3 flex items-center bg-transparent border-none cursor-pointer"
      >
        <Search className="w-5 h-5 text-white/50" />
      </button>

      <input
        type="text"
        className="w-full min-w-75 bg-white/8 border border-white/12 text-white px-5 py-3 pl-11.25 rounded-[10px] text-[14px] font-['Poppins'] transition-all duration-300 ease-in-out outline-none focus:bg-white/12 focus:border-[#00ffa1] focus:ring-4 focus:ring-[#00ffa1]/15 placeholder:text-white/50"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </form>
  );
};

export default Input;

import { secretTextFieldProps } from "@/utils/types/frondend/secretTextFieldProps";
import { Dispatch, SetStateAction } from "react";

export default function EncryptedTextField({
  encryptedText,
  setEncryptedText,
}: secretTextFieldProps) {
  return (
    <div className="w-full h-[48%] my-4 flex flex-col">
      <label className="font-bold text-[16px]">Encrypted Text</label>
      <input
        type="text"
        value={encryptedText}
        onChange={(e) => setEncryptedText(e.target.value)}
        className="w-full h-[60px] p-2 mt-4 bg-[#33415C] rounded-[14px] font-bold outline-none"
      />
      <button className="w-full h-[40px] mt-[1em] bg-white text-black font-bold rounded-[9px]">
        Copy to clipboard
      </button>
    </div>
  );
}

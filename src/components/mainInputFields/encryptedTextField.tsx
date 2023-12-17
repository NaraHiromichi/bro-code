import { Dispatch, SetStateAction } from "react";

interface Props {
  encryptedText: string;
  setEncryptedText: Dispatch<SetStateAction<string>>;
}
export default function EncryptedTextField({
  encryptedText,
  setEncryptedText,
}: Props) {
  return (
    <div className="w-full h-[48%] my-4 flex flex-col">
      <label className="font-bold text-[16px]">Encrypted Text</label>
      <input
        type="text"
        value={encryptedText}
        onChange={(e) => setEncryptedText(e.target.value)}
        className="w-full h-[60px] p-2 mt-4 bg-[#33415C] rounded-[14px] font-bold"
      />
      <button className="w-full h-[40px] mt-[1em] bg-[#0466C8] font-bold rounded-[9px]">
        Copy to clipboard
      </button>
    </div>
  );
}

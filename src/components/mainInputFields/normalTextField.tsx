import { copyContent } from "@/utils/functions/copy";
import { normalTextFieldProps } from "@/utils/types/frondend/normalTextFieldProps";
import { Dispatch, SetStateAction } from "react";

export default function NormalTextField({
  normalText,
  setNormalText,
}: normalTextFieldProps) {
  return (
    <div className="w-full h-[48%] my-4 flex flex-col">
      <label className="font-bold text-[16px]">Normal Text</label>
      <input
        type="text"
        value={normalText}
        onChange={(e) => setNormalText(e.target.value)}
        className="w-full h-[60px] p-2 mt-4 bg-[#33415C] rounded-[14px] font-bold outline-none"
      />
      <button
        onClick={async () => {
          await copyContent(normalText);
        }}
        className="w-full h-[40px] mt-[1em] bg-[#0466C8] font-bold rounded-[9px]"
      >
        Copy to clipboard
      </button>
    </div>
  );
}

import { Dispatch, SetStateAction } from "react";

interface Props {
  normalText: string;
  setNormalText: Dispatch<SetStateAction<string>>;
}
export default function NormalTextField({ normalText, setNormalText }: Props) {
  return (
    <div className="w-full h-[48%] my-4 flex flex-col">
      <label className="font-bold text-[16px]">Normal Text</label>
      <input
        type="text"
        value={normalText}
        onChange={(e) => setNormalText(e.target.value)}
        className="w-full h-[60px] p-2 mt-4 bg-[#33415C] rounded-[14px] font-bold"
      />
      <button className="w-full h-[40px] mt-[1em] bg-[#0466C8] font-bold rounded-[9px]">
        Copy to clipboard
      </button>
    </div>
  );
}

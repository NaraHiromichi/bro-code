import MainInputField from "@/components/mainInputFields";
import { keyProps } from "@/utils/types/frondend/keyType";
import { Dispatch, SetStateAction, useState } from "react";

export default function KeyField({
  encryptionKey,
  setEncryptionKey,
}: keyProps) {
  return (
    <div className="w-[100%] h-[10%] mx-auto mb-[5em] flex justify-between items-center">
      <label className="font-bold text-[16px]">Key</label>
      <input
        type="number"
        value={encryptionKey}
        onChange={(e) => setEncryptionKey(e.target.value)}
        className="w-[80%] h-[50px] p-2 bg-[#33415C] rounded-[14px] font-bold outline-none"
      />
    </div>
  );
}

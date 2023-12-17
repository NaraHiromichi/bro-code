import { Dispatch, SetStateAction } from "react";

export interface secretTextFieldProps {
  encryptedText: string;
  setEncryptedText: Dispatch<SetStateAction<string>>;
}

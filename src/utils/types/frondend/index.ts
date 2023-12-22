import { Dispatch, SetStateAction } from "react";
import { keyProps } from "./keyType";
import { normalTextFieldProps } from "./normalTextFieldProps";
import { secretTextFieldProps } from "./secretTextFieldProps";

export default interface mainInputFieldProps
  extends keyProps,
    normalTextFieldProps,
    secretTextFieldProps {
  encryptionKey: string;
  swapped: "encryption" | "decryption";
  setSwapped: Dispatch<SetStateAction<"encryption" | "decryption">>;
}

import { Dispatch, SetStateAction } from "react";

export interface keyProps {
  encryptionKey: string;
  setEncryptionKey: Dispatch<SetStateAction<string>>;
}

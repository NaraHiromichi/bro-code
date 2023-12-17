import { Dispatch, SetStateAction } from "react";

export interface normalTextFieldProps {
  normalText: string;
  setNormalText: Dispatch<SetStateAction<string>>;
}

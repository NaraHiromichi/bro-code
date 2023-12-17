{
  /* <NormalTextField normalText={normalText} setNormalText={setNormalText} />,
<EncryptedTextField
  encryptedText={encryptedText}
  setEncryptedText={setEncryptedText}
/>, */
}
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import NormalTextField from "./normalTextField";
import EncryptedTextField from "./encryptedTextField";
import { Flipper, Flipped } from "react-flip-toolkit";

interface Props {
  normalText: string;
  setNormalText: Dispatch<SetStateAction<string>>;
  encryptedText: string;
  setEncryptedText: Dispatch<SetStateAction<string>>;
}

interface SwapComponentsType {
  component: JSX.Element;
  key: number;
}
export default function MainInputField({
  normalText,
  setNormalText,
  encryptedText,
  setEncryptedText,
}: Props) {
  const [swapped, setSwapped] = useState(false);
  const [swapComponents, setSwapComponents] = useState(["Normal", "Encrypted"]);
  console.log(swapComponents);
  return (
    <div className="w-[80%] h-[45%] mx-auto">
      <Flipper flipKey={swapComponents}>
        {swapComponents.map((component, index) => {
          if (component === "Normal") {
            return (
              <Flipped key={index} flipId={index}>
                <NormalTextField
                  normalText={normalText}
                  setNormalText={setNormalText}
                />
              </Flipped>
            );
          }
          return (
            <Flipped key={index} flipId={index}>
              <EncryptedTextField
                encryptedText={encryptedText}
                setEncryptedText={setEncryptedText}
              />
            </Flipped>
          );
        })}
      </Flipper>
      <button
        onClick={() => {
          let temp = swapComponents;
          temp.push(temp.shift() as string);
          console.log(temp);
          setSwapComponents(temp);
          setSwapped(!swapped);
        }}
        className="w-[135px] h-[42px] text-center bg-black font-white font-bold text-[16px] border-2 border-white rounded-[9px]"
      >
        Swap
      </button>
    </div>
  );
}

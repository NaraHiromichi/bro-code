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
import KeyField from "../key";
import mainInputFieldProps from "@/utils/types/frondend";
import { envVariable } from "@/utils/envLoader";
import { dataRecievedFromEncryption } from "@/utils/types/frondend/frondendReceiveType";

interface SwapComponentsType {
  component: JSX.Element;
  key: number;
}
export default function MainInputField({
  encryptionKey,
  setEncryptionKey,
  normalText,
  setNormalText,
  encryptedText,
  setEncryptedText,
}: mainInputFieldProps) {
  const [swapped, setSwapped] = useState(false);
  const [swapComponents, setSwapComponents] = useState(["Normal", "Encrypted"]);
  console.log(swapComponents);

  //useEffect goes here

  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_MAIN_URL);
    const fetchEncryptedText = async () => {
      const res = await fetch(`${envVariable.mainUrl}/api/encryption`, {
        method: "POST",
        body: JSON.stringify(normalText),
      });
      return res.json();
    };
    fetchEncryptedText().then((data: dataRecievedFromEncryption) => {
      if (data.error !== undefined) return;
      if (data.encryptedText === "" || data.encryptedText === undefined) return;
      setEncryptedText(data.encryptedText);
    });
  }, [encryptionKey, normalText]);

  return (
    <div className="w-[80%] h-[50%] mx-auto -translate-y-[20%]">
      <KeyField
        encryptionKey={encryptionKey}
        setEncryptionKey={setEncryptionKey}
      />
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

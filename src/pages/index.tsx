import KeyField from "@/components/key";
import MainInputField from "@/components/mainInputFields";
import { useState } from "react";

export default function Home() {
  const [encryptionKey, setEncryptionKey] = useState<string>("");
  const [normalText, setNormalText] = useState<string>("");
  const [encryptedText, setEncryptedText] = useState<string>("");
  return (
    <main className="w-[100vw] h-[100vh] bg-[#080D15] font-ubuntu flex flex-col justify-between">
      <header className="w-[80%] h-[100] pt-5 mx-auto text-[36px] tracking-[8px] text-[#0466C8] font-[500] ">
        <h1>Bro</h1>
        <h1>Code</h1>
      </header>

      <MainInputField
        encryptionKey={encryptionKey}
        setEncryptionKey={setEncryptionKey}
        normalText={normalText}
        setNormalText={setNormalText}
        encryptedText={encryptedText}
        setEncryptedText={setEncryptedText}
      />
      <footer className="w-[80%] h-[5%] mx-auto flex justify-between">
        <div className="font-bold border-b-4 border-white">Short text</div>
        <div>Long text</div>
      </footer>
    </main>
  );
}

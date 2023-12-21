// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { EncryptionAndDecryption } from "@/utils/types/backend/encryptionAndDecryption";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  normalText: string | undefined;
  encryptedText: string | undefined;
  error: string | undefined;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === ("GET" || "PUSH" || "DELETE")) {
    res.status(401).json({ error: "unauthorized", normalText: undefined, encryptedText: undefined });
  }
  if (req.body === undefined) {
 res
      .status(400)
      .json({ error: "something went wrong!", normalText: undefined, encryptedText: undefined });
    return;
  }
  const { normalText, encryptedText, encryptionKey }: EncryptionAndDecryption = JSON.parse(req.body);
  if (
    encryptionKey === "" ||
    encryptedText === "" ||
    encryptionKey === undefined ||
    encryptedText === undefined ||
    encryptionKey.length === 0 ||
    encryptedText.length === 0
)
{
  console.log("testing 2", req.body.encryptionKey)
  res
      .status(400)
      .json({ error: "something went wrong!", normalText: undefined, encryptedText: undefined });
  return;

}
  // makeing alphabet array
  let alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const capitalLetters = alpha.map((x) => String.fromCharCode(x));
  const smallLetters = capitalLetters.map((l) => l.toLowerCase());

  //functions start here

  //encryptFunc
  const decryptProcess = (Text: string[], key: number[]) => {
    return new Promise<string[]>((resolve) => {
      let decryptedText: string[] = [];
      Text.forEach((t) => {
        const isCapital = t.toUpperCase() === t ? true : false;
        if (t === " ") {
          decryptedText.push(" ");
          return;
        }
        const tempIndex = isCapital
          ? capitalLetters.indexOf(t)
          : smallLetters.indexOf(t);
        const leftItemCount = tempIndex
        const excessItemCount: number = key[0] - leftItemCount;

        if (excessItemCount > 0) {
          decryptedText.push(
            isCapital
              ? capitalLetters[capitalLetters.length - excessItemCount]
              : smallLetters[smallLetters.length - excessItemCount]
          );
          // for infinite nested loop
          key.push(key.shift() as number);
          return;
        }

        decryptedText.push(isCapital ? capitalLetters[tempIndex - key[0]] : smallLetters[tempIndex - key[0]])
        // for infinite nested loop
        key.push(key.shift() as number);
      });
      resolve(decryptedText);
    });
  };
  const mainProcess = async () => {
    const Text = encryptedText.split("");

    const key = encryptionKey.split("").map((k: string) => parseInt(k)) as number[];
    const encrpytedTextArray = await decryptProcess(Text, key);

    const decryptedText = encrpytedTextArray.join("");
    console.log({ normalText: normalText, encryptedText: decryptedText, error: undefined });
    res.status(200).json({ normalText: normalText, encryptedText: decryptedText, error: undefined });
  };
  mainProcess();
  console.log("test")
}

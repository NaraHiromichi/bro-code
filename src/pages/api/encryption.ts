// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { skipElememts } from "@/utils/resuableVariables/skipElements";
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
    res.status(401).json({
      error: "unauthorized",
      normalText: undefined,
      encryptedText: undefined,
    });
  }
  if (req.body === undefined) {
    res.status(400).json({
      error: "something went wrong!",
      normalText: undefined,
      encryptedText: undefined,
    });
    return;
  }
  const { normalText, encryptedText, encryptionKey }: EncryptionAndDecryption =
    JSON.parse(req.body);
  if (
    encryptionKey === "" ||
    normalText === "" ||
    encryptionKey === undefined ||
    normalText === undefined ||
    encryptionKey.length === 0 ||
    normalText.length === 0
  ) {
    console.log("testing 2", req.body.encryptionKey);
    res.status(400).json({
      error: "something went wrong!",
      normalText: undefined,
      encryptedText: undefined,
    });
    return;
  }
  // makeing alphabet array
  let alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const capitalLetters = alpha.map((x) => String.fromCharCode(x));
  const smallLetters = capitalLetters.map((l) => l.toLowerCase());

  //functions start here

  //encryptFunc
  const encryptProcess = (Text: string[], key: number[]) => {
    return new Promise<string[]>((resolve) => {
      let encrpytedText: string[] = [];
      Text.forEach((t) => {
        const isCapital = t.toUpperCase() === t ? true : false;
        // validate spacebars.../ question marks.../ <... >.... (...) \\\ "" '' {} *&^%$%$#@!~``,/|
        //skipElements is imported from utils
        const needToSkip = skipElememts.includes(t);
        if (needToSkip) {
          encrpytedText.push(skipElememts[skipElememts.indexOf(t)]);
          return;
        }
        const tempIndex = isCapital
          ? capitalLetters.indexOf(t)
          : smallLetters.indexOf(t);
        const leftItemCount = capitalLetters.length - (tempIndex + 1);
        const excessItemCount: number = key[0] - leftItemCount;

        if (excessItemCount > 0) {
          encrpytedText.push(
            isCapital
              ? capitalLetters[excessItemCount - 1]
              : smallLetters[excessItemCount - 1]
          );
          // for infinite nested loop
          key.push(key.shift() as number);
          return;
        }

        encrpytedText.push(
          isCapital
            ? capitalLetters[key[0] + tempIndex]
            : smallLetters[key[0] + tempIndex]
        );
        // for infinite nested loop
        key.push(key.shift() as number);
      });
      resolve(encrpytedText);
    });
  };
  const mainProcess = async () => {
    const Text = normalText.split("");

    const key = encryptionKey
      .split("")
      .map((k: string) => parseInt(k)) as number[];
    const encrpytedTextArray = await encryptProcess(Text, key);

    const encryptedText = encrpytedTextArray.join("");
    console.log(encryptedText);
    res.status(200).json({
      normalText: normalText,
      encryptedText: encryptedText,
      error: undefined,
    });
  };
  mainProcess();
  console.log("test");
}

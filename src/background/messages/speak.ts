import type { PlasmoMessaging } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage";
import { storageKeys } from "~storage_keys";
import type { Settings } from "~types/settings";

const handler: PlasmoMessaging.MessageHandler<string> = async (req) => {
  const storage = new Storage({ area: "local" });
  const isMuted = await storage.get<boolean>(storageKeys.isMuted);

  // ミュート状態なら読み上げをスキップする
  if (isMuted) {
    return;
  }

  // 読み上げ設定を取得する
  const settings = await storage.get<Settings>(storageKeys.settings);

  // テキストを読み上げる
  chrome.tts.speak(req.body, {
    volume: settings.volume,
    pitch: settings.pitch,
    rate: settings.rate,
  });
};

export default handler;

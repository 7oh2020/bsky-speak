import type { PlasmoMessaging } from "@plasmohq/messaging";
import { Storage } from "@plasmohq/storage";
import { storageKeys } from "~storage_keys";

const handler: PlasmoMessaging.MessageHandler = async () => {
    const storage = new Storage({ area: "local" });
    await storage.set(storageKeys.history, []);
};

export default handler;

import type { PlasmoMessaging } from "@plasmohq/messaging";
import { Storage } from "@plasmohq/storage";
import { storageKeys } from "~storage_keys";

const handler: PlasmoMessaging.MessageHandler<string> = async (req) => {
    const storage = new Storage({ area: "local" });
    const ids = await storage.get<string[]>(storageKeys.history);
    await storage.set(
        storageKeys.history,
        [req.body, ...ids].slice(0, 30)
    );
};

export default handler;

import type { PlasmoMessaging } from "@plasmohq/messaging";
import { Storage } from "@plasmohq/storage";
import { storageKeys } from "~storage_keys";
import type { Settings } from "~types/settings";

const handler: PlasmoMessaging.MessageHandler<Settings> = async (req) => {
    const storage = new Storage({ area: "local" });
    const settings = await storage.get<Settings>(storageKeys.settings);
    await storage.set(
        storageKeys.settings,
        req.body,
    );
};

export default handler;

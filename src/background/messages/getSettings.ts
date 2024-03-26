import type { PlasmoMessaging } from "@plasmohq/messaging";
import { Storage } from "@plasmohq/storage";
import { storageKeys } from "~storage_keys";
import type { Settings } from "~types/settings";

const handler: PlasmoMessaging.MessageHandler<unknown, Settings> = async (
    _,
    res
) => {
    const storage = new Storage({ area: "local" });
    const settings = await storage.get<Settings>(storageKeys.settings);

    res.send(settings);
};

export default handler;

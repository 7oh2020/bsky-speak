import type { PlasmoMessaging } from "@plasmohq/messaging";
import { Storage } from "@plasmohq/storage";
import { storageKeys } from "~storage_keys";

const handler: PlasmoMessaging.MessageHandler<unknown, string[]> = async (
    _,
    res
) => {
    const storage = new Storage({ area: "local" });
    const ids = await storage.get<string[]>(storageKeys.history);

    res.send(ids);
};

export default handler;

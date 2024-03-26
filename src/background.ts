import { Storage } from "@plasmohq/storage";
import { storageKeys } from "~storage_keys";
import type { Settings } from "~types/settings";

export { }

// インストール時のイベント
chrome.runtime.onInstalled.addListener(async (_) => {
    const storage = new Storage({ area: "local" });
    await storage.set(storageKeys.history, []);
    await storage.set(storageKeys.isMuted, false);

    const settings: Settings = {
        volume: 0.5,
        pitch: 1.0,
        rate: 10,
    };
    await storage.set(storageKeys.settings, settings);
});

// コマンド入力イベント
chrome.commands.onCommand.addListener(async (command) => {
    switch (command) {
        // ミュート状態を切り替える
        case "toggleMute": {
            const storage = new Storage({ area: "local" });
            const isMuted = await storage.get<boolean>(storageKeys.isMuted);
            storage.set(storageKeys.isMuted, !isMuted);
            break;
        }
        default: {
            throw new Error(`no command: ${command}`);
        }
    }
});


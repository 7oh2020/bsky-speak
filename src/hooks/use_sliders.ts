import { sendToBackground } from "@plasmohq/messaging";
import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import type { Settings } from "~types/settings";

export const useSliders = () => {
    const [volume, setVolume] = useState<number>(1.0)
    const [pitch, setPitch] = useState<number>(1.0)
    const [rate, setRate] = useState<number>(1.0)

    const handleChangeVolume = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setVolume(parseFloat(event.target.value));
    }, []);

    const handleChangePitch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setPitch(parseFloat(event.target.value));
    }, []);

    const handleChangeRate = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setRate(parseInt(event.target.value));
    }, []);

    // 設定値をロードする
    useEffect(() => {
        const loadSettings = async () => {
            const settings = await sendToBackground<unknown, Settings>({ name: "getSettings" });
            setVolume(settings.volume);
            setPitch(settings.pitch);
            setRate(settings.rate);
        };
        loadSettings();
    }, []);

    // 変更時に設定値を保存する
    useEffect(() => {
        sendToBackground<Settings>({ name: "putSettings", body: { volume, pitch, rate } });
    }, [volume, pitch, rate]);

    return {
        data: {
            volume,
            pitch,
            rate,
            handleChangeVolume,
            handleChangePitch,
            handleChangeRate,
        }
    }
};

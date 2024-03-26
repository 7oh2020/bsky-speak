import { sendToBackground } from "@plasmohq/messaging";
import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://firesky.tv/*"]
}

// 更新のインターバル(ミリ秒)
const interval = 3500;

// タイマーのハンドルID
let timerId = null;

const startInterval = () => {
  timerId = setInterval(main, interval);
};

const stopInterval = () => {
  if (timerId != null) {
    clearInterval(timerId);
  }
};

// アクティブタブの更新イベント
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === 'visible') {
    // アクティブになった時
    startInterval();
  } else {
    // 非アクティブになった時
    stopInterval();
  }
});

window.addEventListener("load", () => {
  // 履歴リストをクリアする
  sendToBackground({ name: "clearHistory" });

  startInterval();
})

const main = async () => {
  // 履歴リストを取得する
  const ids = await sendToBackground<unknown, string[]>({ name: "getHistory" });

  // 投稿を取得する
  const elements = Array.from(document.querySelectorAll(`div[class="target"]`));

  // 最新30件の投稿を処理する
  elements
    .slice(0, 30)
    .forEach(elem => {
      // div要素でない場合はスキップする
      if (!(elem instanceof HTMLDivElement)) return;

      // URLをIDとして扱う
      const id = elem.parentElement.getAttribute("href");

      // 読み上げ済みならスキップする
      if (ids.includes(id)) return;

      // テキストを読み上げる
      sendToBackground<string>({
        name: "speak",
        body: elem.textContent,
      });

      // IDを履歴リストに追加する
      sendToBackground<string>({ name: "pushHistory", body: id });
    });
};

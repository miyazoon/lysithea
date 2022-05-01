import { Checker } from "./checker";
import { InputAssist } from "./inputAssist";
import { WorkSheet } from "./workSheet";

if (window.location.hostname === 'job.cloud.lysithea.jp') {

    let titleElement: HTMLElement | null = document.getElementById("funcBar-title");
    let title = titleElement ? titleElement.textContent : "";
    switch (title) {
        /** 個人 */
        case '勤休内容登録':
            // 勤怠自動入力セレクトボックスを配置.
            const inputAssist: InputAssist = new InputAssist()
            document.getElementsByClassName('funcNav')[0].appendChild(inputAssist.div);
            break;

        case '勤休日次一覧':
        case "社員別勤休内容承認":
            // 勤怠リストのチェック
            const workSheet = new WorkSheet();
            workSheet.check();
            break;

        case '承認待ち勤休内容一覧':
        case '月次承認状況一覧':
            // 一括承認ボタンを無効化.
            const buttton: HTMLButtonElement = <HTMLButtonElement>document.getElementsByClassName('btn btn-big')[0]
            buttton.disabled = true
            break;

        case '作業時間一覧':
            // 稼働時間チェック用フォームを配置.
            const checker = new Checker()
            const gBody = document.getElementById("gBody");
            if (gBody != null) {
                gBody.appendChild(checker.div);
            }
        default:
            break;
    }
}


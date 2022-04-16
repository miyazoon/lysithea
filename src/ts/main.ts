import { Checker } from "./checker";
import { Input } from "./input";
import { List } from "./list";

if (window.location.hostname === 'job.cloud.lysithea.jp') {

    const page: string = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
    switch (page) {
        /** 個人 */
        case 'WC020.jsp': /** 勤休内容登録画面 */
            // 勤怠自動入力セレクトボックスを配置.
            const input: Input = new Input()
            document.getElementsByClassName('funcNav')[0].appendChild(input.div);
            break;
        
        case 'WK030.jsp': /** 勤休日次一覧 */
            // 勤怠リストのチェック(個人)
            const list: List = new List(false);
            list.check();
            break;

        /** 管理者 */
        case 'WJ020.jsp': /** 承認待ち勤休内容一覧 */
        case 'WJ060.jsp': /** 月次承認状況一覧 */
            // 一括承認ボタンを無効化.
            const buttton: HTMLButtonElement = <HTMLButtonElement>document.getElementsByClassName('btn btn-big')[0]
            buttton.disabled = true
            break;

        case "WJ050.jsp":　/** 社員別勤休内容承認 */
            // 勤怠リストのチェック(管理者)
            const adminlist: List = new List(true);
            adminlist.check();
            break;
        
        case 'ChildInvoker':
            const checker = new Checker()
            const gBody = document.getElementById("gBody");
            if (gBody != null) {
                gBody.appendChild(checker.div);
            }
        default:
            break;
    }
}


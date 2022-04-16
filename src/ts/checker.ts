export class Checker {
    private _div: HTMLDivElement = document.createElement("div");

    get div(): HTMLDivElement {
        return this._div;
    }

    constructor() {
        const textarea: HTMLTextAreaElement = document.createElement("textarea");
        textarea.id = "textarea"
        textarea.rows = 30
        textarea.cols = 60
        this._div.appendChild(textarea);

        const button: HTMLButtonElement = document.createElement("button")
        button.innerText = "勤怠チェック"
        button.onclick = function () {
            let kinmudatalist = document.getElementsByClassName('kinmudatalist')[0]
            let table = kinmudatalist.getElementsByTagName("table")[0]
            let textarea: HTMLInputElement = <HTMLInputElement>document.getElementById("textarea")
            const excels = textarea.value.split(/\n/);
            [...excels].forEach(function (excel) {
                let val = excel.split('\t');
                let date = val[0].trim()
                let time = val[1].trim()
                if (!time) {
                    return;
                }
                for (let i = 1, rowLen = table.rows.length; i < rowLen; i++) {
                    if (table.rows[i].cells[2].getElementsByTagName("span")[0].innerHTML.replace("<br>", "").trim() !== '大日本印刷/ハイブリッド総合書店システム') {
                        continue;
                    }

                    if (table.rows[i].cells[0].getElementsByTagName("span")[0].innerHTML.replace("<br>", "").trim() === date) {
                        if (table.rows[i].cells[5].getElementsByTagName("span")[0].innerHTML.replace("<br>", "").trim() !== Checker.changeTimeFormat(time)) {
                            table.rows[i].cells[5].style.backgroundColor = "red";
                        } else {
                            table.rows[i].cells[5].style.backgroundColor = "blue";
                        }
                    }
                }
            });
        }
        this._div.appendChild(button);
    }

    static changeTimeFormat(val: string) {
        let v = val.split('.')
        let h = v[0]
        let m = v[1] === "00" ? v[1] : String(Number(v[1]) * 0.6)
        return h + ":" + m;
    }
}


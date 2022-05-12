export class InputAssist {

    private _div: HTMLDivElement = document.createElement("div");
    private _div2: HTMLDivElement = document.createElement("div");
    private _div3: HTMLDivElement = document.createElement("div");
    private _div4: HTMLDivElement = document.createElement("div");

    get div(): HTMLDivElement {
        return this._div;
    }

    private _start: HTMLSelectElement = document.createElement("select");
    private _end: HTMLSelectElement = document.createElement("select");
    private _telework: HTMLInputElement = document.createElement("input");
    private _button: HTMLInputElement = document.createElement("input");

    constructor() {
        this.setStartElement();
        this.setEndElement();
        this.setTelework();
        this.setButton();

        this._div.className = "container"
        this._div2.className = "fb fb-lr"
        this._div3.className = "fb fb-column"
        this._div4.className = "fi"

        this._div4.id = "workTime"
        this._div4.appendChild(this._start);
        this._div4.appendChild(this._end);
        this._div4.appendChild(this._telework);
        this._div4.appendChild(this._button);

        this._div2.appendChild(this._div3)
        this._div2.appendChild(this._div4)

        this._div.appendChild(this._div2)
    }

    private setStartElement(): void {
        this._start.name = "_start"

        this._start.add(new Option("09:30", "0930", true));
        this._start.add(new Option("08:00", "0800"));
        this._start.add(new Option("08:30", "0830"));
        this._start.add(new Option("08:45", "0845"));
        this._start.add(new Option("09:00", "0900"));
        this._start.add(new Option("09:15", "0915"));
        this._start.add(new Option("09:30", "0930"));
        this._start.add(new Option("10:00", "1000"));

        this._start.style.marginLeft = "10px";
    }

    private setEndElement(): void {
        this._end.name = "_end"

        this._end.add((new Option("19:00", "1900", true)));
        this._end.add((new Option("17:00", "1700")));
        this._end.add((new Option("17:15", "1715")));
        this._end.add((new Option("17:30", "1730")));
        this._end.add((new Option("17:45", "1745")));
        this._end.add((new Option("18:00", "1800")));
        this._end.add((new Option("18:15", "1815")));
        this._end.add((new Option("18:30", "1830")));
        this._end.add((new Option("18:45", "1845")));
        this._end.add((new Option("19:00", "1900")));
        this._end.add((new Option("19:15", "1915")));
        this._end.add((new Option("19:30", "1930")));
        this._end.add((new Option("19:45", "1945")));
        this._end.add((new Option("20:00", "2000")));
        this._end.add((new Option("20:15", "2015")));
        this._end.add((new Option("20:30", "2030")));
        this._end.add((new Option("20:45", "2045")));
        this._end.add((new Option("21:00", "2100")));
        this._end.add((new Option("21:15", "2115")));
        this._end.add((new Option("21:30", "2130")));
        this._end.add((new Option("21:45", "2145")));

        this._end.style.marginLeft = "10px";
    }

    private setTelework(): void {
        this._telework.name = "_telework"

        this._telework.setAttribute("type", "checkbox");
        this._telework.setAttribute("checked", "checked");

        this._telework.style.marginLeft = "10px";
        this._telework.style.display = "inline-block";
        this._telework.style.verticalAlign = "middle";
    }

    private setButton(): void {
        this._button.setAttribute("type", "button");
        this._button.value = "勤怠入力"
        this._button.style.marginLeft = "10px";

        this._button.onclick = function () {
            const start = (<HTMLSelectElement>document.getElementsByName("_start")[0]).value
            const end = (<HTMLSelectElement>document.getElementsByName("_end")[0]).value
            const telework = (<HTMLInputElement>document.getElementsByName("_telework")[0]).checked

            clearCostManagement();

            const workTime = new WorkTime(start, end);
            // 作業時間
            let totalQuantity: HTMLInputElement = <HTMLInputElement>document.getElementById('TotalQuantity');
            totalQuantity.value = ''; // 一旦初期化

            // 始業時刻
            let startTime: HTMLInputElement = <HTMLInputElement>document.getElementById('attendanceStartTimeCheck');
            startTime.value = start;

            //終業時刻
            let endTime: HTMLInputElement = <HTMLInputElement>document.getElementById('attendanceEndTimeCheck');
            endTime.value = workTime.calcEndTime();

            // 勤務区分
            let workDivision: HTMLSelectElement = <HTMLSelectElement>document.getElementById('workDivisionSelect');
            const idx = KinmuClass.get(start);
            workDivision.selectedIndex = typeof idx === "number" ? idx : 6;

            // 作番
            let costNoItem: HTMLSelectElement = <HTMLSelectElement>document.getElementsByName('costManagement[0].inputSelect')[0];
            costNoItem.selectedIndex = 1;

            // 作業コード
            let costDetailCode: HTMLInputElement = <HTMLInputElement>document.getElementsByName('costManagement[0].inputCode')[0]
            costDetailCode.value = '0001';

            // 作業時間
            let costQuantity: HTMLInputElement = <HTMLInputElement>document.getElementsByName('costManagement[0].inputValue')[0]
            costQuantity.value = workTime.calcWorkTime();
            totalQuantity.value = workTime.calcWorkTime();

            // 回数項目
            let allowanceItem: HTMLSelectElement = <HTMLSelectElement>document.getElementsByName('allowanceItemManagement[0].inputSelect')[0]
            // 回数
            let allowanceItemValue: HTMLInputElement = <HTMLInputElement>document.getElementsByName('allowanceItemManagement[0].inputValue')[0]
            if (!telework) {
                allowanceItem.selectedIndex = 0;
                allowanceItemValue.value = '';
            } else {
                allowanceItem.selectedIndex = 1; // テレワーク
                allowanceItemValue.value = '1';
            }
        }
    }
};

function clearCostManagement(): void {
    for (let i = 0; i <= 9; i++) {
        // 作番
        let sakuban: HTMLSelectElement = <HTMLSelectElement>document.getElementsByName('costManagement[' + i + '].inputSelect')[0];
        sakuban.selectedIndex = 0;
        // 作業コード
        let code: HTMLInputElement = <HTMLInputElement>document.getElementsByName('costManagement[' + i + '].inputCode')[0];
        code.value = '';
        // 作業時間
        let time: HTMLInputElement = <HTMLInputElement>document.getElementsByName('costManagement[' + i + '].inputValue')[0];
        time.value = '';
    }
}

class WorkTime {
    private _start: Date
    private _end: Date
    private _workTime: number
    constructor(start: string, end: string) {
        let s = start.match(/.{2}/g);
        let e = end.match(/.{2}/g);
        if (s == null || e == null) {
            this._start = new Date()
            this._end = new Date()
            this._workTime = 0
            return
        }
        this._start = new Date(1970, 1, 1, Number(s[0]), Number(s[1]), 0)
        this._end = new Date(1970, 1, 1, Number(e[0]), Number(e[1]), 0)

        this._end.setHours(this._end.getHours() - 1); // 昼休憩（1時間）をマイナス
        this._workTime = (this._end.getTime() - this._start.getTime()) / (1000 * 60 * 60)
        this._end.setHours(this._end.getHours() + 1); // 時刻の戻し
    }

    public calcWorkTime(): string {
        this._end.setHours(this._end.getHours() - 1); // 昼休憩（1時間）をマイナス
        let diffHour = (this._end.getTime() - this._start.getTime()) / (1000 * 60 * 60)
        this._end.setHours(this._end.getHours() + 1); // 時刻の戻し
        let diffMinute = (diffHour - Math.floor(diffHour)) * 60;
        return zeroPadding(Math.floor(diffHour).toString()) + zeroPadding(diffMinute.toString())
    }

    public calcEndTime(): string {
        let hour: number = this._end.getHours();
        let min: number = this._end.getMinutes();
        if (this._workTime > 7.5) {
            this._end.setMinutes(this._end.getMinutes() + 30); // 定時後の休憩分（30分）を加算
            hour = this._end.getHours();
            min = this._end.getMinutes();
            this._end.setMinutes(this._end.getMinutes() - 30); // 時刻の戻し
        }
        return zeroPadding(hour.toString()) + zeroPadding(min.toString())
    }
}

function zeroPadding(num: string) {
    return ('00' + num).slice(-2);
}

const KinmuClass = new Map<string, Number>()
KinmuClass.set("0800", 16)
KinmuClass.set("0830", 18)
KinmuClass.set("0845", 22)
KinmuClass.set("0900", 6)
KinmuClass.set("0915", 26)
KinmuClass.set("0930", 28)
KinmuClass.set("1000", 30)
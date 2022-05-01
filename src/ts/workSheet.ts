export class WorkSheet {
    private rows: Row[] = new Array();

    constructor() {
        const kinmudatalist: Element = document.getElementsByClassName('kinmudatalist')[0];
        const table: HTMLTableElement = kinmudatalist.getElementsByTagName("table")[0];

        let kinmuIndex: number = 0;
        let kyukaIndex: number = 0;
        let startIndex: number = 0;
        let lateIndex: number = 0;
        let earlyIndex: number = 0;
        let noteIndex: number = 0;

        for (let i = 0; i < table.rows[0].cells.length; i++) {
            let cell = WorkSheet.getCellValue(table.rows[0].cells[i]);
            switch (cell) {
                case '勤務':
                    kinmuIndex = i;
                    break;
                case '休暇':
                    kyukaIndex = i;
                    break;
                case '始業':
                    startIndex = i;
                    break;
                case '遅刻':
                    lateIndex = i;
                    break;
                case '早退':
                    earlyIndex = i;
                    break;
                case '備考':
                    noteIndex = i;
                    break;
            }
        }

        for (let i = 3; i < table.rows.length; i++) {
            const kinmu = table.rows[i].cells[kinmuIndex];
            const kyuka = table.rows[i].cells[kyukaIndex];
            const start = table.rows[i].cells[startIndex];
            const late = table.rows[i].cells[lateIndex];
            const early = table.rows[i].cells[earlyIndex];
            const note = table.rows[i].cells[noteIndex];

            this.rows.push(new Row(kinmu, kyuka, start, late, early, note));
        }
    }

    public check(): void {
        this.rows.forEach(row => {
            const kinmu: string = WorkSheet.getCellValue(row.kinmu);
            const kyuka: string = WorkSheet.getCellValue(row.kyuka);
            const start: string = WorkSheet.getCellValue(row.start).replace(":", "");
            const late: string = WorkSheet.getCellValue(row.late);
            const early: string = WorkSheet.getCellValue(row.early);
            const note: string = WorkSheet.getCellValue(row.note);

            //  休暇取得時の時
            if (kyuka.indexOf("休暇") != -1) {
                // 勤務区分が「通常勤務」ではない場合は警告.
                if (kinmu.indexOf("通常勤務") == -1) {
                    WorkSheet.alert(row.kinmu, row.kyuka)
                }
                // 備考欄に記載がない場合は警告.
                if (!note) {
                    WorkSheet.alert(row.note)
                }
            }

            // 午前休を取得した時
            if (kinmu.indexOf("午前休") != -1 || kyuka.indexOf("有休（午前）") != -1) {
                // 勤務区分、休暇区分ともに午前休でなければ警告.
                if (!(kinmu.indexOf("午前休") != -1 && kyuka.indexOf("有休（午前）") != -1)) {
                    WorkSheet.alert(row.kinmu, row.kyuka)
                }
                // 午前休みの時間が間違っている場合警告.
                if (!WorkSheet.checkMorningOff(kinmu, start)) {
                    WorkSheet.alert(row.kinmu, row.start)
                }
                // 備考欄に記載がない場合は警告.
                if (!note) {
                    WorkSheet.alert(row.note)
                }
            }

            if (start) {
                // 始業時間と勤務区分が一致しない場合は警告（勤務区分が「午前休」の場合は除く）.
                if (kinmu.indexOf(start) == -1 && kinmu.indexOf("午前休") == -1) {
                    WorkSheet.alert(row.kinmu, row.start)
                }
            }

            // 遅刻がついている場合は警告.
            if (late) {
                WorkSheet.alert(row.late)
            }

            // 早退がついている場合は警告.
            if (early) {
                WorkSheet.alert(row.early)
            }
        });
    }

    static getCellValue(cell: HTMLTableCellElement): string {
        return cell.getElementsByTagName("span")[0].innerHTML.replace("<br>", "").trim()
    }

    static alert(...cells: HTMLTableCellElement[]): void {
        cells.forEach(cell => {
            cell.style.backgroundColor = "red";
        })
    }

    static checkMorningOff(kinmu: string, start: string): Boolean {
        const pattern: RegExp = /\d{4}/g;
        let kinmuTime: RegExpMatchArray | null = kinmu.match(pattern)
        if (!kinmuTime) {
            return false;
        }
        let kinmuStartTime = new Date(1970, 1, 1, Number(kinmuTime[0].slice(0, 2)), Number(kinmuTime[0].slice(2, 4)), 0)
        let startTime = new Date(1970, 1, 1, Number(start.slice(0, 2)), Number(start.slice(2, 4)), 0)
        let diffHour = (startTime.getTime() - kinmuStartTime.getTime()) / (1000 * 60 * 60)

        return diffHour === 4;
    }
}

class Row {
    private _kinmu: HTMLTableCellElement;
    private _kyuka: HTMLTableCellElement;
    private _start: HTMLTableCellElement;
    private _late: HTMLTableCellElement;
    private _early: HTMLTableCellElement;
    private _note: HTMLTableCellElement;

    get kinmu() {
        return this._kinmu;
    }
    get kyuka() {
        return this._kyuka;
    }
    get start() {
        return this._start;
    }
    get late() {
        return this._late;
    }
    get early() {
        return this._early;
    }
    get note() {
        return this._note;
    }
    constructor(
        kinmu: HTMLTableCellElement,
        kyuka: HTMLTableCellElement,
        start: HTMLTableCellElement,
        late: HTMLTableCellElement,
        early: HTMLTableCellElement,
        note: HTMLTableCellElement) {
        this._kinmu = kinmu;
        this._kyuka = kyuka;
        this._start = start;
        this._late = late;
        this._early = early;
        this._note = note;
    }
}
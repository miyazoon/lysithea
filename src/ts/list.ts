export class List {
    private rows: Row[] = new Array();

    constructor(isAdmin: boolean) {
        const kinmudatalist: Element = document.getElementsByClassName('kinmudatalist')[0]
        const table: HTMLTableElement = kinmudatalist.getElementsByTagName("table")[0]
        const fitIndex: number = isAdmin ? 2 : 0;
        for (let i = 3; i < table.rows.length; i++) {
            const kinmu = table.rows[i].cells[2 + fitIndex];
            const kyuka = table.rows[i].cells[3 + fitIndex];
            const start = table.rows[i].cells[4 + fitIndex];
            this.rows.push(new Row(kinmu, kyuka, start));
        }
    }

    public check(): void {
        this.rows.forEach(row => {
            const kinmu: string = List.getCellValue(row.kinmu);
            const kyuka: string = List.getCellValue(row.kyuka);
            const start: string = List.getCellValue(row.start).replace(":", "");

            //  休暇取得時の時
            if (kyuka.indexOf("休暇") != -1) {
                // 勤務区分が「通常勤務」ではない場合は警告.
                if (kinmu.indexOf("通常勤務") == -1) {
                    List.alert(row.kinmu,row.kyuka)
                }
            }

            // 午前休を取得した時
            if (kinmu.indexOf("午前休") != -1 || kyuka.indexOf("有休（午前）") != -1) {
                // 勤務区分、休暇区分ともに午前休でなければ警告.
                if (!(kinmu.indexOf("午前休") != -1 && kyuka.indexOf("有休（午前）") != -1)) {
                    List.alert(row.kinmu,row.kyuka)
                }
            }

            if (start) {
                // 始業時間と勤務区分が一致しない場合は警告（勤務区分が「午前休」の場合は除く）.
                if (kinmu.indexOf(start) == -1 && kinmu.indexOf("午前休") == -1) {
                    List.alert(row.kinmu,row.start)
                }
            }
        });
    }

    static getCellValue(cell: HTMLTableCellElement): string {
        return cell.getElementsByTagName("span")[0].innerHTML.replace("<br>", "").trim()
    }

    static alert(...cells: HTMLTableCellElement[]): void {
        cells.forEach(cell =>{
            cell.style.backgroundColor = "red";
        })
    }
}

class Row {
    private _kinmu: HTMLTableCellElement;
    private _kyuka: HTMLTableCellElement;
    private _start: HTMLTableCellElement;

    get kinmu() {
        return this._kinmu;
    }
    get kyuka() {
        return this._kyuka;
    }
    get start() {
        return this._start;
    }

    constructor(kinmu: HTMLTableCellElement, kyuka: HTMLTableCellElement, start: HTMLTableCellElement) {
        this._kinmu = kinmu;
        this._kyuka = kyuka;
        this._start = start;
    }
}
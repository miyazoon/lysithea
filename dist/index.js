/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ts/checker.ts":
/*!***************************!*\
  !*** ./src/ts/checker.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Checker\": () => (/* binding */ Checker)\n/* harmony export */ });\nclass Checker {\n    constructor() {\n        this._div = document.createElement(\"div\");\n        const textarea = document.createElement(\"textarea\");\n        textarea.id = \"textarea\";\n        textarea.rows = 30;\n        textarea.cols = 60;\n        this._div.appendChild(textarea);\n        const button = document.createElement(\"button\");\n        button.innerText = \"勤怠チェック\";\n        button.onclick = function () {\n            let kinmudatalist = document.getElementsByClassName('kinmudatalist')[0];\n            let table = kinmudatalist.getElementsByTagName(\"table\")[0];\n            let textarea = document.getElementById(\"textarea\");\n            const excels = textarea.value.split(/\\n/);\n            [...excels].forEach(function (excel) {\n                let val = excel.split('\\t');\n                let date = val[0].trim();\n                let time = val[1].trim();\n                if (!time) {\n                    return;\n                }\n                for (let i = 1, rowLen = table.rows.length; i < rowLen; i++) {\n                    if (table.rows[i].cells[2].getElementsByTagName(\"span\")[0].innerHTML.replace(\"<br>\", \"\").trim() !== '大日本印刷/ハイブリッド総合書店システム') {\n                        continue;\n                    }\n                    if (table.rows[i].cells[0].getElementsByTagName(\"span\")[0].innerHTML.replace(\"<br>\", \"\").trim() === date) {\n                        if (table.rows[i].cells[5].getElementsByTagName(\"span\")[0].innerHTML.replace(\"<br>\", \"\").trim() !== Checker.changeTimeFormat(time)) {\n                            table.rows[i].cells[5].style.backgroundColor = \"red\";\n                        }\n                        else {\n                            table.rows[i].cells[5].style.backgroundColor = \"blue\";\n                        }\n                    }\n                }\n            });\n        };\n        this._div.appendChild(button);\n    }\n    get div() {\n        return this._div;\n    }\n    static changeTimeFormat(val) {\n        let v = val.split('.');\n        let h = v[0];\n        let m = v[1] === \"00\" ? v[1] : String(Number(v[1]) * 0.6);\n        return h + \":\" + m;\n    }\n}\n\n\n//# sourceURL=webpack://lysithea/./src/ts/checker.ts?");

/***/ }),

/***/ "./src/ts/input.ts":
/*!*************************!*\
  !*** ./src/ts/input.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Input\": () => (/* binding */ Input)\n/* harmony export */ });\nclass Input {\n    constructor() {\n        this._div = document.createElement(\"div\");\n        this._div2 = document.createElement(\"div\");\n        this._div3 = document.createElement(\"div\");\n        this._div4 = document.createElement(\"div\");\n        this._start = document.createElement(\"select\");\n        this._end = document.createElement(\"select\");\n        this._telework = document.createElement(\"input\");\n        this._button = document.createElement(\"button\");\n        this.setStartElement();\n        this.setEndElement();\n        this.setTelework();\n        this.setButton();\n        this._div.className = \"container\";\n        this._div2.className = \"fb fb-lr\";\n        this._div3.className = \"fb fb-column\";\n        this._div4.className = \"fi\";\n        this._div4.id = \"workTime\";\n        this._div4.appendChild(this._start);\n        this._div4.appendChild(this._end);\n        this._div4.appendChild(this._telework);\n        this._div4.appendChild(this._button);\n        this._div2.appendChild(this._div3);\n        this._div2.appendChild(this._div4);\n        this._div.appendChild(this._div2);\n    }\n    get div() {\n        return this._div;\n    }\n    setStartElement() {\n        this._start.name = \"_start\";\n        this._start.add(new Option(\"09:30\", \"0930\", true));\n        this._start.add(new Option(\"08:00\", \"0800\"));\n        this._start.add(new Option(\"08:30\", \"0830\"));\n        this._start.add(new Option(\"08:45\", \"0845\"));\n        this._start.add(new Option(\"09:00\", \"0900\"));\n        this._start.add(new Option(\"09:15\", \"0915\"));\n        this._start.add(new Option(\"09:30\", \"0930\"));\n        this._start.add(new Option(\"10:00\", \"1000\"));\n        this._start.style.marginLeft = \"10px\";\n    }\n    setEndElement() {\n        this._end.name = \"_end\";\n        this._end.add((new Option(\"19:00\", \"1900\", true)));\n        this._end.add((new Option(\"17:00\", \"1700\")));\n        this._end.add((new Option(\"17:15\", \"1715\")));\n        this._end.add((new Option(\"17:30\", \"1730\")));\n        this._end.add((new Option(\"17:45\", \"1745\")));\n        this._end.add((new Option(\"18:00\", \"1800\")));\n        this._end.add((new Option(\"18:15\", \"1815\")));\n        this._end.add((new Option(\"18:30\", \"1830\")));\n        this._end.add((new Option(\"18:45\", \"1845\")));\n        this._end.add((new Option(\"19:00\", \"1900\")));\n        this._end.add((new Option(\"19:15\", \"1915\")));\n        this._end.add((new Option(\"19:30\", \"1930\")));\n        this._end.add((new Option(\"19:45\", \"1945\")));\n        this._end.add((new Option(\"20:00\", \"2000\")));\n        this._end.add((new Option(\"20:15\", \"2015\")));\n        this._end.add((new Option(\"20:30\", \"2030\")));\n        this._end.add((new Option(\"20:45\", \"2045\")));\n        this._end.add((new Option(\"21:00\", \"2100\")));\n        this._end.add((new Option(\"21:15\", \"2115\")));\n        this._end.add((new Option(\"21:30\", \"2130\")));\n        this._end.add((new Option(\"21:45\", \"2145\")));\n        this._end.style.marginLeft = \"10px\";\n    }\n    setTelework() {\n        this._telework.name = \"_telework\";\n        this._telework.setAttribute(\"type\", \"checkbox\");\n        this._telework.setAttribute(\"checked\", \"checked\");\n        this._telework.style.marginLeft = \"10px\";\n        this._telework.style.display = \"inline-block\";\n        this._telework.style.verticalAlign = \"middle\";\n    }\n    setButton() {\n        this._button.innerText = \"勤怠入力\";\n        this._button.onclick = onClick;\n        this._button.style.marginLeft = \"10px\";\n    }\n}\n;\nfunction onClick(event) {\n    const start = document.getElementsByName(\"_start\")[0].value;\n    const end = document.getElementsByName(\"_end\")[0].value;\n    const telework = document.getElementsByName(\"_telework\")[0].checked;\n    clearSelectedIndex(document.getElementsByName('CostNoItem'));\n    clearValue(document.getElementsByName('CostDetailCode'));\n    clearValue(document.getElementsByName('CostQuantity'));\n    const workTime = new WorkTime(start, end);\n    let totalQuantity = document.getElementById('TotalQuantity');\n    totalQuantity.value = '';\n    let startTime = document.getElementsByName('StartTime')[0];\n    startTime.value = start;\n    let endTime = document.getElementsByName('EndTime')[0];\n    endTime.value = workTime.calcEndTime();\n    let workDivision = document.getElementsByName('WorkDivision')[0];\n    const idx = KinmuClass.get(start);\n    workDivision.selectedIndex = typeof idx === \"number\" ? idx : 6;\n    let costNoItem = document.getElementsByName('CostNoItem')[0];\n    costNoItem.selectedIndex = 1;\n    let costDetailCode = document.getElementsByName('CostDetailCode')[0];\n    costDetailCode.value = '0001';\n    let costQuantity = document.getElementsByName('CostQuantity')[0];\n    costQuantity.value = workTime.calcWorkTime();\n    totalQuantity.value = workTime.calcWorkTime();\n    let allowanceItem = document.getElementsByName('AllowanceItem')[0];\n    let allowanceItemValue = document.getElementsByName('AllowanceItemValue')[0];\n    if (!telework) {\n        allowanceItem.selectedIndex = 0;\n        allowanceItemValue.value = '';\n    }\n    else {\n        allowanceItem.selectedIndex = 1;\n        allowanceItemValue.value = '1';\n    }\n}\n;\nfunction clearSelectedIndex(doms) {\n    [...doms].forEach(function (dom) {\n        let d = dom;\n        d.selectedIndex = 0;\n    });\n}\n;\nfunction clearValue(doms) {\n    [...doms].forEach(function (dom) {\n        let d = dom;\n        d.value = '';\n    });\n}\n;\nclass WorkTime {\n    constructor(start, end) {\n        let s = start.match(/.{2}/g);\n        let e = end.match(/.{2}/g);\n        if (s == null || e == null) {\n            this._start = new Date();\n            this._end = new Date();\n            this._workTime = 0;\n            return;\n        }\n        this._start = new Date(1970, 1, 1, Number(s[0]), Number(s[1]), 0);\n        this._end = new Date(1970, 1, 1, Number(e[0]), Number(e[1]), 0);\n        this._end.setHours(this._end.getHours() - 1);\n        this._workTime = (this._end.getTime() - this._start.getTime()) / (1000 * 60 * 60);\n        this._end.setHours(this._end.getHours() + 1);\n    }\n    calcWorkTime() {\n        this._end.setHours(this._end.getHours() - 1);\n        let diffHour = (this._end.getTime() - this._start.getTime()) / (1000 * 60 * 60);\n        this._end.setHours(this._end.getHours() + 1);\n        let diffMinute = (diffHour - Math.floor(diffHour)) * 60;\n        return zeroPadding(Math.floor(diffHour).toString()) + zeroPadding(diffMinute.toString());\n    }\n    calcEndTime() {\n        let hour = this._end.getHours();\n        let min = this._end.getMinutes();\n        if (this._workTime > 7.5) {\n            this._end.setMinutes(this._end.getMinutes() + 30);\n            hour = this._end.getHours();\n            min = this._end.getMinutes();\n            this._end.setMinutes(this._end.getMinutes() - 30);\n        }\n        return zeroPadding(hour.toString()) + zeroPadding(min.toString());\n    }\n}\nfunction zeroPadding(num) {\n    return ('00' + num).slice(-2);\n}\nconst KinmuClass = new Map();\nKinmuClass.set(\"0800\", 16);\nKinmuClass.set(\"0830\", 18);\nKinmuClass.set(\"0845\", 22);\nKinmuClass.set(\"0900\", 6);\nKinmuClass.set(\"0915\", 26);\nKinmuClass.set(\"0930\", 28);\nKinmuClass.set(\"1000\", 30);\n\n\n//# sourceURL=webpack://lysithea/./src/ts/input.ts?");

/***/ }),

/***/ "./src/ts/list.ts":
/*!************************!*\
  !*** ./src/ts/list.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"List\": () => (/* binding */ List)\n/* harmony export */ });\nclass List {\n    constructor(isAdmin) {\n        this.rows = new Array();\n        const kinmudatalist = document.getElementsByClassName('kinmudatalist')[0];\n        const table = kinmudatalist.getElementsByTagName(\"table\")[0];\n        const fitIndex = isAdmin ? 2 : 0;\n        for (let i = 3; i < table.rows.length; i++) {\n            const kinmu = table.rows[i].cells[2 + fitIndex];\n            const kyuka = table.rows[i].cells[3 + fitIndex];\n            const start = table.rows[i].cells[4 + fitIndex];\n            const late = table.rows[i].cells[12 + fitIndex];\n            const early = table.rows[i].cells[13 + fitIndex];\n            this.rows.push(new Row(kinmu, kyuka, start, late, early));\n        }\n    }\n    check() {\n        this.rows.forEach(row => {\n            const kinmu = List.getCellValue(row.kinmu);\n            const kyuka = List.getCellValue(row.kyuka);\n            const start = List.getCellValue(row.start).replace(\":\", \"\");\n            const late = List.getCellValue(row.late);\n            const early = List.getCellValue(row.early);\n            if (kyuka.indexOf(\"休暇\") != -1) {\n                if (kinmu.indexOf(\"通常勤務\") == -1) {\n                    List.alert(row.kinmu, row.kyuka);\n                }\n            }\n            if (kinmu.indexOf(\"午前休\") != -1 || kyuka.indexOf(\"有休（午前）\") != -1) {\n                if (!(kinmu.indexOf(\"午前休\") != -1 && kyuka.indexOf(\"有休（午前）\") != -1)) {\n                    List.alert(row.kinmu, row.kyuka);\n                }\n            }\n            if (start) {\n                if (kinmu.indexOf(start) == -1 && kinmu.indexOf(\"午前休\") == -1) {\n                    List.alert(row.kinmu, row.start);\n                }\n            }\n            if (late) {\n                List.alert(row.late);\n            }\n            if (early) {\n                List.alert(row.early);\n            }\n        });\n    }\n    static getCellValue(cell) {\n        return cell.getElementsByTagName(\"span\")[0].innerHTML.replace(\"<br>\", \"\").trim();\n    }\n    static alert(...cells) {\n        cells.forEach(cell => {\n            cell.style.backgroundColor = \"red\";\n        });\n    }\n}\nclass Row {\n    constructor(kinmu, kyuka, start, late, early) {\n        this._kinmu = kinmu;\n        this._kyuka = kyuka;\n        this._start = start;\n        this._late = late;\n        this._early = early;\n    }\n    get kinmu() {\n        return this._kinmu;\n    }\n    get kyuka() {\n        return this._kyuka;\n    }\n    get start() {\n        return this._start;\n    }\n    get late() {\n        return this._late;\n    }\n    get early() {\n        return this._early;\n    }\n}\n\n\n//# sourceURL=webpack://lysithea/./src/ts/list.ts?");

/***/ }),

/***/ "./src/ts/main.ts":
/*!************************!*\
  !*** ./src/ts/main.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _checker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./checker */ \"./src/ts/checker.ts\");\n/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./input */ \"./src/ts/input.ts\");\n/* harmony import */ var _list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./list */ \"./src/ts/list.ts\");\n\n\n\nif (window.location.hostname === 'job.cloud.lysithea.jp') {\n    const page = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);\n    switch (page) {\n        case 'WC020':\n            const input = new _input__WEBPACK_IMPORTED_MODULE_1__.Input();\n            document.getElementsByClassName('funcNav')[0].appendChild(input.div);\n            break;\n        case 'WJ050':\n            let titleElement = document.getElementById(\"funcBar-title\");\n            let title;\n            if (titleElement) {\n                title = titleElement.textContent;\n            }\n            else {\n                title = \"\";\n            }\n            let list;\n            if (title === \"社員別勤休内容承認\") {\n                list = new _list__WEBPACK_IMPORTED_MODULE_2__.List(true);\n            }\n            else {\n                list = new _list__WEBPACK_IMPORTED_MODULE_2__.List(false);\n            }\n            list.check();\n            break;\n        case 'WJ020':\n        case 'WJ060':\n            const buttton = document.getElementsByClassName('btn btn-big')[0];\n            buttton.disabled = true;\n            break;\n        case \"WJ050\":\n            const adminlist = new _list__WEBPACK_IMPORTED_MODULE_2__.List(true);\n            adminlist.check();\n            break;\n        case 'WC200':\n            const checker = new _checker__WEBPACK_IMPORTED_MODULE_0__.Checker();\n            const gBody = document.getElementById(\"gBody\");\n            if (gBody != null) {\n                gBody.appendChild(checker.div);\n            }\n        default:\n            break;\n    }\n}\n\n\n//# sourceURL=webpack://lysithea/./src/ts/main.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/ts/main.ts");
/******/ 	
/******/ })()
;
// 工具集合汇总(包含所有自定义工具, 第三方工具)

// 时间控件
import day from 'dayjs'

// js工具
import lodash from "lodash";

// 地址
import { city } from "@/utils/address";
import { country } from "@/utils/country";
import { logsName } from "@/utils/logsName";

// 工具
import utils from "@/utils/utils.js";

// storage
import storage from "@/api/storage.js";

// cookies
import cook from "@/utils/cookies.js";

// 省市区
// city.forEach(item => {
// 	item.children = [];
// 	item.city.forEach(it => {
// 		it.children = [];
// 		it.children.length = it.area.length;
// 	});
// });

// city.forEach(item => {
// 	item.label = item.value = item.name;
// 	item.city.forEach(it => {
// 		it.label = it.value = it.name;
// 		item.children = item.city;
// 		it.area.forEach(iit => {
// 			it.children.push({ value: iit, label: iit });
// 		});
// 	});
// });

// //省市
// let provinces = JSON.parse(JSON.stringify(city));
// provinces.forEach(item => {
// 	item.children.forEach(it => {
// 		delete it.children;
// 	});
// });

class Tool {
	constructor() {
		this.logsName = logsName;
		this.cook = cook;
		this.utils = utils;
	}

	icons: [
		"source | undo redo | bold italic underline strikethrough fontborder emphasis | ",
		"paragraph  fontsize |",
		"forecolor backcolor | removeformat | insertorderedlist insertunorderedlist | selectall | ",
		"cleardoc  | indent outdent | justifyleft justifycenter justifyright | touppercase tolowercase | ",
		"horizontal date time  | image emotion spechars | inserttable |"
	]
}

export default new Tool();

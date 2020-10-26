// 自定义工具方法

import CryptoJS from "crypto-js"

class util {
	constructor() {}

		/**
	 * 加密（需要先加载lib/aes/aes.min.js文件）
	 * @param word
	 * @returns {*}
	 */

	encrypt(word) {
		var key = CryptoJS.enc.Utf8.parse("acdwessdbatar123")
		var srcs = CryptoJS.enc.Utf8.parse(word)
		var encrypted = CryptoJS.AES.encrypt(srcs, key, {
			mode: CryptoJS.mode.ECB,
			padding: CryptoJS.pad.Pkcs7
		})
		return encrypted.toString()
	}

	/**
	 * 解密
	 * @param word
	 * @returns {*}
	 */
	decrypt(word) {
		var key = CryptoJS.enc.Utf8.parse("acdwessdbatar123")
		var decrypt = CryptoJS.AES.decrypt(word, key, {
			mode: CryptoJS.mode.ECB,
			padding: CryptoJS.pad.Pkcs7
		})
		return CryptoJS.enc.Utf8.stringify(decrypt).toString()
	}

	//判断是否是微信浏览器的函数
	isWeiXin() {
		//window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
		var ua = window.navigator.userAgent.toLowerCase()
		//通过正则表达式匹配ua中是否含有MicroMessenger字符串
		if (ua.match(/MicroMessenger/i) == "micromessenger") {
			return true
		} else {
			return false
		}
	}


	parseUrlParams(search) {
		if (search.length <= 0) return false;
		var info = search.slice(1);
		var result = {};
		info.split("&").forEach(item => {
			result[decodeURIComponent(item.split("=")[0])] = decodeURIComponent(
				item.split("=")[1]
			);
		});
		return result;
	}

	formatTime(date) {
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		const hour = date.getHours();
		const minute = date.getMinutes();
		const second = date.getSeconds();
		return (
			[year, month, day].map(formatNumber).join("/") +
			" " +
			[hour, minute, second].map(formatNumber).join(":")
		);
	}

	formatNumber(n) {
		n = n.toString();
		return n[1] ? n : "0" + n;
	}

	// 对象数组去重
	unique(arr) {
		let unique = {};
		arr.forEach(item => {
			unique[JSON.stringify(item)] = item;
		});
		arr = Object.keys(unique).map(function(u) {
			return JSON.parse(u);
		});
		return arr;
	}

	// 对象数组去重 根据name
	repetName(arr) {
		let unique = {};
		var hash = {};
		return arr.reduce((item, next) => {
			hash[next.name] ? "" : (hash[next.name] = true && item.push(next));
			return item;
		}, []);
	}

	removeRepeat(arr, key, key1, key2) {
		arr.sort((a, b) => {
			return b.score - a.score;
		});
		let key1Jude = true;
		let key2Jude = true;
		for (let i = 0; i < arr.length; i++) {
			for (let j = i + 1; j < arr.length; j++) {
				key1Jude = key1 ? arr[i][key1] === arr[j][key1] : true;
				key2Jude = key1 ? arr[i][key2] === arr[j][key2] : true;
				if (arr[i][key] === arr[j][key] && key1Jude && key2Jude) {
					arr.splice(j, 1);
					j = j - 1; // 关键，因为splice()删除元素之后，会使得数组长度减小，此时如果没有j=j-1的话，会导致相同id项在重复两次以上之后无法进行去重，且会错误删除id没有重复的项。
				}
			}
		}
		return arr;
	}

	min(arr) {
		let min = arr[0];
		let len = arr.length;
		for (let i = 1; i < len; i++) {
			if (arr[i] < min) {
				min = i;
			}
		}
		return min;
	}

	max(arr) {
		let max = arr[0];
		let len = arr.length;
		for (let i = 1; i < len; i++) {
			if (arr[i] > max) {
				max = i;
			}
		}
		return max;
	}

	// 数组对象排序
	compareArr(property) {
		return (obj1, obj2) => {
			var value1 = obj1[property];
			var value2 = obj2[property];
			return value2 - value1;
		};
	}

	// map转换对象
	strMapToObj(strMap) {
		let obj = Object.create(null);
		for (let [k, v] of strMap) {
			obj[k] = v;
		}
		return obj;
	}

	// 对象转换map
	objToStrMap(obj) {
		let strMap = new Map();
		for (let k of Object.keys(obj)) {
			strMap.set(k, obj[k]);
		}
		return strMap;
	}

	china(str) {
		if (/.*[\u4e00-\u9fa5]+.*/.test(str)) {
			return true;
		} else {
			return false;
		}
	}

	// arr2 属于 arr1
	compare(arr1, arr2) {
		let result = true;
		for (let i = arr2.length - 1; i >= 0; i--) {
			let index = arr1.indexOf(arr2[i]);
			if (index === -1) {
				result = false;
				break;
			}
		}
		return result;
	}

	// 模糊搜索
	slurSear(list, keyWord) {
		var len = list.length;
		var arr = [];
		for (var i = 0; i < len; i++) {
			//如果字符串中不包含目标字符会返回-1
			if (list[i].indexOf(keyWord) >= 0) {
				arr.push(list[i]);
			}
		}
		return arr;
	}

	// 失败弹窗
	Modalerror(title) {
		Modal.error({
			iconType: "",
			title: `抱歉! ${title}`,
			okText: `确定`
			// content: 'some messages...some messages...',
		});
	}

	// 替换文本
	regToHTML(options, reg, $img) {
		let imgArr = [];
		if (!options.match(reg)) {
			return options;
		}
		imgArr = options.match(reg);
		imgArr.forEach(item => {
			options = options.replace(
				item,
				`<img width="50" height="50" src='${$img}${item.slice(
					5,
					-6
				)}'> </img>`
			);
		});
		return options;
	}

	//去掉json数据空值的key
	deleteEmptykey(object) {
        for (var i in object) {
            var value = object[i]
            if (typeof value === 'object') {
                if (Array.isArray(value)) {
                    if (value.length == 0) {
                        delete object[i]
                        continue
                    }
                }
                this.deleteEmptykey(value)
                if (this.isEmptyJson(value)) {
                    delete object[i]
                }
            } else {
                if (value === '' || value === null || value === undefined) {
                    delete object[i]
                }
            }
        }
        return object
    }
}

export default new util();

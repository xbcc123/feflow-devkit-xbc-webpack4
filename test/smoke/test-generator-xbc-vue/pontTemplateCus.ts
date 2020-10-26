import { CodeGenerator, Interface } from "pont-engine"

class Utils {
	// 获取multipart/form-data params中的参数
	getFormDataParams(parameters) {
		let paramsStr: String = ""
		parameters.forEach(item => {
			console.log(item)
			let attrCode = ``
			let name = item.name
			let required = `?:`
			let type = `${item.dataType.typeName};\n`
			if (item.required === true) {
				required = `:`
			}
			if (item.in === "formData") {
				type = `FormData;\n`
			}
			attrCode = `${name}${required}${type} `
			paramsStr += attrCode
		})
		return `class Params {\n \n ${paramsStr}}\n `
	}

	// 获取formdata中的数据
}

const utils = new Utils()

export default class MyGenerator extends CodeGenerator {
	getInterfaceContentInDeclaration(inter: Interface) {
		const requestParams = inter.getRequestParams()
		let paramsCode = inter.getParamsCode("Params")
		const method = inter.method.toUpperCase()
		let firstConsumes = inter.consumes ? inter.consumes[0] : ""
		if (method === "POST" && firstConsumes === "multipart/form-data") {
			paramsCode = utils.getFormDataParams(inter.parameters)
		}

		return `
      export ${paramsCode}

      export type Response = ${inter.responseType}

      export const init: Response;

      export function request(${requestParams}): Promise<Response>;
    `
	}

	// 生成接口文件
	getInterfaceContent(inter: Interface) {
		const paramsCode = inter.getParamsCode()
		const bodyParamsCode = inter.getBodyParamsCode()
		const method = inter.method.toUpperCase()
		let requestParams = bodyParamsCode ? `bodyParams = {}` : `params = {}`
		let firstConsumes = inter.consumes ? inter.consumes[0] : ""
		let httpMethod = "get"
		if (method === "GET") {
			httpMethod = "get"
		}
		if (method === "POST" && !bodyParamsCode) {
			httpMethod = "post"
		}
		if (method === "POST" && bodyParamsCode) {
			httpMethod = "postJson"
		}
		if (method === "POST" && firstConsumes === "multipart/form-data") {
			httpMethod = "upload"
		}
		return `
      /**
      * @description ${inter.description}
      */

     import http from '@/api/http.tsx';

     export function request(params) {
       return http.${httpMethod}("${inter.path}", params);
     }

   `
	}
}

/**

 * @description 文件上传

 */

import http from "@/api/http.tsx"

export function request(params) {
	return http.upload("/uploadFile", params)
}

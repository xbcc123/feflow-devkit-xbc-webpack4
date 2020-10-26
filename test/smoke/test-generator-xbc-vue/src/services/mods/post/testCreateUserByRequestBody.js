/**

 * @description 接收JSON参数并创建用户

 */

import http from "@/api/http.tsx"

export function request(params) {
	return http.postJson("/createUserByJson", params)
}

/**

 * @description 接收formData参数并创建用户

 */

import http from "@/api/http.tsx"

export function request(params) {
	return http.post("/createUserByFormData", params)
}

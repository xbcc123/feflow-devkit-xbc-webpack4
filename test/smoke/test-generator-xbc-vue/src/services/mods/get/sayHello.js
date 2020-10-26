/**

      * @description 示例接口

传入名称即可

      */

import http from "@/api/http.tsx"

export function request(params) {
	return http.get("/sayHello", params)
}

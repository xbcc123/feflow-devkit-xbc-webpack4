type ObjectMap<Key extends string | number | symbol = any, Value = any> = {
	[key in Key]: Value
}

declare namespace defs {
	export class Box<T0 = any> {
		/** t */

		t?: number

		/** user */

		user?: defs.User
	}

	export class FrontResponse {
		/** code */

		code?: number

		/** data */

		data?: object

		/** directUrl */

		directUrl?: string

		/** msg */

		msg?: string
	}

	export class User {
		/** 联系电话 */

		concat: string

		/** gender */

		gender?: string

		/** getPlatformList */

		getPlatformList?: Array<string>

		/** map */

		map?: ObjectMap<any, string>

		/** 联系电话 */

		password: string

		/** platformList */

		platformList?: Array<string>

		/** 姓名 */

		username: string
	}
}

declare namespace API {
	/**

	 * GET请求范例

	 */

	export namespace get {
		/**

        * 示例接口

传入名称即可

        * /generics

        */

		export namespace generics {
			export class Params {
				/** 姓名 */

				name: string

				/** names */

				names?: string
			}

			export type Response = string

			export const init: Response

			export function request(
				params: Params,
				options?: any
			): Promise<Response>
		}

		/**

        * 示例接口

传入名称即可

        * /sayHello

        */

		export namespace sayHello {
			export class Params {
				/** 姓名 */

				name: string
			}

			export type Response = string

			export const init: Response

			export function request(
				params: Params,
				options?: any
			): Promise<Response>
		}
	}

	/**

	 * Post Controller

	 */

	export namespace post {
		/**

		 * 接收formData参数并创建用户

		 * /createUserByFormData

		 */

		export namespace testCreateUser {
			export class Params {
				/** 联系电话 */

				concat: string

				/** gender */

				gender?: string

				/** platformList */

				platformList?: Array<string>

				/** 姓名 */

				username: string
			}

			export type Response = defs.FrontResponse

			export const init: Response

			export function request(
				params: Params,
				options?: any
			): Promise<Response>
		}

		/**

		 * 接收JSON参数并创建用户

		 * /createUserByJson

		 */

		export namespace testCreateUserByRequestBody {
			export class Params {}

			export type Response = defs.FrontResponse

			export const init: Response

			export function request(
				params: Params,

				body: defs.User,

				options?: any
			): Promise<Response>
		}

		/**

		 * 文件上传

		 * /uploadFile

		 */

		export namespace testUploadFile {
			export class Params {
				file: FormData

				name?: string

				xxxx?: number
			}

			export type Response = defs.FrontResponse

			export const init: Response

			export function request(
				params: Params,

				form: FormData,

				options?: any
			): Promise<Response>
		}
	}
}

export class Box {
	/** t */

	t = undefined

	/** user */

	user = new User()
}

export class FrontResponse {
	/** code */

	code = undefined

	/** data */

	data = undefined

	/** directUrl */

	directUrl = ""

	/** msg */

	msg = ""
}

export class User {
	/** 联系电话 */

	concat = ""

	/** gender */

	gender = ""

	/** getPlatformList */

	getPlatformList = []

	/** map */

	map = undefined

	/** 联系电话 */

	password = ""

	/** platformList */

	platformList = []

	/** 姓名 */

	username = ""
}

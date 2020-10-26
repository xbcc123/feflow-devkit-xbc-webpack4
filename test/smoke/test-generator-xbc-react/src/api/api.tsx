import http from './http';

class Api {
	constructor() {
		this.http = http;
	}

	//上传图片
	uploadImg(params) {
		return this.http.upload("/m/pub/uploadImg", params);
	}

}

export default new Api();

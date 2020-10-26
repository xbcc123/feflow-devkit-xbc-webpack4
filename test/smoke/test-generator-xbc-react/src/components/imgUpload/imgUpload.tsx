import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import PropTypes from 'prop-types';

import app from '@/app.js';

function getBase64(img, callback) {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
}

function beforeUpload(file) {
	//   const isJPG = file.type === 'image/jpeg';
	//   if (!isJPG) {
	//     message.error('You can only upload JPG file!');
	//   }
	//   const isLt2M = file.size / 1024 / 1024 < 2;
	//   if (!isLt2M) {
	//     message.error('Image must smaller than 2MB!');
	//   }
	//   return isJPG && isLt2M;
	return true;
}

class ImgUpload extends Component<IProps, IState> {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			fileName: 'file',
			imgName: 'imgTest',
			imageUrl: ''
		};
	}

	componentWillReceiveProps(nextProps) {
		if ('fileName' in nextProps) {
			this.setState({
				fileName: nextProps.fileName
			});
		}
		if ('imgName' in nextProps) {
			this.setState({
				imgName: nextProps.imgName
			});
		}
		if ('imageUrl' in nextProps) {
			this.setState({
				imageUrl: nextProps.imageUrl
			});
		}
	}

	handleChange(info) {
		const { fileName, imgName } = this.state;
		let formData = new FormData();
		formData.append('file', info.file);
		app.$api.uploadImg(formData).then((res) => {
			this.setState({
				imageUrl: res.data.data,
				loading: false
			});
			this.props.imgTrue(imgName, fileName, res.data.data);
		});
	}

	setImgUrl(imageUrl) {
		this.setState({
			imageUrl
		});
	}

	render() {
		const uploadButton = (
			<div>
				<Icon type={this.state.loading ? 'loading' : 'plus'} />
				<div className="ant-upload-text">Upload</div>
			</div>
		);
		const { imageUrl } = this.state;
		return (
			<Upload
				name="avatar"
				listType="picture-card"
				className="avatar-uploader"
				showUploadList={false}
				// action="//jsonplaceholder.typicode.com/posts/"
				beforeUpload={beforeUpload}
				customRequest={this.handleChange.bind(this)}
				// onChange={this.handleChange}
			>
				{imageUrl ? (
					<img src={app.$imageUrl + imageUrl} alt="avatar" style={{ width: '100px', height: '80px' }} />
				) : (
					uploadButton
				)}
			</Upload>
		);
	}
}

ImgUpload.propTypes = {
	fileName: PropTypes.string,
	imgName: PropTypes.string,
	imageUrl: PropTypes.string
};

ImgUpload.defaultProp = {
	fileName: 'file',
	imgName: 'imgName'
};

export default ImgUpload;

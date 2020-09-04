import React, {useState} from 'react';
import { message, Upload} from 'antd';
import ImgCrop from 'antd-img-crop';
import conf from 'apis/admins/conf'
import utils from 'utils'
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
function UpLoad(props) {
    const maxLength = props.maxLength || 1;
    const [ loading, setLoading ] = useState(false);
    const [ fileList, setFileList] = useState([]);
    const [ defaultImg, setDefaultImg] = useState(props.defaultValue);
    // 默认列表
    // const defaultFileList = maxLength === 1 ? [
    //     {
    //         uid: '-1',
    //         name: 'file',
    //         status: 'done',
    //         url: props.defaultValue,
    //     }
    // ] : props.defaultValue.map(
    //     (item, key) => {
    //         return {
    //             uid: key.toString(),
    //             name: item.name || 'file',
    //             status: 'done',
    //             url: item.url,
    //         }
    //     }
    // );
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div className="ant-upload-text">点击上传</div>
        </div>
    );
    const beforeUpload = (file) => {
        const format = file.type.split("/").shift() === 'image';
        if (!format) {
            message.error('图片格式不正确!');
        }
        const isLt3M = file.size / 1024 / 1024 < 3;
        if (!isLt3M) {
            message.error('图片不能大于3M、请裁剪后上传!');
        }
        return format && isLt3M;
    };
    const handleChange = (info) => {
        if(fileList.length >= maxLength){
            return message.error( `只能上传${maxLength}张图片!`);
        }
        setLoading(true);
        conf.aliyun.uploadToOss(
            props.folder || '',
            info.file,
            data => {
                let list = [];
                data.res.requestUrls && data.res.requestUrls.forEach(item => {
                    const urlInfo = utils.functions.pathinfo(item);
                    list.push({
                        uid: (new Date()).valueOf(),
                        name: urlInfo.name,
                        status: 'done',
                        url: item.split('?')[0].split('#')[0]
                    })
                });
                list = maxLength === 1 ? list : [...fileList, ...list];
                if(maxLength === 1){
                    setDefaultImg(undefined)
                }
                setFileList(list);

                setLoading(false);
                'function' === typeof props.done && props.done(
                    maxLength === 1 ?
                        list[0].url
                        : list.map(item => {
                            return {
                                name: item.name,
                                url: item.url
                            }
                        })
                )
            },
            error => {
                message.error('上传失败!');
            }

        );
    };

    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };

    return (
        <ImgCrop rotate>
            <Upload
                listType="picture-card"
                fileList={fileList}
                beforeUpload={ beforeUpload }
                customRequest={ handleChange }
                onPreview={ onPreview }
                // defaultFileList={ defaultFileList }
            >
                {defaultImg ? <img src={defaultImg} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        </ImgCrop>
    )
}
export default UpLoad

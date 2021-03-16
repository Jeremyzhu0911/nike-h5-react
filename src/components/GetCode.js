import React, {useState, useEffect} from 'react';
import axios from 'axios';

let timer = null

const GetCode = (props) => {
    const {updateCodeTime} = props
    const [timeDate, setTimeDate] = useState({
        time: 60,
        time_txt: '获取验证码',
        isYzmClick: false
    });

    useEffect(() => {
        if (timeDate.isYzmClick) {
            let regex = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/;
            if (regex.test(props.data.postData.mobile)) {
                axios.post(props.data.codeUrl, props.data.postData).then(
                    (res) => {
                        console.log(res)
                        timer = setInterval(() => {
                            if (timeDate.time > 0) {
                                let time = timeDate.time--;
                                setTimeDate({
                                    ...timeDate,
                                    time_txt: time + '秒重新发送',
                                    time: time,
                                    isYzmClick: false
                                });
                                updateCodeTime({
                                    ...props.data,
                                    timeout: true
                                });
                            } else {
                                setTimeDate({
                                    ...timeDate,
                                    time_txt: '获取验证码',
                                    time: '60',
                                    isYzmClick: false
                                });
                                updateCodeTime({
                                    ...props.data,
                                    timeout: false
                                });
                                clearInterval(timer)
                            }
                        }, 1000)
                    },
                    (error) => {
                        console.log('验证码服务器异常')
                        console.log(error)
                    }
                )
            } else {
                alert("请输入正确的手机号码")
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeDate.isYzmClick])

    useEffect(() => {
        return () => {
            clearInterval(timer)
        }
    }, [])
    return (
        <span onClick={() => {
            if (!timeDate.isYzmClick) {
                setTimeDate({
                    ...timeDate,
                    isYzmClick: true
                });
            }
        }}>{timeDate.time_txt}</span>
    )
}

export default GetCode;
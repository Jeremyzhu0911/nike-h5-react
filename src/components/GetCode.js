import React, {useState, useEffect} from 'react';
import axios from 'axios';

const GetCode = (props) => {
    const {updateCodeTime} = props
    const [timeDate, setTimeDate] = useState({
        time: 60,
        time_txt: '获取验证码',
        isYzmClick: false
    });

    useEffect(() => {
        if (timeDate.isYzmClick) {
            axios.post(props.data.codeUrl, props.data.postData).then(
                (res) => {
                    console.log(res)
                    let timer = setInterval(() => {
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
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeDate.isYzmClick])

    return (
        <span onClick={() => {
            setTimeDate({
                ...timeDate,
                isYzmClick: true
            });
        }}>{timeDate.time_txt}</span>
    )
}

export default GetCode;
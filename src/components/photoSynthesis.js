import React, { Component } from 'react';

class photoSynthesis extends React.Component {
    constructor(props) {
        super(props)
        this.initCanvas = this.initCanvas.bind(this)
    }
    initCanvas() {
        let canvas1 = document.getElementById("customCanvas");
        canvas1.width = 800;
        canvas1.height = 1300;
        let context1 = canvas1.getContext("2d");
        context1.rect(0 , 0 , canvas1.width , canvas1.height);
        context1.fillStyle = "#fff";
        context1.fill();
        var myImage = new Image();
        myImage.src = require("./diaoding.png");  //背景图片 你自己本地的图片或者在线图片
        myImage.crossOrigin = 'Anonymous';
        myImage.onload = function(){
            context1.drawImage(myImage , 0 , 0 , 627 , 262);
            // context1.font = "60px Courier New";
            // context1.fillText("合成的图片",350,450);
            var myImage2 = new Image();
            myImage2.src = require("./zuoce.png");  //你自己本地的图片或者在线图片
            myImage2.crossOrigin = 'Anonymous';
            myImage2.onload = function(){
                context1.drawImage(myImage2 , 0 , 0 , 138 , 1226);
                //var base64 = canvas1.toDataURL("image/png"); //"image/png" 这里注意一下
                //var img = document.getElementById('avatar');
                // document.getElementById('avatar').src = base64;
                //img.setAttribute('src' , base64);
                var myImage3 = new Image();
                myImage3.src = require("./houbi1.png");  //你自己本地的图片或者在线图片
                myImage3.crossOrigin = 'Anonymous';
                myImage3.onload = function(){
                    context1.drawImage(myImage3 , 136 , 260 , 360 , 700);
                    //var base64 = canvas1.toDataURL("image/png"); //"image/png" 这里注意一下
                    var myImage4 = new Image();
                    myImage4.src = require("./youce.png");  //你自己本地的图片或者在线图片
                    myImage4.crossOrigin = 'Anonymous';
                    myImage4.onload = function(){
                        context1.drawImage(myImage4 , 490 , 0 , 135 , 1205);
                        var myImage5 = new Image();
                        myImage5.src = require("./diban.png");  //你自己本地的图片或者在线图片
                        myImage5.crossOrigin = 'Anonymous';
                        myImage5.onload = function(){
                            context1.drawImage(myImage5 , 0 , 954 , 630 , 255);
                            var base64 = canvas1.toDataURL("image/png"); //"image/png" 这里注意一下
                            //var img = document.getElementById('avatar');
                            // document.getElementById('avatar').src = base64;
                            //img.setAttribute('src' , base64);
                        }
                    }
                }
            }
        }
    }

    componentDidMount() {
        this.initCanvas()
    }
    componentDidUpdate() {
        this.initCanvas()
    }

    render() {
        const { width, height, canvaswidth, canvasheight } = this.props
        return (
            <div style={{ display:"flex",flexDirection:"column" }}>
                <div style={{ display:"flex",flexDirection:"row" }}>
                    <img style={{ width: 200, height: 83, padding: 10 }} src={require('./diaoding.png')}></img>
                    <img style={{ width: 100, height: 200, padding: 10 }} src={require('./zuoce.png')}></img>
                    <img style={{ width: 103, height: 200, padding: 10 }} src={require('./houbi1.png')}></img>
                    <img style={{ width: 100, height: 200, padding: 10 }} src={require('./youce.png')}></img>
                    <img style={{ width: 200, height: 84, padding: 10 }} src={require('./diban.png')}></img>
                </div>
                <canvas id="customCanvas" width={canvaswidth} height={canvasheight}></canvas>
                {/* <img id="avatar" ></img> */}
            </div>
        )
    }
}

export default photoSynthesis;
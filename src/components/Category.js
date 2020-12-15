import React from 'react';
import ReactSwipe from 'react-swipe';

class Category extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        }
    }
    render() {
        let opt = {
            auto: 2000,
            callback: function(index) {
                console.log(index);
                this.setState({index: Number(index)})
            }.bind(this)
        }

        return (
            <div id="home-category">
                <ReactSwipe className="carousel" swipeOptions={opt}>
                    <div className="carousel-item">
                        <ul className='clear-fix'>
                            <li className="float-left ktv">KTV</li>
                            <li className="float-left ktv">KTV</li>
                            <li className="float-left ktv">KTV</li>
                            <li className="float-left ktv">KTV</li>
                            <li className="float-left ktv">KTV</li>
                            <li className="float-left ktv">KTV</li>
                            <li className="float-left ktv">KTV</li>
                            <li className="float-left ktv">KTV</li>
                            <li className="float-left ktv">KTV</li>
                            <li className="float-left ktv">KTV</li>
                        </ul>
                    </div>
                    <div className="carousel-item">
                        <ul className='clear-fix'>
                            <li className="float-left meishi">KTV</li>
                            <li className="float-left jiudian">KTV</li>
                            <li className="float-left meishi">KTV</li>
                            <li className="float-left waimai">KTV</li>
                            <li className="float-left meishi">KTV</li>
                            <li className="float-left meishi">KTV</li>
                            <li className="float-left dujiachuxing">KTV</li>
                            <li className="float-left zuliaoanmo">KTV</li>
                            <li className="float-left ribencai">KTV</li>
                            <li className="float-left ribencai">KTV</li>
                        </ul>
                    </div>
                    <div className="carousel-item">
                        <ul className='clear-fix'>
                            <li className="float-left xican">SPA</li>
                            <li className="float-left xican">SPA</li>
                            <li className="float-left xican">SPA</li>
                            <li className="float-left xican">SPA</li>
                            <li className="float-left xican">SPA</li>
                            <li className="float-left xican">SPA</li>
                            <li className="float-left xican">SPA</li>
                            <li className="float-left xican">SPA</li>
                            <li className="float-left xican">SPA</li>
                            <li className="float-left xican">SPA</li>
                        </ul>
                    </div>
                </ReactSwipe>
                <div className="index-container">
                    <ul>
                        <li className={this.state.index === 0 ? 'selected': ''}> </li>
                        <li className={this.state.index === 1 ? 'selected': ''}> </li>
                        <li className={this.state.index === 2 ? 'selected': ''}> </li>
                    </ul>
                </div>
            </div>
        )
    }
    componentDidUpdate() {
    }
}

export default Category;
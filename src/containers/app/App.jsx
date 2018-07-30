import React, {Component } from 'react';
import './App.sass';
import Header from '../../components/header/Header.jsx';
import photo from '../../assets/test.jpg';

class App extends Component {
    initialPhotoConfig = {
        opacity: '100',
        grayscale: '0',
        saturate: '100',
        sepia: '0',
        contrast: '100',
        brightness: '100',
        invert: '0'
    };
    constructor(props) {
        super(props);
        this.state = {};
        this.state.shown = true;
        this.state.photoConfig = this.initialPhotoConfig;
    }
    render() {
        return (
            <div className="app">
                <Header/>
                <div className="app__wrapper">
                    <div>
                        <div className="control">
                            <Control onChange={(event) => this.configPhoto(event.target, event.target.name)}/>
                            <div className="control__buttons">
                                <ButtonToggler onClick={this.togglePhoto} textContent={this.state.shown}/>
                                {/* <ButtonLoader/> */}
                                <ButtonReseter onClick={this.resetInputs}/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Photo styleFilter={this.state.photoConfig} shown={this.state.shown}/>
                    </div>
                </div>
            </div>
        );
    }
    componentDidMount() {
        this.setDefault();
    }
    togglePhoto = () => {
        this.setState({shown: !this.state.shown});
    }
    configPhoto = (input, property) => {
        this.setState({
            photoConfig: {
                ...this.state.photoConfig,
                [property] : input.value
            }
        })
    }
    resetInputs = () => {
        this.setDefault();
        this.setState({
            photoConfig : this.initialPhotoConfig
        })
    }
    setDefault = () => {
        document.querySelectorAll('input[type=range]').forEach(input => {
            input.value = this.initialPhotoConfig[input.getAttribute('name')];
        })
    }
}

class Control extends Component {
    render() {
        return (
            <div>
                <label>
                    Opacity<br/>
                    <input type="range" min="0" max="100" step="1" name="opacity" onChange={this.props.onChange}/>
                </label>
                <label>
                    Grayscale<br/>
                    <input type="range" min="0" max="100" step="1" name="grayscale" onChange={this.props.onChange}/>
                </label>
                <label>
                    Saturate<br/>
                    <input type="range" min="0" max="100" step="1" name="saturate" onChange={this.props.onChange}/>
                </label>
                <label>
                    Sepia<br/>
                    <input type="range" min="0" max="100" step="1" name="sepia" onChange={this.props.onChange}/>
                </label>
                <label>
                    Contrast<br/>
                    <input type="range" min="0" max="1000" step="1" name="contrast" onChange={this.props.onChange}/>
                </label>
                <label>
                    Brightness<br/>
                    <input type="range" min="0" max="1000" step="1" name="brightness" onChange={this.props.onChange}/>
                </label>
                <label>
                    Invert<br/>
                    <input type="range" min="0" max="100" step="1" name="invert" onChange={this.props.onChange}/>
                </label>
            </div>
        )
    }
}

class ButtonToggler extends Component {
    render() {
        return (
            <button className="button" type="button" onClick={this.props.onClick}>
                {this.props.textContent ? 'Hide' : 'Show'}
            </button>
        )
    }
}

// class ButtonLoader extends Component {
//     render() {
//         return (
//             <div className="file-load-button">
//                 <form encType="multipart/form-data" action="__URL__" method="post">
//                     <input type="hidden" name="MAX_FILE_SIZE" value="30000" />
//                     <label>
//                         <button type="submit" className="button">Load</button>
//                         <input type="file" className="button" />
//                     </label>
//                 </form>
//             </div>
//         )
//     }
// }

class ButtonReseter extends Component {
    render() {
        return (
            <button className="button" type="button" onClick={this.props.onClick}>
                Reset
            </button>
        )
    }
}

class Photo extends Component {
    render() {
        const styleFilter = this.props.styleFilter;
        return (
            <img src={photo} alt="testphoto" style={{filter:`opacity(${styleFilter.opacity}%) grayscale(${styleFilter.grayscale}%) saturate(${styleFilter.saturate}%) sepia(${styleFilter.sepia}%) contrast(${styleFilter.contrast}%) brightness(${styleFilter.brightness}%) invert(${styleFilter.invert}%)`}} hidden={!this.props.shown}/>
        )
    }
}

export default App;
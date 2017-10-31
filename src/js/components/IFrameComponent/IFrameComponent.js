import './IFrameComponent.scss';

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class IFrameComponent extends Component {

  static propTypes = {
    ref         :PropTypes.string.isRequired,
    children    :PropTypes.array,
    url         :PropTypes.string,
    onLoad      :PropTypes.func,
    onDragOver  :PropTypes.func,
    onDragEnd   :PropTypes.func,
    onDragExit  :PropTypes.func,
    onDrop      :PropTypes.func,
    onMouseOver :PropTypes.func,
    onMouseOut  :PropTypes.func,
    onUpdateOrder  :PropTypes.func,
    onClick     :PropTypes.func
  };

  /**
   * Default Constructor
   * @param {Object} props
   */

  constructor(props, context) {
    super(props, context);
  }

  /**
   * Component Will Receive Props
   * @param {Object} props
   */
  componentDidMount() {
    let idocument = document.getElementById('frameWrapper');
    const that = this;
    idocument.onload = () => {
      setTimeout(() => {
        that.onLoad();
        that.renderFrame();
      }, 100);
    };
    
  }
  /**
   * Component Will Receive Props
   * @param {Object} props
   */
  componentWillReceiveProps(nextProps) {
    const frame = ReactDOM.findDOMNode(this);
    const root = frame.contentDocument.getElementById('root');
    if (nextProps.children && root){
        ReactDOM.render(<div>{nextProps.children}</div>, root);
    }
  }
  /**
   * Component Should Update
   * @param {Object} props
   */
  shouldComponentUpdate() {
    return false;
  }
  
  /**
   * Component Will Receive Props
   * @param {Object} props
   */
  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this).contentDocument.getElementById('root'));
  }

  /**
   * On Drag Over Event
   * @param {Object} event
   */
  onDragOver(event){
    if (this.props.onDragOver) {
        this.props.onDragOver(event);
    }
  }

  /**
   * On Load Event
   * @param {Object} event
   */
  onLoad(){
    if (this.props.onLoad) {
        this.props.onLoad();
    }
  }

  /**
   * On Drag End Event
   * @param {Object} event
   */
  onDragEnd(event){
    if (this.props.onDragEnd) {
        this.props.onDragEnd(event);
    }
  }

  /**
   * Component Will Receive Props
   * @param {Object} event
   */
  onDragExit(event){
    if (this.props.onDragExit) {
        this.props.onDragExit(event);
    }
  }

  /**
   * On Drop Event
   * @param {Object} event
   */
  onDrop(event){
    if (this.props.onDrop) {
        this.props.onDrop(event);
    }
  }

  /**
   * Component Will Receive Props
   * @param {Object} event
   */
  onMouseOver(event){
    if (this.props.onMouseOver) {
        this.props.onMouseOver(event);
    }
  }

  /**
   * On Mouse Out Event
   * @param {Object} event
   */
  onMouseOut(event){
    if (this.props.onMouseOut) {
        this.props.onMouseOut(event);
    }
  }

  /**
   * On Update Order Event
   * @param {Object} event
   */
  onUpdateOrder(event){
    if (this.props.onUpdateOrder) {
        this.props.onUpdateOrder(event);
    }
  }

  /**
   * On Click Event
   * @param {Object} event
   */
  onClick(event){
    if (this.props.onClick) {
        this.props.onClick(event);
    }
  }
  /**
   * Render Scripts to header
   * @param none
   */
  renderFrame() {
    const {children} = this.props;
    const frame = ReactDOM.findDOMNode(this);
    const root = frame.contentDocument.getElementById('root');
    if (root) {
        ReactDOM.render(<div>{children}</div>, root);
    }
    else {
      console.log('Root not loaded!');
    }
  }

  /**
   * Render
   * @param none
   */
  render () {
    const {url, ref} = this.props;
    return (
      <iframe
        ref={ref}
        id="frameWrapper" 
        className="frameWrapper empty"
        src={url}
        onDragOver={this.onDragOver.bind(this)}
        onDragEnd={this.onDragEnd.bind(this)}
        onDragExit={this.onDragExit.bind(this)}
        onDrop={this.onDrop.bind(this)}
        onUpdateOrder={this.onUpdateOrder.bind(this)}
        onMouseOver={this.onMouseOver.bind(this)}
        onMouseOut={this.onMouseOut.bind(this)}
        onClick={this.onClick.bind(this)}
        />
    );
  }
}

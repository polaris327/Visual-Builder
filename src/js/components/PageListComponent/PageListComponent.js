import React, { Component, PropTypes } from 'react';

export default class PageListComponent extends Component {
   static propTypes = {	
        children: PropTypes.node.isRequired,
        pageId: PropTypes.string.isRequired,
        onDragOver  :PropTypes.func,
        onDragEnd   :PropTypes.func,
        onDragExit  :PropTypes.func,
        onDrop      :PropTypes.func,
        onMouseOver :PropTypes.func,
        onMouseOut  :PropTypes.func,
        onUpdateOrder  :PropTypes.func,
        onClick     :PropTypes.func
   };

    constructor(props) {
        super(props);
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

    render() {
        const { children, pageId } = this.props;
        return (
            <ul
            ref={'pageList'}
            className = {'page_list page_' + pageId}
            id = {'templateWrapper'}
            onDragOver={this.onDragOver.bind(this)}
            onDragEnd={this.onDragEnd.bind(this)}
            onDragExit={this.onDragExit.bind(this)}
            onDrop={this.onDrop.bind(this)}
            onMouseOver={this.onMouseOver.bind(this)}
            onMouseOut={this.onMouseOut.bind(this)}
            onClick={this.onClick.bind(this)}
            updateOrder={this.onUpdateOrder.bind(this)}
            >
                {children}            
            </ul>
        );
    }
}
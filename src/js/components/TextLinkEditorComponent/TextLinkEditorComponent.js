import './TextLinkEditorComponent.scss';

import React, { Component, PropTypes } from 'react';
import { Tooltip, Button } from 'react-bootstrap';
import { LinkEditorComponent } from '../../components';

export default class TextLinkEditorComponent extends Component {

  static propTypes = {
    bold: PropTypes.string, // eg, 'bold' or '100'
    italic: PropTypes.string, // eg, 'italic' or 'none'
    linkValue: PropTypes.object, // eg, {textToDisplay: 'Google', curUrl: 'http://www.google.com/', openInNewWindow: true, pages: ['index.html', 'test.html'], pageAnchors: ['#top', '#footer']},
    direction: PropTypes.string, // top/bottom
    
    onToggleBold: PropTypes.func,
    onToggleItalic: PropTypes.func,
    onChangeLink: PropTypes.func // callback param format - eg, {textToDisplay: 'Google', curUrl: 'http://www.google.com/', openInNewWindow: true, pages: ['index.html', 'test.html'], pageAnchors: ['#top', '#footer']}
  };

  constructor(props) {
    super(props);

    this.state = {
      displayLinkEditor: false,
      bold: (typeof props.bold !== 'undefined') ? props.bold : '100',
      italic: (typeof props.italic !== 'undefined') ? props.italic : 'normal',
      linkValue: (typeof props.linkValue !== 'undefined') ? props.linkValue : {},
      direction: (typeof props.direction !== 'undefined') ? props.direction : 'top'
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      bold: (typeof nextProps.bold !== 'undefined') ? nextProps.bold : '100',
      italic: (typeof nextProps.italic !== 'undefined') ? nextProps.italic : 'normal',
      linkValue: (typeof nextProps.linkValue !== 'undefined') ? nextProps.linkValue : {},
      direction: (typeof nextProps.direction !== 'undefined') ? nextProps.direction : 'top'
    });
  }

  /* -- link editor */
  toggleLinkEditor() {
    this.setState({ displayLinkEditor: !this.state.displayLinkEditor });
  }

  onCloseLinkEditorModal(opt) {
    this.setState({ displayLinkEditor: !this.state.displayLinkEditor });
    this.setState({ linkValue: opt });

    if (typeof this.props.onChangeLink !== 'undefined') {
      this.props.onChangeLink(opt);
    }
  }
  /* link editor -- */

  /* -- B/I buttons */
  onToggleBold() {
    let newBold = '100';
    if (this.state.bold === '100') {
      newBold = 'bold';
    }

    this.setState({ bold: newBold });
    if (typeof this.props.onToggleBold !== 'undefined') {
      this.props.onToggleBold(newBold);
    }
  }

  onToggleItalic() {
    let newItalic = 'normal';
    if (this.state.italic === 'normal') {
      newItalic = 'italic';
    }

    this.setState({ italic: newItalic });
    if (typeof this.props.onToggleItalic !== 'undefined') {
      this.props.onToggleItalic(newItalic);
    }
  }
  /* B/I buttons -- */

  render () {
    return (
      <div>
        <Tooltip placement={this.state.direction} className='in' id='tooltip-top'>
          <Button onClick={this.onToggleBold.bind(this)} active={this.state.bold === 'bold'} title='Bold'><i className='fa fa-bold' /></Button>
          <Button onClick={this.onToggleItalic.bind(this)} active={this.state.italic === 'italic'} title='Italic'><i className='fa fa-italic' /></Button>
          <Button onClick={this.toggleLinkEditor.bind(this)} title='Link'><i className='fa fa-link' /></Button>
        </Tooltip>
        { this.state.displayLinkEditor && <LinkEditorComponent onClose={this.onCloseLinkEditorModal.bind(this)} value={this.state.linkValue} />}
      </div>
    );
  }
}

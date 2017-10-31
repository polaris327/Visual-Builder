import './VisualEditorComponent.scss';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { headerActions, leftmenuActions, pageActions, fileopActions } from '../../actions';
//import { ActionCreators as UndoActionCreators } from 'redux-undo';
import { LeftMenuComponent, HeaderComponent, PageContainer} from '../../components';
import * as utils from '../../utils';

class VisualEditorComponent extends Component {

  static propTypes = {
    dispatch        :PropTypes.func.isRequired,
    screen          :PropTypes.string.isRequired,
    pageTitle       :PropTypes.string.isRequired,
    containerClass  :PropTypes.string,
    fullWidth       :PropTypes.bool,
    blockList       :PropTypes.array,
    recentTemplate  :PropTypes.string,
    templates       :PropTypes.object,
    pages           :PropTypes.array,
    isSaving        :PropTypes.bool,
    isMenuFetching  :PropTypes.bool
  }

  constructor(props) {
    super(props);

    this.state = {
      sidebarOpen   :false,
      screen        :(typeof this.props.screen !== 'undefined')?this.props.screen:"desktop",
      pageName      : utils.getPageName(),
      pageTitle     : ''
    };
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fileopActions.requestLoadFile(this.state.pageName));
    
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.screen !== nextProps.screen){
      this.setState({
        screen   :nextProps.screen
      });
    }
    if (this.state.pageName !== nextProps.pageTitle) {
      this.setState({
        pageTitle : nextProps.pageTitle
      });
    }
  }

  componentWillUnmount() {
    
  }

  toggleSideMenu(){
    this.setState({
      sidebarOpen   : !this.state.sidebarOpen
    });
  }

  closeSideMenu() {
    this.setState({
      sidebarOpen : false
    });
  }

  onPageSave() {
    const {dispatch} = this.props;
    let blockList = [];
    this.props.blockList.forEach(function(block) {
      blockList.push({
        id: block.id,
        html: utils.getSourceCode(block.id)
      });
    }, this);
    let styleHandler = utils.getStyleHandler().sheet;
    let styles = [];
    for (let key in styleHandler.cssRules) {
      styles.push(styleHandler.cssRules[key].cssText);
    }
    dispatch(fileopActions.requestSaveFile(this.state.pageName, JSON.stringify({blockList:blockList, styles: styles, screen:this.state.screen})))
  }

  render () {
    const { pageTitle, blockList, dispatch, templates, recentTemplate, pages, isSaving, isMenuFetching} = this.props;
    return (
      <div id="builder">
        <LeftMenuComponent 
          loadTemplate={() => dispatch(leftmenuActions.requestTemplate())}
          loadPages={() => dispatch(leftmenuActions.requestPages())}
          templates={templates}
          pages={pages}
          isOpen= {this.state.sidebarOpen}
          position="left" />
        <div className="wrapper">
          <HeaderComponent 
            onScreenSelect  = {(screen) => dispatch(headerActions.changeScreenSize(screen))}
            onPageSave      = {this.onPageSave.bind(this)}
            onEmptyPage     = {() => dispatch(pageActions.emptyPage())}
            onPublishPage   = {() => dispatch(pageActions.publishPage(this.state.pageName))}
            onToggleSide    = {this.toggleSideMenu.bind(this)}
            screen          = {this.state.screen}
            isSaving        = {isSaving}
            pageTitle       = {this.state.pageName} />
          <div className = {'screen ' + this.state.screen} id="screen">
            <div className="toolbar">
              <div className="buttons clearfix">
                  <span className="left red"></span>
                  <span className="left yellow"></span>
                  <span className="left green"></span>
              </div>
              <div className="title">
                  <span id="pageTitle">{this.state.pageName}</span>
              </div>
            </div>
            <PageContainer 
              blockList={blockList} 
              pageName={this.state.pageName} 
              recentId={recentTemplate} 
              pageTitle={this.state.pageName}
              isMenuFetching={isMenuFetching}
              closeSideMenu={this.closeSideMenu.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    screen        : state.header.present.screen,
    isSaving      : state.fileop.present,
    pageTitle     : state.header.present.pageTitle,
    containerClass: state.block.present.containerClass,
    fullWidth     : state.block.present.fullWidth,
    blockList     : state.page.present.blockList,
    recentTemplate: state.page.present.recentId,
    templates     : state.leftmenu.present.templates,
    pages         : state.leftmenu.present.pages,
    isMenuFetching: state.leftmenu.present.isFetching
  };
}

export default connect(
  mapStateToProps
)(VisualEditorComponent);

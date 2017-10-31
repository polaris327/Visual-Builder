import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from './components/App';
import NotFoundView from './views/NotFoundView';
import { ROUTE_BASE_URL } from './constants/urlNames';
import VisualEditorComponent from './containers/VisualEditorComponent/VisualEditorComponent';

export default (
	<Route path={ ROUTE_BASE_URL } component={App}>
		<IndexRoute component={VisualEditorComponent} />
		<Route path="404" component={NotFoundView} />
		<Redirect from="*" to="404" />
	</Route>
);
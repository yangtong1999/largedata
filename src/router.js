import React from 'react';
import {
	Router,
	Route,
	Switch
} from 'dva/router';
import Home from './routes/home';
import Prediction from "./routes/prediction";
import {
	GlobalStyled
} from './style.js';

function RouterConfig({
	history
}) {
	return (
		<div>
	<GlobalStyled />
	<Router history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path = "/prediction" exact component = {Prediction} />
      </Switch>
    </Router>
    </div>
	);
}

export default RouterConfig;
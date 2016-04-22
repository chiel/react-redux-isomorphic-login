'use strict';

import apiMiddleware      from 'app/utils/apiMiddleware';
import { applyMiddleware,
         createStore }    from 'redux';

export default applyMiddleware(apiMiddleware)(createStore);

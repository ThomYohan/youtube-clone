import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../src/Components/Home/Home';
import Channel from '../src/Components/Channel/Channel';
import Search from '../src/Components/Search/Search';
import Video from '../src/Components/Video/Video';
import Upload from './Components/Upload/Upload';

export default (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/channel' component={Channel}/>
        <Route path='/search' component={Search}/>
        <Route path='/video' component={Video}/>
        <Route path='/upload' component={Upload}/>
    </Switch>
)
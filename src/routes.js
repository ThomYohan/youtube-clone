import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '../src/Components/Home/Home';
import Channel from '../src/Components/Channel/Channel';
import Search from '../src/Components/Search/Search';
import Video from '../src/Components/Video/Video';
import Upload from './Components/Upload/Upload';

export default function routes(searchInput){
    return (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/channel' component={Channel}/>
        <Route path='/search' render={()=> <Search searchInput={searchInput}/>}/>
        <Route path='/video/:id' component={Video}/>
        <Route path='/upload' component={Upload}/>        
        <Route path='/redirect' render={(props)=>{
            let url = document.cookie.match(/(?<=redirecturl=).+?$/)[0]
            if(url === 'undefined'){
                console.log('if statement')
                url = '/'
            }
            return <Redirect to={url} />
            }}/>
    </Switch>
    )
}
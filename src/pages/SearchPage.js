import React from 'react';
import {API} from '../components/Global';
import NaivgationBar from '../components/NavigationBar';
import LandingPage from '../pages/LandingPage';

class SearchPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {search_result_data: [] };
        this.foo = this.foo.bind(this);
    }

    async componentDidMount(){
        var headers = new Headers();
        headers.append('Authorization','Token '+localStorage.auth_token);
        var url = API + 'search/'+this.props.match.params.pattern;
        var request = new Request(url, {method:'GET', headers});
        
        const resp = await fetch(request);
        const data = await resp.json();
        console.log(data);
        console.log(this.state.main_data)
        this.setState(  {   search_result_data : data    }   );
    }

    render() {
        return (
                <div>
                    { localStorage.auth_token !== undefined && 
                        <div>
                            
                            <NaivgationBar />
                            
                            <div class="row" style={{marginLeft: '10%',  marginRight: '10%'}}>
                                <div class="container">
                                    <div class="card z-depth-3">
                                        <ul class="collection  with-header">
                                            <li class="collection-header">  
                                                Search results for <b>{this.props.match.params.pattern}</b> 
                                            </li>
                                            {this.state.search_result_data.map(this.foo)}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ||
                        <LandingPage/>
                    }
                </div>
                );
    }
    foo(t){
        var search_url = '/friend/'+t.username;
        return <li>
                    <a href={search_url} className="collection-item" >{t.username}</a>        
                </li>
    }
}

export default SearchPage;
import React from 'react';


class SearchPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {search_result_data: [] };
    }

    async componentDidMount(){
        var headers = new Headers();
        headers.append('Authorization','Token '+localStorage.auth_token);
        var request = new Request('http://127.0.0.1:8000/api/search/'+this.props.match.params.pattern, {method:'GET', headers});
        
        const resp = await fetch(request);
        const data = await resp.json();
        console.log(data);
        console.log(this.state.main_data)
        this.setState(  {   search_result_data : data    }   );
    }

    render() {
        return (
                <div>
                    <h1>Search result for {this.props.match.params.pattern}</h1>
                    {this.state.search_result_data.map(this.foo)}
                </div>
                );
    }
    foo(t){
        return <div>{t.username}<br/></div>
    }
}

export default SearchPage;
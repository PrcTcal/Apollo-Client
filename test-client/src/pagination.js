import React, {Component} from 'react';

class Pagination extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
    }


    render(){
        
        return (
            <ul>
                <li className="paging" id="prev" onClick={() => {
                    if(this.props.page > 1) this.props.setPage(this.props.page - 1);
                }}>Prev</li>
                <li className="paging" id="next" onClick={() => { 
                    this.props.setPage(this.props.page + 1);
                }}>Next</li>
            </ul>
        );
    }
}



export default Pagination;
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
                <li onClick={() => {
                    console.log(this.props.page);
                    if(this.props.page > 1) this.props.setPage(this.props.page - 1);
                }}>Prev</li>
                <li onClick={() => { 
                    console.log(this.props.page);
                    if(this.props.page < 3) this.props.setPage(this.props.page + 1);
                }}>Next</li>
            </ul>
        );
    }
}



export default Pagination;
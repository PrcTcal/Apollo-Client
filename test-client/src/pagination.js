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
        let arr = [];
        for(let i = 1 ; i <= this.props.length ; i++){
            arr.push(i);
        }

        return (
            <ul>
                <li className="paging" id="prev" onClick={() => {
                    if(this.props.page > 1) this.props.setPage(this.props.page - 1);
                }}>Prev</li>

                {arr.map((idx, i) => (
                    <li key={i} className="paging" onClick={() => {
                        this.props.setPage(idx);
                    }}>{idx}</li>
                ))}
                
                <li className="paging" id="next" onClick={() => { 
                    if(this.props.page < this.props.length) this.props.setPage(this.props.page + 1);
                }}>Next</li>
            </ul>
        );
    }
}



export default Pagination;
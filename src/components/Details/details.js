import React from 'react';
import './details.css';

import Header from '../Header/header';

export default class Details extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
          title: '',
          description: '',
          image: ''
        };
      }

    componentDidMount() {
        console.log(this.props.location);
        const { title, description, image } = this.props.location.state;
        this.setState({
            title,
            description,
            image
        })
    }
    render() {
        return (
            <div className='container'>
                <Header mainHeader={this.state.title} subHeader={this.state.description} />
                <br />
                <img alt='' src={`https://apps.aecom-digital.com/excellence/${this.state.image}`} />
            </div>
        );
    }
}
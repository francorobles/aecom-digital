import React from 'react';
import { v4 as uuid } from 'uuid';

import Header from '../Header/header';

import './list.css';



export default class List extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
          data: null
        };
      }

    viewDetails(project) {
        this.props.history.push({
            pathname: `/details/${project.id}`,
            state: {
                title: project.title,
                description: project.project_text,
                image: project.image.url
            }
        })
    }

    getLoaderOrList() {
        if (this.state.data) {
            const list = this.getCategories(this.state.data).map(row => {
                return (
                    <div className='row ae-padded'>
                        <Header mainHeader={row.Category_title} subHeader={row.Category_intro} key={uuid()} />
                        <br />
                        {
                            this.getProjects(row.projects, this.state.data).map(project => {
                                return (
                                    <div className='col-sm-3 ae-padded' onClick={() => this.viewDetails(project)}>
                                        <div className='card' style={{ 
                                            backgroundImage: `url('https://apps.aecom-digital.com/excellence/${project.image.url}')`,
                                            backgroundSize: 'cover'
                                        }}>
                                            <h5></h5>
                                        </div>
                                        <h6 className='box-label'>{project.title}</h6>
                                    </div>
                                );
                            })
                        }
                        <br />
                        <br />
                        <div className='ae-container'>
                            <a className='ae-back-to-top' href="#">Back To Top</a>
                        </div>
                        <br />
                    </div>
                )
            })
            return list;
        } else {
          return <div className='loader'>Loading...</div>
        }
    }
    
    componentDidMount() {
        console.log("1");
        fetch('https://apps.aecom-digital.com/excellence/projects')
            .then(response => response.json())
            .then(responseJson => this.setState({ data : responseJson }))
            .catch(error => console.error(error));
    }

    getProjects(projects, mainData) {
        let rowProjects = []
        if (projects.length) {
            projects.map(projectId => {
                return rowProjects.push(
                    mainData.find(data => data.id === projectId))
            })
        }
        return rowProjects;
    }

    getCategories(items) {
        let finalCategories = [];
        if (items) {
            items.forEach(data => {
                const { categories } = data;
                if (categories) {
                    categories.map(category => {
                        if (finalCategories.filter(cat =>
                            cat.Category_title === category.Category_title).length === 0) {
                            finalCategories.push(category);
                        }
                    })   
                }
            });
        }
        return finalCategories.sort((a, b) => (a.Category_title > b.Category_title) ? 1 : -1);
    }
    
    render() {
        return (
            this.getLoaderOrList()
        )
    };
};

import React, {Component} from 'react';
import {Table,Button} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {faImage, faThumbsUp, faThumbsDown, faMoneyCheckAlt, faSearchDollar} from '@fortawesome/free-solid-svg-icons';

const API = 'xxx';
const DEFAULT_QUERY = 'redux';
const hits = [
    { name: "Tammy",  class: "Class 1"},
    { name: "Camen",  class: "Class 2"},
    { name: "Happy", class: "Class 3" },
    { name: "Hello Kitty", class: "Class 4"},
    { name: "Hello Mimi",  class: "Class 3"}
  ];

class App extends Component { 
    constructor(props) {
        super(props);
     
        this.state = {
            hits,
            isLoading: false,
            error: null,
        };
      }
   
    render() {       
        const { hits, isLoading, error } = this.state; 
        if (this.state.error) {
            return <p>{error.message}</p>;
          }

        if (this.state.isLoading) {
            return <p>Loading ...</p>;
        }
           
        return (   
            <form>                
                <div className="container border border-secondary rounded center">
                    <div className="row">
                        <div className="col-12">  
                        {' '}
                        <h4>
                            <b>Class Mapping</b>
                        </h4>{' '}   
                        </div>
                    </div>

                    <div className=".col-xs-12 center text-center">                         
                        <Table responsive striped bordered hover>
                            <tr>
                                <th>Class 1</th>
                                <th>Class 2</th>
                                <th>Class 3</th>
                                <th>Class 4</th>
                                <th>Class 5</th>
                            </tr>
                            <tbody>                                  
                                {   this.getRows().map((row) => (
                                    <tr key={row.reduce((a, b) => a + b)}>
                                        {row.map((column) => (
                                        <td key={column}>{column}</td>
                                        ))}
                                    </tr>
                                ))}   
                             </tbody>                             
                        </Table>
                        <Button type='submit' color="danger">Class Remapping</Button>
                    </div>
                </div>  
            </form>     
        );
    }

    getRows = () => {
        const columns = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];
        const rows = [];
            
        const groupByColumn = this.state.hits.reduce((acc, next) => {
          return { ...acc, [next.class]: [...acc[next.class], next.name] };
        }, {});
    
        var haveNames = () => columns.some(column => groupByColumn.length > 0);

        while (haveNames()) {
          const newRow = columns.map((column) => {
            return groupByColumn[column].shift();
          });
    
          rows.push(newRow);
        }    
        return rows;
    };

    async componentDidMount(){
        this.setState({ isLoading: true });
        //const response = await fetch('xxx');
        //const body = await response.json();
        this.setState({hits, isLoading: false,error:null});       
    }
} 
export default App;
    

import React, { Component } from "react";
import axios from 'axios';
import {getUsers} from '../services/userService';
import moment from "moment";



class Home extends Component {

  state={
    userList:[],
    permanentUserList:[],
    userName:'',
    appliedFilters:[]
  }
  
  componentDidMount(){
    this.getUsers();
  }


  // fetch users
  async getUsers(){
    const { data } = await getUsers();
    const userList = data.results;
    const permanentUserList = data.results;
    this.setState({userList,permanentUserList});
  }


  // search user
 
  handleChange = (event) => {
      const userName = event.target.value;
      this.setState({userName:userName});
    }

  // change sort order  

 changeSortOrder = (event) => {
   const sortedValue = event.target.value;
   const userList = [...this.state.userList];

   if(sortedValue === 'Ascending'){
     const sortedUserList =  userList.sort((a,b) => a.id - b.id);
     this.setState({userList:sortedUserList});
   }

   if(sortedValue === 'Decending'){
    const sortedUserList =  userList.sort((a,b) => b.id - a.id);
    this.setState({userList:sortedUserList});
  }
 }


 // change filter

 handleFilterChange = (event) => {
   var name = event.target.name;
   var isCheck = event.target.checked;
   var category = event.target.value;
   var appliedFilters = [...this.state.appliedFilters];
   var sortedUserList = [];
   var userList = [];
  
   
   if(isCheck){
    appliedFilters.push({name:name,category:category});
    userList = [...this.state.userList];
   }else{
    appliedFilters = appliedFilters.filter(list => list.name !== name);
    userList = [...this.state.permanentUserList];
   }

   for(let i=0; i < appliedFilters.length; i++){
     for(let j=0; j < userList.length; j++){
      
         if(appliedFilters[i].category === 'species'){
             if(appliedFilters[i].name ===  userList[j].species){
                 sortedUserList = userList.filter(list => list.species === appliedFilters[i].name ); 
             }
         }

         if(appliedFilters[i].category === 'gender'){
           if(appliedFilters[i].name ===  userList[j].gender){
             sortedUserList = userList.filter(list => list.gender === appliedFilters[i].name );
           }
         }

         if(appliedFilters[i].category === 'origin'){
           if(appliedFilters[i].name ===  userList[j].origin.name){
             sortedUserList = userList.filter(list => list.origin.name === appliedFilters[i].name );
           }
         }
     }    
   }  
   
   if(appliedFilters.length > 0){
     this.setState({userList:sortedUserList})
   }else{
     this.getUsers();
   }   

 }


// submit user search

 handleSubmit = () =>{
  const userName = this.state.userName;
  if(userName){
    const permanentUserList = [...this.state.permanentUserList];
    const sortedUserList = permanentUserList.filter( val => val.name.toLowerCase().includes(userName.toLowerCase()));
    this.setState({userList:sortedUserList});
  }else{
    this.getUsers();
  }

 }


  render() {
    const {userList,appliedFilters} = this.state;
    return (
        <React.Fragment>
         
             <div className ="row">
                <div className="col-sm-3 filtersSection">
                  <h3>Filters</h3>
                  
                  <div className="filter-cover">
                       <h6>Species</h6>
                      <div className="filter clearfix"><input name="Human" value="species" onChange={this.handleFilterChange} type="checkbox"/> <span>Human</span></div>
                      <div className="filter clearfix"><input name="Alien" value="species" onChange={this.handleFilterChange} type="checkbox"/> <span>Alien</span></div>
                  </div>

                  <div className="filter-cover">
                      <h6>Gender</h6>
                      <div className="filter clearfix"><input name="Male" value="gender" onChange={this.handleFilterChange} type="checkbox"/> <span>Male</span></div>
                      <div className="filter clearfix"><input name="Female" value="gender" onChange={this.handleFilterChange} type="checkbox"/> <span>Female</span></div>
                  </div>

                  <div className="filter-cover">
                      <h6>Origin</h6>
                      <div className="filter clearfix"><input name="Earth (C-137)" value="origin" onChange={this.handleFilterChange} type="checkbox"/> <span>Earth (C-137)</span></div>
                      <div className="filter clearfix"><input name="Earth (Replacement Dimension)" value="origin" onChange={this.handleFilterChange} type="checkbox"/> <span>Earth (Replacement Dimension)</span></div>
                      <div className="filter clearfix"><input name="Abadango" value="origin" onChange={this.handleFilterChange} type="checkbox"/> <span>Abadango</span></div>
                      <div className="filter clearfix"><input name="unknown" value="origin" onChange={this.handleFilterChange} type="checkbox"/> <span>unknown</span></div>
                  </div>

                </div>

                <div className="col-sm-9 usersCardSection">

                   <div className="user-search-container">
                    
                   {appliedFilters.length > 0 && 
                    <div className="row">
                      <div className="col-sm-12 tags-cover">
                          <h5 className="tags-head">Selected Filters</h5>
                          <div>
                            {appliedFilters.map(list => (
                               <div className="tags" key={list.name}>{list.name}</div>
                            ))}
                          </div>
                      </div>
                    </div>
                       }

                      <div className="row">
                          <div className="col-sm-4">
                            
                              <div className="form-group clearfix">
                                  <input type="text"  onChange={this.handleChange} className="form-control search-input"/>
                                  <button onClick={this.handleSubmit} className="search-button">Search</button>
                              </div>
                             
                            </div> 

                            <div className="col-sm-5"></div>

                             <div className="col-sm-3">
                                <div className="form-group">
                                    <select placeholder="sort By Id"  onChange={this.changeSortOrder} className="form-control">
                                      <option value="Ascending">Ascending</option>
                                      <option value="Decending">Decending</option>
                                    </select>
                                </div>
                             </div>
                          


                      </div>
                   </div>

                     <div className="user-card-container">

                     {userList.length === 0 && 
                      <h4 className="no-user text-center">No User Found</h4>
                     }


                     {userList.map(user => (
                       
                         <div className="user-card" key={user.id}>
                            <div className="user-img">
                                 <div className="img-caption">
                                    <div className="heading">{user.name}</div>
                                    <div className="content">id : {user.id} . {moment(user.created).fromNow()}</div>
                                 </div>
                                 <img src={user.image}/>
                            </div>

                            <div className="user-content">
                                <table className="table user-table">
                                  <tbody>
                                    <tr>
                                      <td className="text-left"><span className="heading">Status</span></td>
                                      <td className="text-right"><span className="txt">{user.status}</span></td>
                                    </tr>
                                    <tr>
                                      <td className="text-left"><span className="heading">Species</span></td>
                                      <td className="text-right"><span className="txt">{user.species}</span></td>
                                    </tr>

                                    <tr>
                                      <td className="text-left"><span className="heading">Gender</span></td>
                                      <td className="text-right"><span className="txt">{user.gender}</span></td>
                                    </tr>

                                    <tr>
                                      <td className="text-left"><span className="heading">Origin</span></td>
                                     <td className="text-right"><span className="txt">{user.origin.name}</span></td>
                                    </tr>

                                    <tr>
                                      <td className="text-left"><span className="heading">Last Location</span></td>
                                      <td className="text-right"><span className="txt">{user.location.name}</span></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                         </div>

                      ))} 

                        
                     </div>
                </div>
             </div>

        </React.Fragment>
    );
  }



}

export default Home;

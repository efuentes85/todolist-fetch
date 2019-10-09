import React from "react";
import { throwStatement, thisExpression } from "@babel/types";

export class ToDoList extends React.Component {
  
    state = {
    toDo: [],
    //  [{"label":"sample task","done":false}]
  };


  getDataFromAPI = () => {
  
    fetch('https://assets.breatheco.de/apis/fake/todos/user/efuentes', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(resp => {
        //   console.log(resp.ok); // will be true if the response is successfull
        //   console.log(resp.status); // the status code = 200 or code = 400 etc.
        //   console.log(resp.text()); // will try return the exact result as string
          return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
      })
      .then(data => {
          //here is were your code should start after the fetch finishes
          console.log(data); //this will print on the console the exact object received from the server
          this.setState({ toDo: data })
          
          
      })
      .catch(error => {
          //error handling
          console.log(error);
      });


    
  }



  setDataFromAPI = () => {
  
    fetch('https://assets.breatheco.de/apis/fake/todos/user/efuentes', {
      method: "PUT",
      body: JSON.stringify(this.state.toDo),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp.ok); // will be true if the response is successfull
        console.log(resp.status); // the status code = 200 or code = 400 etc.
        console.log(resp.text()); // will try return the exact result as string
        return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
    })

    .then(data => {
      //here is were your code should start after the fetch finishes
      let todos = [{"label":"sample task","done":false},{"label":"sample task","done":false},{"label":"sample task","done":false}];
      this.setState({toDo: todos});
  })
      .catch(error => {
      //error handling
      console.log(error);
  });
   
  }


 
  render() {
    return (
      <div className="col-3">
        <div className="text-center">
                              
          {this.state.toDo.map((obj,index) => (
                <li>{obj.label} / {obj.done}</li>

          ))}          
           
     
        </div>
        <button onClick={this.getDataFromAPI}>Cargar data del API</button>
        <button onClick={this.setDataFromAPI}>Enviar data a la API</button>
      </div>
    );
  }
}

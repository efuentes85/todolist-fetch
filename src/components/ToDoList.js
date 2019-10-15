import React from "react";

export class ToDoList extends React.Component {
  state = {
    toDo: [],
    inputText: {}
    //  [{"label":"sample task","done":false}]
  };

  componentDidMount() {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/efuentes", {
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
        this.setState({ toDo: data });
      })
      .catch(error => {
        //error handling
        console.log(error);
      });
  }

  getDataFromAPI = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/efuentes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
      })
      .then(data => {
             this.setState({ toDo: data });
      })
      .catch(error => {
       
        console.log(error);
      });
    };
    
    addDataLocal = (event) => {
      this.setState({ inputText : {
        label:event.target.value, 
        done: false
      }});
    };
    

    deleteElement = (id) => {
      var newArray = this.state.toDo.slice();
      newArray.splice(id, 1);
      this.setState({ ToDoList: newArray });
      this.sendDataAPI(newArray);
    }

    handlerSubmit = event => {
      event.preventDefault();
      var newArray = this.state.toDo.slice(); //copia todo el array
      newArray.push(this.state.inputText);
      this.setState({ toDo: newArray });
      this.sendDataAPI(newArray);
      event.target.reset();
    };


    sendDataAPI = (info) => {
      fetch("https://assets.breatheco.de/apis/fake/todos/user/efuentes", {
      method: "PUT",
      body: JSON.stringify(info),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
      if(resp.ok === true){
        this.getDataFromAPI();
      }     
      return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
    })
    
    .catch(error => {
        //error handling
        console.log(error);
      });
    };
    
    deleteAll = () => {
      fetch("https://assets.breatheco.de/apis/fake/todos/user/efuentes",
       {
        method: "PUT",
        body: JSON.stringify([{ label: "Se borró todo menos esto!", done: false }]),
        headers: {
        "Content-Type": "application/json"
      }
    }) .then(resp => {

      if(resp.ok === true){
        this.getDataFromAPI();
      }
    })
    
    ;
  };


  render() {
    return (
      <div className="col-3">
        <div className="text-center">

        <form onSubmit={this.handlerSubmit}>
						<input onChange={this.addDataLocal} placeholder="Add your task"/>
					</form>


          <ul className="list-group">
          {this.state.toDo.map((obj, index) => (
            <li key={index}>								
								{obj.label} 						
						<span className="close" onClick={() => this.deleteElement(index)}>
								               	&times;								
								</span>
							</li>
						))}
					</ul>         
        </div>
        {/* <button onClick={this.getDataFromAPI}>Cargar data del API</button> */}
        {/* <button onClick={this.addDataLocal}>
          Crear Data Local para enviar
        </button> */}
        <button onClick={this.sendDataAPI}>Enviar data a la API</button>
        <button onClick={this.deleteAll}>Borrar Todo</button>
        <br />
      </div>
    );
  }
}

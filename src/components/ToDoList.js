import React from "react";


export class ToDoList extends React.Component {
  state = {
    toDo: [],
    inputText: {}
    // esto es como esta seteado el objeto en la API  [{"label":"sample task","done":false}]
  };

  componentDidMount() { //aqui se carga la lista antes de hacer el render
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
       this.setState({ toDo: data }); // guardo la data de la API en la toDo list en mi state
      })
      .catch(error => {
        //error handling
        console.log(error);
      });
  }

  getDataFromAPI = () => { //
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
    
    addDataLocal = (event) => { // tomo el valor del input y luego lo seteo en el inputText, le agrego el done
      this.setState({ inputText : {
        label:event.target.value, 
        done: false
      }});
    };
    

    deleteElement = (id) => { // borro el elemento de la lista ocupando la posicion
      var newArray = this.state.toDo.slice();
      newArray.splice(id, 1);
      this.setState({ ToDoList: newArray });
      this.sendDataAPI(newArray); // aqui mando el nuevo array a la API
    }

    handlerSubmit = event => { //aqui agrego el elemento en el inputText en el array
      event.preventDefault();
      var newArray = this.state.toDo.slice(); //copia todo el array
      newArray.push(this.state.inputText);
      this.setState({ toDo: newArray });
      this.sendDataAPI(newArray); // mando el nuevo array a la API
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
    
    deleteAll = () => { // Este es una funcion que cree para borrar todos menos un elemento, si se mandaba asi se borra el usuario
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
            <li className="lista" key={index}>								
								{obj.label} 		
             {/* <i className="far fa-times-circle" onClick={() => this.deleteElement(index)}></i> */}
						<a href="#" className="close" onClick={() => this.deleteElement(index)}>
								               	&times;								
								</a>
							</li>
						))}
					</ul>         
        </div>
        {/* <button onClick={this.getDataFromAPI}>Cargar data del API</button> */}
        {/* <button onClick={this.addDataLocal}>
          Crear Data Local para enviar
        </button> */}
        {/* <button onClick={this.sendDataAPI}>Enviar data a la API</button> */}
        <button onClick={this.deleteAll}>Borrar Todo</button>
        <br />
      </div>
    );
  }
}

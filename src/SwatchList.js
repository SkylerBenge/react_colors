import React, { Component } from "react";
import FlipMove from 'react-flip-move';

class SwatchItems extends Component {
  constructor(props) {
    super(props);

    this.createTasks = this.createTasks.bind(this);
  }
  
  delete(key) {
    this.props.delete(key);
  }
 
  createTasks(item) {
    var itemStyle = {
      backgroundColor: item.text
    };

    return <li onClick={() =>this.delete(item.key)}
             key={item.key}><div style={itemStyle}></div><p>{item.text}</p></li>
  }
 
  render() {
    var swatchEntries = this.props.entries;
    var listItems = swatchEntries.map(this.createTasks);
 
    return (
      <ul className="theList">
        <FlipMove duration={250} easing="ease-out">
          {listItems}
        </FlipMove>
      </ul>
    );
  }
};

class SwatchList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: "",
      bgColor: "white",
      items: []
    };

    this.colorValue = this.colorValue.bind(this); 
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  colorValue(e) {
    this.setState({
      color: e.target.value
    });
  }
    
  addItem(e) {

    var itemArray = this.state.items;

    if (this._inputElement.value !== "") {
      itemArray.unshift({
        text: this._inputElement.value,
        key: Date.now()
      });

      this.setState({
        items: itemArray,
        bgColor: this.state.color
      });

      this._inputElement.value = "";
    }

    console.log(itemArray);
    e.preventDefault();
  }  
  
  deleteItem(key) {
    var filteredItems = this.state.items.filter(function(item) {
      return (item.key !== key);
    });

    this.setState({
      items: filteredItems
    });
  }
  
  render() {
    var squareStyle = {
      backgroundColor: this.state.bgColor
    };

    return (
      <div className="swatchListMain">
        <div>
          <div style={squareStyle} className="colorSquare"></div>
          <form onSubmit={this.addItem}>
            <input onChange={this.colorValue} ref={(a) => this._inputElement = a} placeholder="Add Your Color">
            </input>
            <button type="submit">add</button>
          </form>    
        </div>

        <div>     
          <SwatchItems entries={this.state.items} 
                     delete={this.deleteItem} />
        </div>
      </div>

    );
  }
}

export default SwatchList;
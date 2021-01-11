import React, { Component } from "react";

class counter extends Component {
  // state = {
  //     count : this.props.counter.value,
  //     tags : [ "tag1", "tag2" ,"tag3"]
  // }

  //   renderTags () {
  //       if (this.state.tags.length===0) return <p>There are no Tags!</p>

  //       return <ul>{this.state.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
  //   }

  // constructor (){
  //   super()
  //   this.countHandler = this.countHandler.bind(this)
  // }

  // countHandler = (product) => {
  //     // console.log("increment",this)
  //     // console.log(product);
  //     this.setState({ count : this.state.count +1 });
  // }

  // doHandlerIncrement = () => {
  //   this.countHandler({id:1})

  // }

  render() {
    return (
      <div className="row">
        <div className="col-1">
          <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        </div>
        <div className="col">
          <button
            // onClick={(product)=>this.countHandler(product)}
            onClick={() => this.props.onIncrement(this.props.counter)}
            className="btn btn-secondary btn-sm"
          >
            +
          </button>

          <button
            onClick={() => this.props.onDecrement(this.props.counter)}
            className="btn btn-secondary btn-sm m-2"
            disabled={this.props.counter.value === 0 ? "disabled" : ""}
          >
            -
          </button>
          <button
            onClick={() => this.props.onDelete(this.props.counter.id)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        </div>

        {/* {this.state.tags.length===0 && "Please add Tags"}
        {this.renderTags()} */}
      </div>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? "Zero" : value;
  }
}

export default counter;

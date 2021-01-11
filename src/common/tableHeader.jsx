import React, { Component } from "react";

class TableHeader extends Component {
 
    raiseSort = (path) => {
    const sortCoulmn = { ...this.props.sortCoulmn };
    if (sortCoulmn.path === path) {
      sortCoulmn.order = sortCoulmn.order === "asc" ? "desc" : "asc";
    } else {
      sortCoulmn.path = path;
      sortCoulmn.order = "asc";
    }
    this.props.onSort(sortCoulmn);
  };

  renderSortIcon = (column) => {
    const {sortCoulmn} =this.props;
    if(column.path !== sortCoulmn.path ) return null;
    if (sortCoulmn.order === "asc") return <i className="fa fa-sort-asc"></i> 
    return <i className="fa fa-sort-desc"></i>
  }
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th className={"clickable"}
            key={column.path || column.key} 
            onClick={() => this.raiseSort(column.path)}>{column.label}
            {this.renderSortIcon(column)} </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;

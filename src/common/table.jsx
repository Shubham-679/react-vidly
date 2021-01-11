import React from 'react';
import TableHeader  from "./tableHeader" ;
import TableBody  from "./tableBody" ;

const Table = ({columns, sortCoulmn, onSort, data}) => {
    
    return (  
        <table className="table">
      <TableHeader 
      columns={columns} 
      sortCoulmn={sortCoulmn}
      onSort={onSort} />

      <TableBody data={data} columns={columns} />
  </table>
    );
}
 
export default Table;
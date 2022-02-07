import React, { useMemo } from "react";
import { COLUMNS } from "./Columns";
import MOCK_DATA from "./MOCK_DATA.json";
import { useBlockLayout, useTable, useSticky } from "react-table";
import { Styles } from "./TableStyles";

const StickyTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useBlockLayout,
    useSticky
  );

  const { getTableProps, getTableBodyProps, rows, prepareRow, headerGroups } =
    tableInstance;

  const firstPage = rows.slice(0, 20);

  return (
    <Styles>
      <div
        {...getTableProps()}
        className='table sticky'
        style={{ width: 800, height: 600 }}>
        <div className='header'>
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()} className='tr'>
              {headerGroup.headers.map((column) => (
                <div {...column.getHeaderProps()} className='th'>
                  {column.render("Header")}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div {...getTableBodyProps()} className='body'>
          {firstPage.map((row) => {
            prepareRow(row);
            return (
              <div {...row.getRowProps()} className='tr'>
                {row.cells.map((cell) => (
                  <div {...cell.getCellProps()} className='td'>
                    {cell.render("Cell")}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </Styles>
  );
};

export default StickyTable;

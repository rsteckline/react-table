import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './columns'
import './table.css'

export const BasicTable = () => {

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])

    const tableInstance = useTable({
        columns: columns, /* can be simplified to just 'columns' due to es6 shorthand syntax */
        data: data,

    })

    const {
        /* these are basically functions and arrays that the useTable hooks has given us to enable easy table creation. we need to use all of these w HTML for react table to work as intended. */
        getTableProps, /* fxn needed to destructure the table tag*/
        getTableBodyProps, /* fxn needed to destructure the tbody tags */
        headerGroups, /* contains column heading info that belongs inside the thead tag of table. it's an array that requires map method to render the jsx for each header group, similar to how you would render list in any other components*/
        rows,
        prepareRow,
    } = tableInstance

    return (
        <table {...getTableProps()}>
            <thead>
                {
                    headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                        </tr>
                    ))}
            </thead>
            <tbody  {...getTableBodyProps()}>
                {
                    rows.map((row) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}



// return (
//     <table {...getTableProps()}>
//         <thead> /* table header */
//             <tr> /* tr tag to specify row  */
//                 <th> /* in the header, the data is wrapped with the th tag */

//                 </th>
//             </tr>
//         </thead>
//         <tbody  {...getTableBodyProps()}> /* table body */
//             <tr> /* tr tag to specify row  */
//                 <td> /* in the body, the data is wrapped with the td tag  */

//                 </td>
//             </tr>
//         </tbody>
//     </table>
// )
// }

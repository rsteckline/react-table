import React, { useMemo } from 'react'
import { useTable, useSortBy } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { GROUPED_COLUMNS } from './columns'
import './table.css'

export const SortedTable = () => {
    const columns = useMemo(() => GROUPED_COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])



    const {
        /* these are basically functions and arrays that the useTable hooks has given us to enable easy table creation. we need to use all of these w HTML for react table to work as intended. */

        getTableProps, /* fxn needed to destructure the table tag*/
        getTableBodyProps, /* fxn needed to destructure the tbody tags */
        headerGroups, /* contains column heading info that belongs inside the thead tag of table. it's an array that requires map method to render the jsx for each header group, similar to how you would render list in any other components*/
        footerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns: columns, /* can be simplified to just 'columns' due to es6 shorthand syntax */
        data: data,
    },
        useSortBy) /* adds sorting feature to our table instance */

    return (
        <table {...getTableProps()}>
            <thead> { /* table header */}
                {
                    headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}> { /* tr tag to specify row  */}
                            {
                                headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted ? (column.isSortedDesc ? '⬆️' : '⬇️') : ''}
                                        </span>
                                    </th> /* in the header, the data is wrapped with the th tag */
                                ))}
                        </tr>
                    ))}
            </thead>
            <tbody  {...getTableBodyProps()}> { /* table body */}
                {
                    rows.map((row) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}> { /* tr tag to specify row  */}
                                {row.cells.map((cell) => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td> /* in the body, the data is wrapped with the td tag  */
                                })}
                            </tr>
                        )
                    })
                }
            </tbody>
            <tfoot>
                {
                    footerGroups.map(footerGroup => (
                        <tr {...footerGroup.getFooterGroupProps()}>
                            {
                                footerGroup.headers.map(column => (
                                    <td {...column.getFooterProps}>
                                        {
                                            column.render('Footer')
                                        }
                                    </td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tfoot>
        </table>
    )
}

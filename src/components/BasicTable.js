import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './columns'

export const BasicTable = () => {

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])

    const tableInstance = useTable({
        columns: columns, /* can be simplified to just 'columns' due to es6 shorthand syntax */
        data: data,

    })
    return (
        <table>
            <thead> /* table header */
                <tr> /* tr tag to specify row  */
                    <th> /* in the header, the data is wrapped with the th tag */

                    </th>
                </tr>
            </thead>
            <tbody> /* table body */
                <tr> /* tr tag to specify row  */
                    <td> /* in the body, the data is wrapped with the td tag  */

                    </td>
                </tr>
            </tbody>
        </table>
    )
}

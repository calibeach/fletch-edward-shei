import { FunctionComponent, MouseEvent, SetStateAction, Dispatch } from "react"
import { insertDot } from "../helpers/insertDot"

type TableRowProps = {
    tableContent: string[];
    toggleDialog: Dispatch<SetStateAction<boolean>>;
    tableCellContent: Dispatch<SetStateAction<string>>;
}

const TableRow:FunctionComponent<TableRowProps> = ({tableContent, toggleDialog, tableCellContent}) => {
    
    const handleClick = (target: HTMLTableCellElement) => {
        const title = target.title;
        const tableHeader = target.headers;

        // we return out of the function if it is a bytes table-cell
        if (tableHeader === "bytes") {
            return
        }

        // we use the title attribute to send set the appropriate data to the tableCellContent piece of state
        tableCellContent(title)
        toggleDialog(true)
    }

    let className = "table-cell ";
    let header = "address";

    return (
        <tr className="table-row">
            {tableContent.map((tableData, index) => {
                const modifiedTableData = insertDot(tableData)
                
                if (!modifiedTableData.includes(".")) {
                    className += "bytes";
                    header = "bytes";
                }

                return (
                    <td title={tableData} onClick={(e: MouseEvent<HTMLTableCellElement>) => handleClick(e.currentTarget)} headers={header} id="table-cell" className={className} key={index}>{modifiedTableData}</td>
                )
            })}
        </tr>
    )
}

export { TableRow }
export default TableRow
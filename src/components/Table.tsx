import { FunctionComponent, useEffect, useState } from 'react';
import { DataType } from '../types/data';
import { fetchData } from '../api/fetchData';
import { TableRow } from "./TableRow"
import DialogModal from "../components/DialogModal";
import { insertDot } from '../helpers/insertDot';
import { useLocation } from 'react-router-dom';
import { fetchFilteredData } from '../api/fetchFilteredData';
import History from './History';

const Table: FunctionComponent = () => {
    //TODO: Refactor state and utilize useReducer
    const [tableData, setTableData] = useState<DataType[]>([] as DataType[])
    const [isLoading, setIsLoading] = useState(true)
    const [tableHeaders, setTableHeaders] = useState<string[]>([] as string[])
    const [isOpened, setIsOpened] = useState(false)
    const [tableCellContent, setTableCellContent] = useState("")
    const [modifiedTableCellContent, setModifiedTableCellContent] = useState("")
    const [searchString, setSearchString] = useState("")
    const [hasHistory, setHasHistory] = useState(false)

    const location = useLocation()

    //TODO: Refactor this utilizing React Query's automatic refresh utilizing Query Keys
    //TODO:  Also utilize React Query selectors to reduce API calls
    // we detect if the web address has changed, and fetch the appropriate data
    useEffect(() => {
        async function fetchDataFromURL() {
            const searchString = location.search.slice(1)
            const myData = await fetchFilteredData(`${searchString}`)
            setTableData(myData)
            setSearchString(searchString)
            const tableHeaders = Object.keys(myData[0].result)
            setTableHeaders(tableHeaders)
            setIsLoading(false)
            setHasHistory(true)
        }

        if (location.pathname === "/") {
            fetchData()
                .then((items) => {
                    setTableData(items)
                    setIsLoading(false)
                    const tableHeaders = Object.keys(items[0].result)
                    setTableHeaders(tableHeaders)

                })
        } else {
            fetchDataFromURL()
        }
    }, [location])


    // modifies the ip address for view in the Dialog Modal
    useEffect(() => {
        const modifiedTableCellContent = insertDot(tableCellContent)
        setModifiedTableCellContent(modifiedTableCellContent)
    }, [tableCellContent])

    return (
        <div>
            <DialogModal
                title="Dialog modal example"
                isOpened={isOpened}
                onClose={() => setIsOpened(false)}
                tableCellContent={tableCellContent}
            >
                <p>Would you like to see traffic <strong>To</strong> or <strong>From</strong> {modifiedTableCellContent}?</p>
            </DialogModal>
            <div>
                <History searchString={searchString} />
            </div>
            {isLoading
                ? <div className="loading">Loading...</div>
                :
                <table>
                    <thead>
                        <tr className="table-head">
                            {tableHeaders.map((header, index) => {
                                const modifiedHeader = insertDot(header)
                                return (
                                    <th className="table-header-cell" key={index}>{modifiedHeader}</th>

                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        <div className="table-body">
                            {tableData.map((dataObject, index) => {
                                const tableRow = Object.values(dataObject.result)
                                return (
                                    <TableRow tableContent={tableRow} toggleDialog={setIsOpened} tableCellContent={setTableCellContent} key={index} />
                                )
                            })}
                        </div>
                    </tbody>
                </table>
            }
        </div>
    )
}

export default Table
export { Table }
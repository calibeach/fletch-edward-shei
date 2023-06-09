import { FunctionComponent, useState, useEffect } from "react";
import { insertDot } from "../helpers/insertDot";
import { useLocation, useNavigate } from "react-router-dom";

type HistoryType = {
    searchString: string
}

const History:FunctionComponent<HistoryType> = ({searchString}) => {
    const location = useLocation()
    const navigate = useNavigate()

    const [history, setHistory] = useState<string[]>([] as string[])
    const [hasHistory, setHasHistory] = useState(false)

    const createHistory = (searchString:string) => {
    const searchParams = new URLSearchParams(searchString)

    // if there are no searchParams, then we simply return out of this function
    if (searchParams.size === 0) {
        return
    } else {
        // we clear any current history to avoid repetition
        setHistory([])
        setHasHistory(true)
        
        // we loop through the entries and append them to the history state
        for (const [key, value] of searchParams.entries()) {
            if (key === "All_Traffic2esrc") {
                const valueWithDot = insertDot(value)
                setHistory(history => [...history, `Displaying All Web Traffic from ${valueWithDot}`])
                setHasHistory(true)
                } else {
                    const valueWithDot = insertDot(value)
                    setHistory(history => [...history, `Displaying All Web Traffic to ${valueWithDot}`])
                }
            }
            setHasHistory(true)
        }
    }

    const goBack = () => {
        navigate(-1)
    }

    const goHome = () => {
        navigate("/")
    }

    useEffect(() => {
        createHistory(searchString)
    }, [searchString])

    useEffect(() => {
        // this is to ensure that history is cleared when the back button is hit
        if (window.location.pathname === "/") {
            setHistory([])
            setHasHistory(false)
        }
    }, [location])

    return (
        <div className="filters">
            <h2>Filters</h2>
                    {hasHistory ? 
                        <div className="filters-container">
                            <div className="filters-list">
                                {history.map((item, index) => {
                                    return (
                                        <div className="filter" key={index}>{item}</div>
                                        )
                                    })}
                            </div>
                            <div className="button-list">
                                <button className="button" onClick={goBack}>Back</button>
                                <button className="button" onClick={goHome}>Home</button>
                            </div>
                        </div> : 
                        <p>Please click on a web address to filter</p>
                    }
 
            
        </div>
    )
}

export { History }
export default History
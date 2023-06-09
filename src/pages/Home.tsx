import { FunctionComponent, useEffect, useState } from "react";
import Table from "../components/Table";
import Header from "../components/Header";


const Home: FunctionComponent = () => {

    return (
        <div className="home">
            <Header />
            <Table />
        </div>
    )
}

export default Home
export { Home }
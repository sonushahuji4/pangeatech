import { useState } from "react";

interface Props{
    revenueTypes : any;
    selectRevenueType: any;
    setSelectRevenueType: any;
}
const Navbar = ({revenueTypes,selectRevenueType,setSelectRevenueType}: Props) => {
    const getDropDown = () => {
        return (
                <select
                    id={"revenueType"}
                    name={"revenueType"}
                    defaultValue={selectRevenueType}
                    onChange={e => setSelectRevenueType(e.target.value)}>
                    {revenueTypes.map((revenue: string) => (
                        <option key={revenue} value={revenue}>{revenue}</option>
                    ))}
                </select>
        )
    }

    return(
        <div className="navbar-container">
            <div className="revenue-drop-down">{getDropDown()}</div>
            <div className="name-attribute">
            {"Hi, there!"}</div>
        </div>
    )
}

export default Navbar;
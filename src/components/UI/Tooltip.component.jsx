import React from 'react'
import ReactTooltip from "react-tooltip"

const Tooltip = ({ id, togglerElement, tooltipContent, forCalendar }) => {
    return (
        <>
            <span data-tip data-for={id} className={forCalendar && 'tooltip-hoverable-item'}>
                {togglerElement}
            </span>
            <ReactTooltip
                effect="solid"
                delayHide={200}
                backgroundColor="#edf2f7"
                border={true}
                borderColor="#cbd5e0"
                textColor="#333"
                id={id}
                type="info">
                {tooltipContent}
            </ReactTooltip>
        </>
    )
}

export default Tooltip
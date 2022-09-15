import React from "react";
import SingleStatusCard from "./SingleStatusCard";
import {FaEdit, FaRegWindowClose, FaCreativeCommonsNc} from 'react-icons/fa';
import FcBarChart from 'react-icons/fc';
import MdBlock from 'react-icons/md';

const StatusCard = ({ ticketsCount }) => {

    const cardsArr = [
        {
            count: ticketsCount.open,
            statusName: "Open",
            icon: <FaEdit className="text-primary"/>,
            colorScheme: "primary",
            textColor: "red",
            pathColor: "blue",
        },
        {
            count: ticketsCount.progress,
            statusName: "Progress",
            icon: <FaCreativeCommonsNc className="text-warning"/>,
            colorScheme: "warning",
            textColor: "red",
            pathColor: "darkgoldenrod",
        },
        {
            count: ticketsCount.closed,
            statusName: "Closed",
            icon: <FaRegWindowClose className="text-success"/>,
            colorScheme: "success",
            textColor: "red",
            pathColor: "lightGreen",
        },
        {
            count: ticketsCount.blocked,
            statusName: "Blocked",
            icon: <FaCreativeCommonsNc className="text-secondary"/>,
            colorScheme: "secondary",
            textColor: "red",
            pathColor: "grey",
        },
    ];

    return (
        <div className='row my-5 mx-2 text-center'>
            {cardsArr.map((card, i) => {
                const {
                    count,
                    statusName,
                    icon,
                    colorScheme,
                    textColor,
                    pathColor,
                } = card;

                return (
                    <SingleStatusCard
                        count={count}
                        key={i}
                        statusName={statusName}
                        icon={icon}
                        colorScheme={colorScheme}
                        textColor={textColor}
                        pathColor={pathColor}

                    />
                );
            })}
        </div>
    );
};

export default StatusCard;
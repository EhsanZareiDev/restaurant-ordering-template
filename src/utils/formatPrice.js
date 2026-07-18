import React from "react";
// Icon
import { MinusIcon } from "@heroicons/react/20/solid";

export const formatPrice = ({price , isMinus = true , isSmall = false}) => {
    const priceNum = Number(price);
    if (isMinus && priceNum === 0) {
        const className = `${!isSmall ? 'w-6 h-6' : 'w-4 h-3'}`;
        return React.createElement(MinusIcon, { className });
    } else {
        return "$" + Math.abs(priceNum).toFixed(2);
    }
}
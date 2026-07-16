
import { ORDER_STATUS } from "./orderStatus";

import {HiOutlineCheckBadge} from "react-icons/hi2";

import { IoRestaurantOutline } from "react-icons/io5";
import { TbChefHat } from "react-icons/tb";

export const ORDER_PROGRESS = [
  {
    id: 1,
    status: ORDER_STATUS.CONFIRMED,
    title: "Confirmed",
    description: "Your order has been confirmed.",
    icon: HiOutlineCheckBadge,
  },

  {
    id: 2,
    status: ORDER_STATUS.PREPARING,
    title: "Preparing",
    description: "Our kitchen is preparing your order.",
    icon: TbChefHat,
  },

  {
    id: 3,
    status: ORDER_STATUS.ASSIGNED,
    title: "Assigned",
    description: "Your order has been assigned.",
    icon: null,
  },

  {
    id: 4,
    status: ORDER_STATUS.COMPLETED,
    title: "Completed",
    description: "Enjoy your meal.",
    icon: IoRestaurantOutline,
  },
];
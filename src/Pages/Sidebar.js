import React from 'react';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { IoIosCash } from "react-icons/io";
import { FaMoneyCheckAlt } from "react-icons/fa";
import DoubleArrowSharpIcon from '@material-ui/icons/DoubleArrowSharp';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

export const Sidebar=[
    {
        title:"Credit/Debit Cards",
        icon:<CreditCardIcon />
    },
    {
        title:"Wallets",
        icon:<AccountBalanceWalletIcon />
    },
    {
        title:"Credit",
        icon:<FaMoneyCheckAlt />
    },
    {
        title:"NetBanking",
        icon:<AccountBalanceIcon />
    },
    {
        title:"UPI",
        icon:<DoubleArrowSharpIcon />
    },
    {
        title:"Food Cards",
        icon:<CreditCardIcon />
    },
    {
        title:"Pay on Delivery",
        icon:<IoIosCash/>
    }
]


import {
    MdAccountBalance,
    MdOutlineCasino,
    MdGroups,
    MdGroup,
    MdStarRate,
    MdRepeatOne,
} from 'react-icons/md';
import { FaChessKnight, FaGift, FaPeopleCarry } from 'react-icons/fa';
import { GiPistolGun, GiPokerHand } from 'react-icons/gi';
import { IconType, IconBase } from 'react-icons/lib';
import React from 'react';

export const icons: IconType[] = [
           MdAccountBalance,
           MdOutlineCasino,
           MdGroups,
           MdGroup,
           MdStarRate,
           MdRepeatOne,
           FaChessKnight,
           FaGift,
           FaPeopleCarry,
           GiPistolGun,
           GiPokerHand
    ]

export function findIcon(iconName: string){
    const icon = icons.find(obj => {return obj.name === iconName});
    if(icon){
        return React.createElement(icon, IconBase.prototype)
    }
}    
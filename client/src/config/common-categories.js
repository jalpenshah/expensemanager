import {
  IoFastFoodOutline,
  IoMapOutline,
  IoShirtOutline,
} from 'react-icons/io5';
import { IoMdGift } from 'react-icons/io';
import { BiGasPump, BiBuildingHouse } from 'react-icons/bi';
import { MdOutlinePower, MdOutlineLocalGroceryStore } from 'react-icons/md';
import { TbReceiptTax } from 'react-icons/tb';
import { SiNetflix } from 'react-icons/si';

export const commonCategories = [
  {
    title: 'Food',
    icon: IoFastFoodOutline,
    enabled: true,
  },
  {
    title: 'Fuel',
    icon: BiGasPump,
    enabled: true,
  },
  {
    title: 'Clothes',
    icon: IoShirtOutline,
    enabled: true,
  },
  {
    title: 'Gift',
    icon: IoMdGift,
  },
  {
    title: 'Utility',
    icon: MdOutlinePower,
    enabled: true,
  },
  {
    title: 'TV',
    icon: SiNetflix,
    enabled: true,
  },
  {
    title: 'Rent',
    icon: BiBuildingHouse,
    enabled: true,
  },
  {
    title: 'Grossary',
    icon: MdOutlineLocalGroceryStore,
    enabled: true,
  },
  {
    title: 'Counsil',
    icon: TbReceiptTax,
    enabled: true,
  },
  {
    title: 'Travel',
    icon: IoMapOutline,
  },
];

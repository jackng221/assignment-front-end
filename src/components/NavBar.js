import { Menu } from 'antd'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import UserContext from '../contexts/user'

function NavBar() {
  const context = useContext(UserContext);
  const [currentMenu, setCurrentMenu] = React.useState(publicMenu);
  const [currentItem, setCurrentItem] = React.useState('home');

  // switch (context.user) {
  //   case "user":
  //     setCurrentMenu(userMenu);
  //     break;
  //   case "staff":
  //     setCurrentMenu(staffMenu);
  //     break;
  //   default:
  //     setCurrentMenu(publicMenu);
  //     break;
  // }
  const onClick = (e) => {
    switch (e.key) {
      case "logout":
        context.logout();
        break;
      default:
        setCurrentItem(e.key);
        break;
    }
  }

  return (
    <Menu onClick={onClick} selectedKeys={[currentItem]} mode="horizontal" items={currentMenu} />
  )
}
const publicMenu = [
  {
    label: (
      <Link to={"/"}>Home</Link>
    ),
    key: 'home',
  },
  {
    label: (
      <Link to={"/dashboard"}>Dashboard</Link>
    ),
    key: 'dashboard'
  },
  {
    label: (
      <Link to={"/login"}>Login</Link>
    ),
    key: 'login'
  },
  {
    label: (
      <Link to={"/register"}>Register</Link>
    ),
    key: 'register'
  },
  {
    label: 'Public user',
    key: 'publicUser',
    disabled: true,
  },
];
const userMenu = [
  {
    label: (
      <Link to={"/home"}>Home</Link>
    ),
    key: 'home',
  },
  {
    label: (
      <Link to={"/dashboard"}>Dashboard</Link>
    ),
    key: 'dashboard'
  },
  {
    label: (
      <Link to={"/favourite"}>Favourite</Link>
    ),
    key: 'favourite'
  },
  {
    label: (
      <Link to={"/"}>Log out</Link>
    ),
    key: 'logout'
  },
  {
    label: 'Registered user',
    key: 'registeredUser',
    disabled: true,
  },
];
const staffMenu = [
  {
    label: (
      <Link to={"/home"}>Home</Link>
    ),
    key: 'home',
  },
  {
    label: (
      <Link to={"/dashboard"}>Dashboard</Link>
    ),
    key: 'dashboard'
  },
  {
    label: (
      <Link to={"/managedogs"}>Manage dogs</Link>
    ),
    key: 'managedogs'
  },
  {
    label: (
      <Link to={"/"}>Log out</Link>
    ),
    key: 'logout'
  },
  {
    label: 'Staff user',
    key: 'staffUser',
    disabled: true,
  },
];

export default NavBar
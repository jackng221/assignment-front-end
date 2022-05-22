import { Menu } from 'antd'
import React, { useContext } from 'react'
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
    label: 'Home',
    key: 'home',
  },
  {
    label: 'Dashboard',
    key: 'dashboard'
  },
  {
    label: 'Login',
    key: 'login'
  },
  {
    label: 'Register',
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
    label: 'Home',
    key: 'home',
  },
  {
    label: 'Dashboard',
    key: 'dashboard'
  },
  {
    label: 'Favourite',
    key: 'favourite'
  },
  {
    label: 'Log out',
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
    label: 'Home',
    key: 'home',
  },
  {
    label: 'Dashboard',
    key: 'dashboard'
  },
  {
    label: 'Create dog entry',
    key: 'createDogEntry'
  },
  {
    label: 'Log out',
    key: 'logout'
  },
  {
    label: 'Staff user',
    key: 'staffUser',
    disabled: true,
  },
];

export default NavBar
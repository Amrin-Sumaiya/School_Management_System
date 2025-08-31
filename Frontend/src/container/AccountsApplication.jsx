import AccountsDashboardScreen from "../screen/AccountsDashboardScreen";
import All_Students from "../screen/All_Students";
import NotFoundScreen from "../screen/NotFoundScreen";
import AssignRoutes from "./AssignRoutes";


const routes = [
  {
    path: '/',
    components: <AccountsDashboardScreen />,
  },
  {
    path: '/student-list',
    components: <All_Students />,
  },

    {
    path: '*',
    components: <NotFoundScreen />,
  },
];

const AccountsApplication = () => {
  return <AssignRoutes route={routes} />;
};

export default AccountsApplication;





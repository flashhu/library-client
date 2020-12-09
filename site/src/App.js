import { Suspense, lazy } from 'react';
import { Switch, Route, HashRouter as Router } from 'react-router-dom';
import { observer } from 'mobx-react';
import Login from '@page/login';
import Register from '@page/register';
import GuardedRoute from '@component/GuardedRoute';
import Layout from '@component/Layout';
import { useUserStore } from '@hooks/useStore';

const Search = lazy(() => import('@page/search'));
const Return = lazy(() => import('@page/return'));
const Borrow = lazy(() => import('@page/borrow'));
const BookHistory = lazy(() => import('@page/bookHistory'));
const ReserveHistory = lazy(() => import('@page/reserveHistory'));
const NotFound = lazy(() => import('@page/notFound'));

const SuspenseWrapper = ({ children }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {children}
    </Suspense>
  )
}

function App() {
  const userStore = useUserStore();
  console.log("isAutheticated: ", !!userStore.user)

  return (
    <Router>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/' render={() => (
          <Layout>
            <SuspenseWrapper>
              <Switch>
                <Route path='/' exact component={Search} />
                <GuardedRoute path='/borrow' exact component={Borrow} auth={!!userStore.user} />
                <GuardedRoute path='/return' exact component={Return} auth={!!userStore.user} />
                <GuardedRoute path='/history/book' exact component={BookHistory} auth={!!userStore.user} />
                <GuardedRoute path='/history/reserve' exact component={ReserveHistory} auth={!!userStore.user} />
                <Route component={NotFound} />
              </Switch>
            </SuspenseWrapper>
          </Layout>
        )} />
      </Switch>
    </Router>
  );
}

export default observer(App);
import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { Home } from './Home';
import { UserProfileList } from './userprofile/UserProfileList';
import { UserProfileDetails } from './userprofile/UserProfileDetails';

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Home />
            </AuthorizedRoute>
          }
        />
        <Route path='userprofiles'>
          <Route
            index
            element={<AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
              <UserProfileList />
            </AuthorizedRoute>} />
          <Route
            path=':userId'
            element={<AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}><UserProfileDetails /></AuthorizedRoute>} />
        </Route>

        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      </Route>
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
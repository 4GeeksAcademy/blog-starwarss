import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { Favorites } from "./pages/Favorites";

export const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
          <Route path="/" element={<Home />} />
          {/* <Route path="/single/:theId" element={<Single />} />  */}
          <Route path="/demo" element={<Demo />} /> 
          <Route path="/:type/:uid" element={<Single />} />
          <Route path="/favorites" element={<Favorites />} />
      </Route>
  )
);

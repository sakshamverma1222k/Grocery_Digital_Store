import React from "react";
import { Switch, Route } from "react-router-dom";
import HomeScreen from "../screen/home";
import Login from "../screen/Login";
import SellerScreen from "../screen/seller";
import CatalogScreen from "../screen/catalog";
import CategoryScreen from "../screen/Category";
import ViewCategoryScreen from "../screen/viewCategory";
import viewCatalog from "../screen/viewCatalog";
import OrderScreen from "../screen/order";
import CustomerScreen from "../screen/customer";
import OrderDetailsScreen from "../screen/orderDetails";
import UCatalogScreen from "../screen/updateCatalog";
import UpdateOrderAction from "../screen/UpdateOrderAction";
import viewSellerScreen from "../screen/viewSeller";
export const MainRoutes = () => (
  <Switch>
    <Route exact path="/" component={HomeScreen} />
    <Route exact path="/logined" component={HomeScreen} />
    <Route exact path="/home" component={Login} />
    <Route exact path="/seller" component={SellerScreen} />
    <Route exact path="/catalog" component={CatalogScreen} />
    <Route exact path="/category" component={CategoryScreen} />
    <Route exact path="/viewCategory" component={ViewCategoryScreen} />
    <Route exact path="/viewUCatalog" component={UCatalogScreen} />
    {/* <Route exact path='/UpdateCatalog' component={CatalogScreen} /> */}
    <Route exact path="/viewCatalog" component={viewCatalog} />
    <Route exact path="/order" component={OrderScreen} />
    <Route exact path="/customer" component={CustomerScreen} />
    <Route exact path="/viewSeller" component={viewSellerScreen} />
    <Route exact path="/orderDetails" component={OrderDetailsScreen} />
    <Route exact path="/orderUpdate" component={UpdateOrderAction} />
  </Switch>
);

export default MainRoutes;
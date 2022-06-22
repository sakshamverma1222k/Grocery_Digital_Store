
import { getAllUser, userSaveAction, userAddressSaveAction, userAddressGetAction, userUpdateAction, verifyAction, loginAction, otpAction, verifyeAction, adminAddNewSeller, showAllSellers, adminSellerLogin } from "./controller/UserSaveAction";
import { orderUpdateAction, saveOrderAction, getAllOrderAction, getOrderAction } from "./controller/OrderController";
import { getTodayStat, getNewUser } from "./controller/DashboardController";



/**
 * All application routes.
 */
export const AppRoutes = [
    {
        path: "/users",
        method: "post",
        action: userSaveAction
    },
    {
        path: "/admin/addSeller",
        method: "post",
        action: adminAddNewSeller
    },
    {
        path: "/admin/sellerLogin",
        method: "post",
        action: adminSellerLogin
    },
    {
        path: "/admin/seller",
        method: "get",
        action: showAllSellers
    },
    {
        path: "/users",
        method: "get",
        action: getAllUser
    },
    {
        path: "/users/:mobile",
        method: "put",
        action: userUpdateAction
    },
    // {
    //     path:"/users/:mobile",
    //     method:"delete",
    //     action: userDeleteAction
    // },
    {
        path: "/users/otp",
        method: "post",
        action: verifyAction
    },
    {
        path: "/users/otp",
        method: "patch",
        action: verifyeAction
    },
    {
        path: "/users/otp",
        method: "put",
        action: otpAction
    },
    {
        path: "/users/login",
        method: "post",
        action: loginAction
    },
    {
        path: '/api/address',
        method: "post",
        action: userAddressSaveAction
    },
    {
        path: "/api/address/:id",
        method: "get",
        action: userAddressGetAction
    },
    {
        path: '/api/order',
        method: "post",
        action: saveOrderAction
    },
    {
        path: "/api/order/:id",
        method: "get",
        action: getOrderAction
    },
    {
        path: "/api/orders",
        method: "get",
        action: getAllOrderAction
    },
    {
        path: "/api/orders/:id",
        method: "put",
        action: orderUpdateAction
    },
    {
        path: "/api/dashboard",
        method: "get",
        action: getTodayStat
    },
    {
        path: "/api/dashboard/user",
        method: "get",
        action: getNewUser
    }
];
import {
    categoryVerifyAction,
    catalogGetBySubCategoryAction,
    catalogGetByCategoryAction,
    catalogSaveAction,
    catalogGetAction,
    categoryGetAction,
    categorySaveAction,
    categoryDeleteAction,
    catalogDeleteAction,
    catalogFindAction,
} from "./controller/catalogAction";

import {
    fileUploadAction
} from "./controller/fileUploader"

import {
    checkOutSaveAction, cleanReservation
} from "./controller/checkoutController";

/**
 * All application routes.
 */

export const AppRoutes = [
    {
        path: "/catalog",
        method: "post",
        action: catalogSaveAction
    },
    {
        path: "/catalog",
        method: "get",
        action: catalogGetAction
    },
    {
        path: "/category",
        method: "get",
        action: categoryGetAction
    },
    {
        path: "/catalog/:catalogName",
        method: "get",
        action: catalogFindAction
    },
    {
        path: "/category/:categoryName",
        method: "get",
        action: categoryVerifyAction
    },
    {
        path: "/category/:categoryName",
        method: "delete",
        action: categoryDeleteAction
    },
    {
        path: "/category",
        method: "post",
        action: categorySaveAction
    },
    {
        path: "/catalog/:id",
        method: "get",
        action: catalogGetByCategoryAction
    },
    {
        path: "/catalog/:id",
        method: "delete",
        action: catalogDeleteAction
    },
    {
        path: "/catalog/subcategory/:id",
        method: "get",
        action: catalogGetBySubCategoryAction
    },
    {
        path: "/category/upload",
        method: "post",
        action: fileUploadAction
    },
    {
        path: "/catalog/upload",
        method: "post",
        action: fileUploadAction
    },
    {
        path: "/catalog/checkout",
        method: "post",
        action: checkOutSaveAction
    },
    {
        path: "/catalog/clean",
        method: "post",
        action: cleanReservation
    }
];
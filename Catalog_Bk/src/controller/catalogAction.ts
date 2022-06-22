import { Request, Response } from "express";
import catalogModel from "../entity/catalog";
import categoryModel from "../entity/category";
import counterModel from "../entity/category";
import { Catalog } from "../entity/catalog";
import { Category } from "../entity/category";
import inventoryModel, { Inventory } from "../entity/inventory";


export async function catalogSaveAction(request: Request, response: Response) {
    const catalogData: Catalog = request.body;
    const createdCatalog = new catalogModel(catalogData);
    createdCatalog.save()
        .then(savedPost => {
            const inventory = new inventoryModel();
            inventory._id = savedPost._id;
            inventory.createdAt = new Date();
            inventory.reservations = [];
            inventory.quantity = catalogData['stockQuantity'];
            inventory.save();
            response.send(savedPost);
        })
}

export async function catalogGetAction(request: Request, response: Response) {
    let Catalog = catalogModel.find((err: any, Catalog: any) => {
        if (err) {
            response.send(err);
        } else {

            response.send(Catalog);
        }
    });
}

export async function catalogGetByCategoryAction(request: Request, response: Response) {
    // console.log(request.params.id);
    //let Catalog = catalogModel.find({'category':request.params.id.trim()},(err: any, Catalog: any) => {
    let Catalog = catalogModel.find({ $or: [{ _id: request.params.id.trim() }, { 'subCategory': request.params.id.trim() }] }, (err: any, Catalog: any) => {
        if (err) {

            response.send(err);
        } else {
            console.log(Catalog);
            response.send(Catalog);
        }
    });
}

export async function catalogGetBySubCategoryAction(request: Request, response: Response) {
    let Catalog = catalogModel.find({ 'subCatgory': request.params.id.trim() }, (err: any, Catalog: any) => {
        if (err) {
            response.send(err);
        } else {

            response.send(Catalog);
        }
    });
}

export async function catalogDeleteAction(request: Request, response: Response) {
    console.log(request.params.id);

    catalogModel.deleteOne({ _id: request.params.id }, function (err) {
        if (!err) {
            let Catalog = catalogModel.find((err: any, Catalog: any) => {
                if (err) {
                    response.send(err);
                } else {
                    //console.log(Category);
                    //Category[0].subcategory.forEach(function (sub) {
                    //  console.log(sub);
                    //});           
                    response.send(Catalog);
                }
            });
        }
        else {

        }
    });


}

export async function categorySaveAction(request: Request, response: Response) {
    console.log('saving data');
    var categoryData: Category = request.body;
    console.log(categoryData);
    const createdCategory = new categoryModel(categoryData);
    createdCategory.save()
        .then(savedPost => {
            response.send(savedPost);
        })
}

export async function categoryDeleteAction(request: Request, response: Response) {
    categoryModel.deleteOne({ _id: request.params.categoryName }, function (err) {
        if (!err) {
            let Category = categoryModel.find((err: any, Category: any) => {
                if (err) {
                    response.send(err);
                } else {
                    //console.log(Category);
                    //Category[0].subcategory.forEach(function (sub) {
                    //  console.log(sub);
                    //});           
                    response.send(Category);
                }
            });
        }
        else {

        }
    });


}

export async function categoryGetAction(request: Request, response: Response) {

    let Category = categoryModel.find((err: any, Category: any) => {
        if (err) {
            response.send(err);
        } else {
            //console.log(Category);
            /*Category[0].subcategory.forEach(function (sub) {
                console.log(sub);
              });      */
            response.send(Category);
        }
    });
}

export async function categoryVerifyAction(request: Request, response: Response) {

    let Category = categoryModel.find({ categoryName: request.params.categoryName.trim() }, (err: any, Category: any) => {
        if (err) {
            response.send(err);
        } else {
            Category[0].subcategory.forEach(function (sub) {
                console.log(sub);
            });
            response.send(Category);
        }
    });
}

export async function catalogFindAction(request: Request, response: Response) {

    let CatalogData = catalogModel.find({ category: request.params.catalogName.trim() }, (err: any, CatalogData: any) => {
        if (err) {
            response.send(err);
        } else {
            // Category[0].subcategory.forEach(function (sub) {
            //     console.log(sub);
            //   });           
            response.send(CatalogData);
        }
    });
}
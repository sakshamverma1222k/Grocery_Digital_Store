import { Request, Response } from "express";
import cartModel from "../entity/cart";
import { Cart } from "../entity/cart";
import inventoryModel, { Inventory } from "../entity/inventory";
var ObjectID = require('mongodb').ObjectID;

export async function checkOutSaveAction(request: Request, response: Response) {
    console.log("Inside Checkout data");
    const cartData: Cart = request.body;
    cartData.createdAt = new Date();
    const createdCart = new cartModel(cartData);
    var responseData = { cartId: '', items: [] };
    createdCart.save()
        .then(savedPost => {
            responseData.items = savedPost.items;
            console.log(responseData.items);
            response.send(savedPost);
            var success = [];
            var failed = [];
            for (var i = 0; i < createdCart.items.length; i++) {
                var product = createdCart.items[i];
                const resultQuery = inventoryModel.findOneAndUpdate({ _id: product._id, quantity: { $gte: product.count } }, {
                    $inc: { quantity: -product.count }
                    , $push: {
                        reservations: {
                            quantity: product.count, _id: createdCart._id, createdOn: new Date()
                        }
                    }
                }, function (err, result) {
                    if (err) {
                        console.log(err)
                    } else {
                        if (result) {
                            console.log("Inside Success Case");
                            success.push(product)
                        }
                        else {
                            failed.push(product);
                            if (failed.length > 0) {
                                for (var i = 0; i < success.length; i++) {
                                    inventoryModel.update({
                                        _id: success[i]._id
                                        , "reservations._id": createdCart._id
                                    }, {
                                        $inc: { quantity: success[i].quantity }
                                        , $pull: { reservations: { _id: createdCart._id } }
                                    })
                                }

                                return
                            }
                        }
                        response.send(createdCart);
                        //console.log(success);
                        //console.log(failed);
                    }
                });
            }
        })

}

export async function cleanReservation(request: Request, response: Response) {

    const cartData: Cart = request.body;
    console.log("Inside cleaning the cart ::::" + cartData._id);

    cartModel.findByIdAndUpdate(cartData._id, { "status": "completed" }, function (err, result) {
        if (err) {      
        }
        else {      
            response.send()  
        }
    })

    inventoryModel.findOneAndUpdate({ "reservations._id": ObjectID(cartData._id) },
        { $pull: { reservations: { _id: ObjectID(cartData._id )} } },
        function (err, result) {
            if (err) {
                console.log("Inside error");
                response.send(err)
            }
            else {
                console.log("Inside success");
                response.send(result);
            }
        })

}

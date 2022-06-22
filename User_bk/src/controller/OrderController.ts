import { Request, Response } from "express";
import { getManager, getConnection, UpdateResult } from "typeorm";
import { User } from "../entity/User";
import { ResponseData, buildResponse } from '../model/response';
import { ApplicationConstant } from '../util/constant';
import { createHmac } from 'crypto';
import { Address } from '../entity/UserAddress';
import { Orders } from '../entity/Order';
import { Item } from '../entity/Item';
import { cleanOrder } from '../util/common'
body: User;

export async function saveOrderAction(request: Request, response: Response) {
    const postRepository = getManager().getRepository(User);
    let user = await postRepository.findOne({ mobile: request.body.mobile });
    const addressRepository = getManager().getRepository(Address);
    let address = await addressRepository.findOne({ id: request.body.address });
    
    let tempArrya = [];
    tempArrya.push(address);
    if (user) {
        const order = new Orders();
        order.mobile = request.body.mobile;
        order.tax = request.body.tax;
        order.totalPrice = request.body.totalPrice;
        order.itemCount = request.body.itemCount;
        order.user = user;
        order.address = (address);
        var itemArray = [];
        request.body.items.forEach(function (element) {
            let items = new Item();
            items.productId = element.productId;
            items.category = element.category;
            items.productIdentifier = element.productIdentifier;
            items.itemCount = element.itemCount;
            items.price = element.price;
            items.qty = element.qty;
            items.tax = element.tax;
            items.thumbnail = element.thumbnail;
            items.weightUnit = element.weightUnit;
            items.brand = element.brand;
            itemArray.push(items);
            getManager().save(items);
        });
        order.item = itemArray;

        await getManager().save(order).then(res => {
            cleanOrder(request.body.cartId);
            response.send(buildResponse(
                ApplicationConstant.STATUS_SUCCESS,
                ApplicationConstant.STATUS_SUCCESS_ORDER_MESSAGE,
                'Added'
            ));
        });

    } else {
        response.status(600)
        response.send(buildResponse(
            ApplicationConstant.STATUS_ALREADY_REGISTERED,
            ApplicationConstant.STATUS_FAILED_ORDER_MESSAGE,
            ''
        ));
    }
}

export async function getOrderAction(request: Request, response: Response) {
    const orderRepository = getManager().getRepository(Orders);
    console.log(request.params.id);
    const order = await getManager()
        .getRepository(Orders)
        .createQueryBuilder("order")
        .where("userId = :id", { id: request.params.id })
        .leftJoinAndSelect("order.item", "item")
        .getMany();

    console.log(order);
    if (order) {
        response.send(buildResponse(
            ApplicationConstant.STATUS_SUCCESS,
            ApplicationConstant.STATUS_SUCCESS_REGISTER_MESSAGE,
            order
        ));
    } else {
        response.status(600)
        response.send(buildResponse(
            ApplicationConstant.STATUS_ALREADY_REGISTERED,
            ApplicationConstant.STATUS_ALREADY_REGISTERED_MESSAGE,
            ''
        ));
    }
}

export async function getAllOrderAction(request: Request, response: Response) {
    const orderRepository = getManager().getRepository(Orders);
    console.log('request.params.mobile');
    const order = await getManager()
        .getRepository(Orders)
        .createQueryBuilder("order")
        //.where("userId = :mobile", { mobile: request.params.mobile })
        .leftJoinAndSelect("order.item", "item")
        .leftJoinAndSelect("order.address", "address")
        .getMany();
    console.log(order);
    if (order) {
        response.send(buildResponse(
            ApplicationConstant.STATUS_SUCCESS,
            ApplicationConstant.STATUS_SUCCESS_REGISTER_MESSAGE,
            order
        ));
    } else {
        response.status(600)
        response.send(buildResponse(
            ApplicationConstant.STATUS_ALREADY_REGISTERED,
            ApplicationConstant.STATUS_ALREADY_REGISTERED_MESSAGE,
            ''
        ));
    }
}

export async function userUpdateAction(request: Request, response: Response) {
    await getConnection().createQueryBuilder()
        .update(Orders)
        .set({ paymentStatus: request.body.paymentStatus, paymentMode: request.body.paymentMode })
        .where("id = :id", { mobile: request.params.id })
        .execute().then(function (updateResult) {
            console.log(updateResult);
            if (updateResult.raw.affectedRows > 0) {
                response.send(buildResponse(
                    ApplicationConstant.STATUS_SUCCESS,
                    ApplicationConstant.STATUS_SUCCESS_REGISTER_MESSAGE,
                    ''
                ));
            } else {
                response.status(404)
                response.send(buildResponse(
                    ApplicationConstant.STATUS_ALREADY_REGISTERED,
                    ApplicationConstant.STATUS_ALREADY_REGISTERED_MESSAGE,
                    ''
                ));
            }
        });
}

/*export async function orderUpdateAction(request: Request, response: Response) {
    await getConnection().createQueryBuilder()
        .update(Orders)
        .set({ deliveryStatus: request.body.deliveryStatus})
        .where("id = :rid", { rid: request.params.id })
        .execute().then(function (updateResult) {
            console.log(updateResult);
            if (updateResult.raw.affectedRows > 0) {
                response.send(buildResponse(
                    ApplicationConstant.STATUS_SUCCESS,
                    ApplicationConstant.STATUS_SUCCESS_REGISTER_MESSAGE,
                    ''
                ));
            } else {
                response.status(404)
                response.send(buildResponse(
                    ApplicationConstant.STATUS_ALREADY_REGISTERED,
                    ApplicationConstant.STATUS_ALREADY_REGISTERED_MESSAGE,
                    ''
                ));
            }
        }
    }*/

export async function orderUpdateAction(request: Request, response: Response) {
    await getConnection().createQueryBuilder()
        .update(Orders)
        .set({ deliveryStatus: request.body.deliveryStatus })
        .where("id = :id", { id: request.params.id })
        .execute().then(function (updateResult) {
            console.log(updateResult);
            if (updateResult.raw.affectedRows > 0) {
                response.send(buildResponse(
                    ApplicationConstant.STATUS_SUCCESS,
                    ApplicationConstant.STATUS_SUCCESS_REGISTER_MESSAGE,
                    ''
                ));
            } else {
                response.status(404)
                response.send(buildResponse(
                    ApplicationConstant.STATUS_ALREADY_REGISTERED,
                    ApplicationConstant.STATUS_ALREADY_REGISTERED_MESSAGE,
                    ''
                ));
            }
        });
}

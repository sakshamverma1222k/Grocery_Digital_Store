import { Request, Response } from "express";
import { getManager, getConnection, UpdateResult } from "typeorm";
import { User } from "../entity/User";
import { ResponseData, buildResponse } from '../model/response';
import { ApplicationConstant } from '../util/constant';
import { Orders } from '../entity/Order';



export async function getTodayStat(request: Request, response: Response) {

    const date = new Date();
    const iso  = date.toISOString()
    const orderRepository = getManager().getRepository(Orders);
    console.log(request.params.id);
    const order = await getManager()
    .getRepository(Orders)
    .createQueryBuilder("order")
    .select('count(createDate ) o, sum(itemCount) i, sum(totalPrice ) t')
    .where("DATE(createDate) = CURDATE()")
    .getRawOne();

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

export async function getNewUser(request: Request, response: Response) {

    const date = new Date();
    const iso  = date.toISOString()
    const orderRepository = getManager().getRepository(Orders);
    const order = await getManager()
    .getRepository(User)
    .createQueryBuilder("order")
    .select('count(*) u')
    .where("DATE(updateDate) = CURDATE()")
    .getRawOne();

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


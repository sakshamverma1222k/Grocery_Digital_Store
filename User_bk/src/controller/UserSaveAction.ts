import { Request, Response } from "express";
import { getManager, getConnection, UpdateResult } from "typeorm";
import { User } from "../entity/User";
import { AdminSeller } from "../entity/admin";
import { ResponseData, buildResponse } from '../model/response';
import { ApplicationConstant } from '../util/constant';
import { createHmac } from 'crypto';
import { Address } from "../entity/UserAddress";

body: User;
body: AdminSeller;

export async function userSaveAction(request: Request, response: Response) {
    const postRepository = getManager().getRepository(User);
    let count = await postRepository.findAndCount({ mobile: request.body.mobile });
    if (count[1] == 0) {
        request.body.otp = Math.floor(1000 + Math.random() * 9000);
        const newUser = postRepository.create(request.body);
        await postRepository.save(newUser);
        response.send(buildResponse(
            ApplicationConstant.STATUS_SUCCESS,
            ApplicationConstant.STATUS_SUCCESS_REGISTER_MESSAGE,
            newUser
        ));
    } else {
        response.status(600)
        response.send(buildResponse(
            ApplicationConstant.STATUS_ALREADY_REGISTERED,
            ApplicationConstant.STATUS_ALREADY_REGISTERED_MESSAGE,
            count[0][0]
        ));
    }
}

export async function adminSellerLogin(request: Request, response: Response) {
    console.log(request.body);
    let data = await getManager().getRepository(AdminSeller).
        findOne({ sellerUserName: request.body.username, sellerPassword: createHmac('sha256', request.body.password).digest('hex') });
    console.log(data);
    if (data) {
        response.send(buildResponse(
            ApplicationConstant.STATUS_SUCCESS,
            ApplicationConstant.STATUS_LOGIN_SUCCSS_MESSAGE,
            data
        ));
    } else {
        response.status(600)
        response.send(buildResponse(
            ApplicationConstant.STATUS_LOGIN_NOT_FOUND,
            ApplicationConstant.STATUS_LOGIN_NOT_FOUND_MESSAGE,
            data
        ));
    }
}

export async function adminAddNewSeller(request: Request, response: Response) {
    const postRepository = getManager().getRepository(AdminSeller);
    let countMobile = await postRepository.findAndCount({ sellerMobile: request.body.sellerMobile });
    let countEmail = await postRepository.findAndCount({ sellerEmail: request.body.sellerEmail });
    let countUsername = await postRepository.findAndCount({ sellerUserName: request.body.sellerUserName });
    console.log("===============\n\n\n\n\n\n\n\n\n"+countMobile[1]+"\n"+countEmail[1]+"\n"+countUsername[1]+"\n\n\n\n\n\n\n\n\n ========\n\n\n\n\n\n");
    let count = countMobile[1] + countEmail[1] + countUsername[1];
    // let problem = "___M-"+countMobile[1]+":E-"+countEmail[1]+":U-"+countUsername[1]+"___" 
    let problem = [countMobile[1] , countEmail[1] , countUsername[1]]
    // console.log(count);
    if (count==0) {
        request.body.otp = Math.floor(1000 + Math.random() * 9000);
        const newAdmin = postRepository.create(request.body);
        await postRepository.save(newAdmin);
        response.send(buildResponse(
            ApplicationConstant.STATUS_SUCCESS,
            ApplicationConstant.STATUS_SUCCESS_REGISTER_MESSAGE,
            newAdmin
        ));
    } else {
        response.status(200)
        response.send(buildResponse(
            ApplicationConstant.STATUS_ALREADY_REGISTERED,
            ApplicationConstant.STATUS_ALREADY_REGISTERED_MESSAGE_TYPE,
            problem
        ));
    }
}

export async function userUpdateAction(request: Request, response: Response) {
    await getConnection().createQueryBuilder()
        .update(User)
        .set({ password: createHmac('sha256', request.body.password).digest('hex'), email: request.body.email })
        .where({ mobile: request.params.mobile })
        .execute().then(function (updateResult) {
            console.log(updateResult, "======");
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

export async function verifyAction(request: Request, response: Response) {
    console.log(request.body);
    let data = await getManager().getRepository(User)
        .createQueryBuilder('usr')
        .andWhere("(usr.mobile = :mob and usr.otp=:t )")
        .setParameters({ mob: request.body.mobile, t: request.body.otp })
        .getOne()
    if (data) {
        response.send(buildResponse(
            ApplicationConstant.STATUS_SUCCESS,
            ApplicationConstant.STATUS_SUCCESS_REGISTER_MESSAGE,
            data
        ));
    } else {
        response.status(600)
        response.send(buildResponse(
            ApplicationConstant.STATUS_NOT_FOUND,
            ApplicationConstant.STATUS_NOT_FOUND_MESSAGE,
            data
        ));
    }
}

export async function verifyeAction(request: Request, response: Response) {
    console.log(request.body);
    let data = await getManager().getRepository(User)
        .createQueryBuilder('usr')
        .andWhere("(usr.mobile = :mob and usr.otp=:t )")
        .setParameters({ mob: request.body.mobile, t: request.body.otp })
        .getOne()
    if (data) {
        response.send(buildResponse(
            ApplicationConstant.STATUS_SUCCESS,
            ApplicationConstant.STATUS_SUCCESS_REGISTER_MESSAGE,
            data
        ));
    } else {
        response.status(600)
        response.send(buildResponse(
            ApplicationConstant.STATUS_NOT_FOUND,
            ApplicationConstant.STATUS_NOT_FOUND_MESSAGE,
            data
        ));
    }
}

export async function otpAction(request: Request, response: Response) {
    console.log(request.body);
    await getConnection().createQueryBuilder()
        .update(User)
        .set({ otp: request.body.otp, mobile: request.body.mobile })
        .where("id = :id", { id: request.params.id })
        .update(User)
        .execute();
    response.send({ "status": "success" });
}

export async function loginAction(request: Request, response: Response) {
    console.log(request.body);
    let data = await getManager().getRepository(User).
        findOne({ mobile: request.body.mobile, password: createHmac('sha256', request.body.password).digest('hex') });
    console.log(data);
    if (data) {
        response.send(buildResponse(
            ApplicationConstant.STATUS_SUCCESS,
            ApplicationConstant.STATUS_LOGIN_SUCCSS_MESSAGE,
            data
        ));
    } else {
        response.status(600)
        response.send(buildResponse(
            ApplicationConstant.STATUS_LOGIN_NOT_FOUND,
            ApplicationConstant.STATUS_LOGIN_NOT_FOUND_MESSAGE,
            data
        ));
    }
}

export async function userAddressSaveAction(request: Request, response: Response) {
    const postRepository = getManager().getRepository(User);
    let user = await postRepository.findOne({ id: request.body.id });
    if (user) {
        const address = new Address();
        address.mobile = request.body.mobile;
        address.city = request.body.city;
        address.house = request.body.house;
        address.street = request.body.street;
        address.dist = request.body.dist;
        address.state = request.body.state;
        address.pincode = request.body.pincode;
        address.user = user;
        await getManager().save(address);
        response.send(buildResponse(
            ApplicationConstant.STATUS_SUCCESS,
            ApplicationConstant.STATUS_SUCCESS_REGISTER_MESSAGE,
            'Added'
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

export async function userAddressGetAction(request: Request, response: Response) {
    const postRepository = getManager().getRepository(Address);
    let address = await postRepository.find({
        /* select: ["city", "state"],*/
        relations: ["user"],
        where: { user: { id: request.params.id } }
    });
    if (address) {
        response.send(buildResponse(
            ApplicationConstant.STATUS_SUCCESS,
            ApplicationConstant.STATUS_SUCCESS_REGISTER_MESSAGE,
            address
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

export async function getAllUser(request: Request, response: Response) {
    const postRepository = getManager().getRepository(User);
    let user = await postRepository.find();
    console.log(user);
    if (user) {
        response.send(buildResponse(
            ApplicationConstant.STATUS_SUCCESS,
            ApplicationConstant.STATUS_SUCCESS_REGISTER_MESSAGE,
            user
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

export async function showAllSellers(request: Request, response: Response) {
    const postRepository = getManager().getRepository(AdminSeller);
    let user = await postRepository.find();
    console.log(user);
    if (user) {
        response.send(buildResponse(
            ApplicationConstant.STATUS_SUCCESS,
            ApplicationConstant.STATUS_SUCCESS_REGISTER_MESSAGE,
            user
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

function checkUserExists(mob) {
    const postRepository = getManager().getRepository(User);
    const count = postRepository.count({ where: { mobile: mob } })
    return count;
}
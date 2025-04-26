"use client";
import React, { useState } from "react";
import {
  Avatar,
  Button,
  Checkbox,
  Col,
  Divider,
  Flex,
  Form,
  Grid,
  Input,
  Popover,
  Radio,
  Row,
  Select,
  Space,
  Tooltip,
  Typography,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import AddCardElement from "@/components/common/AddCard";
import StripeElement from "@/components/common/StripeElement";
import Link from "next/link";
import Icons from "@/components/Icons";
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { GooglePayWithCDN } from "@/components/common/GooglePayWithCDN";
import GooglePay from "@/components/common/GooglePay";
// import AddCardElement from "./common/AddCard";
import { loadStripe } from '@stripe/stripe-js';
const STRIPE_KEY = process.env.NEXT_PUBLIC_STAGING_STRIPE_KEY as string;

const PaymentCheckout = () => {
    const screens = Grid.useBreakpoint();
  const [paywith, setPaywith] = useState<any>("STRIPE");
  const stripe = useStripe();
  const elements: any = useElements();
  const submit=async(values:any)=>{
    console.log(values,"values");
    try {
        let cardElement: any
        let payload: any
        cardElement = elements.getElement(CardElement);
        console.log(cardElement, 'cardElement');

        const data = {
            type: 'card',
            card: cardElement,
            billing_details: {
                address: {
                    country: values.country,
                    // street: ev.street,
                    // flat_suite: ev.flat_suite,
                    city: values.city,
                    state: values.state,
                    postal_code: values.post_code,
                },
            },
        } as any;

        payload = await stripe?.createPaymentMethod(data);
        console.log(payload,"payload");
        
    } catch (error) {
        
    }
    
  }
  const stripePromise = loadStripe(STRIPE_KEY);
  return (
    <>
      {/* {paywith == 'STRIPE' && <> */}
      {/* <Elements stripe={stripePromise}> */}
      {/* <StripeElement> */}
        <section className="checkout-wrapper pb-4 pb-md-0">
          {/* <LogoLoader open={loading} /> */}
          <div className="container">
            <Row>
              <Col>
                <div className="pt-3 pb-3 pb-md-4 pb-xxl-5">
                  <Link className="navbar-brand" href={"/"}>
                    {/* <img src={logo.src} alt="logo" /> */}
                  </Link>
                </div>
              </Col>
            </Row>
            <Row gutter={[24, { xs: 40, md: 0 }]} justify={"space-between"}>
              <Col span={24} lg={12} xl={10}>
                <div className="">
                  <Button
                    type="text"
                    className="px-0 bg-transparent text-white"
                    icon={<Icons.ChevronLeftGrey />}
                  >
                    Back
                  </Button>
                </div>
                <div className="py-xxl-5 py-md-4 py-sm-3">
                  <Row justify={screens.md ? "start" : "center"}>
                    <Col span={24}>
                      <h2
                        className={`mb-2 fw-medium ${
                          screens.md ? "fs-24" : "fs-20"
                        }`}
                      >
                        Pay with
                      </h2>
                    </Col>
                  </Row>
                  <Row className="mb-4" gutter={[16, 16]}>
                    <Col span={12} sm={6} md={6} lg={8} xl={7} xxl={6}>
                      <div
                        role="button"
                        className={`payment-card shadow-sm p-3 h-100 rounded-3 ${
                          paywith == "STRIPE" ? "selected" : ""
                        }`}
                        onClick={() => setPaywith("STRIPE")}
                      >
                        <Icons.CardIcon />
                        <h6 className="m-0 mt-2 text-white fs-14">Card</h6>
                      </div>
                    </Col>

                    <Col
                      role="button"
                      span={12}
                      sm={6}
                      md={6}
                      lg={8}
                      xl={7}
                      xxl={6}
                    >
                      <div
                        className={`payment-card shadow-sm p-3 h-100 rounded-3 ${
                          paywith == "GOOGLEPAY" ? "selected" : ""
                        } `}
                        // onClick={() => setPaywith("GOOGLEPAY")}
                      >
                        <GooglePay
                          totalPrice={"1.00"}
                          currencyCode="AUD"
                          countryCode="AU"
                          // handleSocialBuy={props.handleSocialBuy}
                        />
                      </div>
                    </Col>
                  </Row>
                  {paywith == "STRIPE" && (
                    <>
                      <Row
                        justify={screens.md ? "start" : "center"}
                        gutter={[16, 16]}
                      >
                        <Col span={24}>
                          <div
                            className="overflow-auto pe-2"
                            style={{ maxHeight: 160 }}
                          >
                            {/* {cards?.data?.map((res: any, index: number) =>  */}
                            <div className="payment-card h-100 p-2 justify-content-between d-flex align-items-center gap-5 mb-2">
                              <Icons.AmexIcon />
                              <div className="card-details">
                                <Typography.Title level={5} className="mb-1">
                                  **** **** **** XXXX
                                </Typography.Title>
                                <Typography.Text className="text-uppercase text-end d-block text-grey"></Typography.Text>
                              </div>
                              <Radio></Radio>
                            </div>
                            {/* )} */}
                          </div>
                        </Col>
                      </Row>
                      {/* Form */}
                      <Form
                        name="normal_login"
                        className="login-form"
                        // initialValues={{ remember: true, name: `${userInfo?.first_name ? userInfo?.first_name : ""} ${userInfo?.last_name ? userInfo?.last_name : ""}`, country_code: "+61" }}
                        requiredMark={false}
                        onFinish={submit}
                        // form={paymentForm}
                        // onFinish={(e) => {
                        //     onFinish(e);
                        //     handleSubmit(e);
                        // }}

                        layout="vertical"
                      >
                        {/* Personal Information */}
                        <h2
                          className={`mb-3 fw-semibold ${
                            screens.md ? "fs-20" : "fs-18"
                          }`}
                        >
                          Personal Information
                        </h2>
                        {/* Email  */}

                        {/* {userInfo.email} */}
                        <FormItem
                          className="mt-3"
                          label={
                            <span className="fs-6 text-nowrap text-secondary">
                              Email
                            </span>
                          }
                        >
                          <Input
                            size="large"
                            placeholder="johndoe123@email.com"
                            className="border border-dark"
                            disabled
                            defaultValue={"xxx@yopmail.com"}
                            prefix={
                              <span className="pe-2">
                                <Icons.EmailGradient />
                              </span>
                            }
                          />
                        </FormItem>
                        <FormItem
                          className="mt-3"
                          label={
                            <span className="fs-6 text-nowrap text-secondary">
                              Name
                            </span>
                          }
                          name="name"
                          rules={[
                            { required: true, message: "Please Enter Name" },
                          ]}
                        >
                          {/* {userInfo.email} */}
                          <Input
                            size="large"
                            placeholder="Enter Name"
                            className="border border-dark bg-transparent text-black"
                            onKeyPress={(e: any) => {
                              if (!/[A-Za-z ]/.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                          />
                        </FormItem>
                        {/* Phone Number  */}
                        <div className="d-flex w-100 select-input">
                          <FormItem
                            name="country_code"
                            label={
                              <span className="text-nowrap">Phone Number</span>
                            }
                            // rules={[
                            //   {
                            //     required: true,
                            //     message: "Please select Country Code",
                            //   },
                            // ]}
                          >
                            <Select
                              size="large"
                              bordered={false}
                              className="grey-bordered text-black"
                              prefixCls="pill-dropdown"
                              placeholder="Select Code"
                              style={{
                                paddingInline: 12,
                                width: "100%",
                                borderRadius: "40px 0 0 40px",
                                height: 52,
                                borderRight: 0,
                              }}
                              defaultActiveFirstOption={true}
                              showSearch={true}
                            >
                              {/* {countryJson.map((item: any, index: any) =>
                                                    <SelectOption key={index} value={item?.dial_code} size="large" className="text-white fw-medium">{item.flag}{item?.dial_code}</SelectOption>
                                                )} */}
                            </Select>
                          </FormItem>
                          <FormItem
                            className="w-100 align-self-end"
                            name="phone_number"
                            label=" "
                            rules={[
                              {
                                required: true,
                                message: "Please enter your phone",
                              },
                            ]}
                          >
                            <Input
                              size="large"
                              onKeyPress={(e: any) => {
                                if (!/^[0-9]$/.test(e.key)) {
                                  e.preventDefault();
                                }
                              }}
                              maxLength={15}
                              minLength={5}
                              style={{ borderRadius: "0px 40px 40px 0px" }}
                              className="w-100 border border-dark bg-transparent text-black"
                              placeholder="09876 543210"
                              suffix={
                                <Popover
                                  className="rounded-3"
                                  showArrow
                                  style={{ maxWidth: 100 }}
                                  content={
                                    <p className="text-center">
                                      In case we need to contact
                                      <br />
                                      you about your order.
                                    </p>
                                  }
                                >
                                  <Button
                                    type="text"
                                    size="small"
                                    className="p-0"
                                  >
                                    <Icons.InfoOutlined />
                                  </Button>
                                </Popover>
                              }
                            />
                          </FormItem>
                        </div>
                        {/* Card Information */}
                        {/* {!router?.query?.card_id && <> */}
                        <h2
                          className={`mb-3 fw-semibold ${
                            screens.md ? "fs-20" : "fs-18"
                          }`}
                        >
                          Card Information
                        </h2>
                        {/* <StripeElement> */}
                        <FormItem
                          className="mt-3 m-0"
                          label={
                            <span className="fs-6 text-nowrap text-secondary">
                              Card Number
                            </span>
                          }
                        >
                          {/* <AddCardElement /> */}
                          <CardElement />
                        </FormItem>

                        {/* </>} */}
                        {/* Address */}
                        <h2
                          className={`mb-3 fw-semibold ${
                            screens.md ? "fs-20" : "fs-18"
                          }`}
                        >
                          Address
                        </h2>
                        {/* Country or region */}
                        <FormItem
                          name="country"
                          className="select-input"
                          // label={false}
                        //   rules={[
                        //     {
                        //       required: true,
                        //       message: "Select Your Country",
                        //     },
                        //   ]}
                        >
                          <Select
                            size="large"
                            bordered={false}
                            className="text-white w-100 border rounded-pill"
                            prefixCls="pill-dropdown"
                            placeholder="Country"
                            // onSearch={handleSearch}
                            style={{
                              paddingInline: 12,
                              width: "100%",
                              borderRadius: "40px 0 0 40px",
                              height: 48,
                              borderRight: 0,
                            }}
                            defaultActiveFirstOption={true}
                            showSearch={true}
                          >
                            {/* {countryJson.map((item: any, index: any) =>
                                                <SelectOption key={index} value={item?.code} size="large" className="text-grey fw-medium">{item.flag}{item?.name}</SelectOption>
                                            )} */}
                          </Select>
                        </FormItem>
                        {/* Street address */}
                        <FormItem
                          className="w-100"
                          name="street"
                          label=""
                          rules={[
                            {
                              required: true,
                              message: "Please Enter Street Address",
                            },
                          ]}
                        >
                          <Input
                            size="large"
                            className="border border-dark bg-transparent text-black"
                            placeholder="Street Address"
                          />
                        </FormItem>
                        {/* Flat, suite. (optional) */}
                        <FormItem
                          className="w-100"
                          name="flat_suite"
                          label=""
                          rules={[
                            {
                              required: false,
                              message: "Please Enter Flat, Suite. (Optional)",
                            },
                          ]}
                        >
                          <Input
                            size="large"
                            className="border border-dark bg-transparent text-black"
                            placeholder="Flat, Suite. (Optional)"
                          />
                        </FormItem>
                        {/* City */}
                        <FormItem
                          className="w-100"
                          name="city"
                          label=""
                          rules={[
                            {
                              required: true,
                              message: "Please Enter City",
                            },
                          ]}
                        >
                          <Input
                            size="large"
                            className="border border-dark bg-transparent text-black"
                            placeholder="City"
                          />
                        </FormItem>
                        {/* State / Province / County / Region */}
                        <FormItem
                          className="w-100"
                          name="state"
                          label=""
                          rules={[
                            {
                              required: true,
                              message:
                                "Please Enter State / Province / County / Region",
                            },
                          ]}
                        >
                          <Input
                            size="large"
                            className="border border-dark bg-transparent text-black"
                            placeholder="State / Province / County / Region"
                            onKeyPress={(e: any) => {
                              if (!/[A-Za-z ]/.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                          />
                        </FormItem>
                        {/* Postcode */}
                        <FormItem
                          className="w-100"
                          name="post_code"
                          label=""
                          rules={[
                            {
                              required: true,
                              message: "Please Enter Postcode",
                            },
                          ]}
                        >
                          <Input
                            size="large"
                            className="border border-dark bg-transparent text-black"
                            placeholder="Postcode"
                            onKeyPress={(e: any) => {
                              if (!/^[0-9]$/.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                          />
                        </FormItem>
                        {/* Save this address for future use. */}
                        <FormItem
                          valuePropName="checked"
                          name={"is_address_save"}
                          className="mb-1"
                        >
                          <Checkbox defaultChecked={false}>
                            Save this address for future use.
                          </Checkbox>
                        </FormItem>
                        <FormItem valuePropName="checked" name={"is_save"}>
                          <Checkbox defaultChecked={false}>
                            Save my card details for future payments.
                          </Checkbox>
                        </FormItem>
                        {/* {router?.query?.song_type == "video" ?
                                        <Button type='primary' htmlType='submit' loading={loading} disabled={loading} className='btn-gradient px-4' block shape='round' size='large'>Pay ${(state?.price)}</Button>
                                        : */}
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="btn-gradient px-4"
                          block
                          shape="round"
                          size="large"
                        >
                          Pay $ 102
                        </Button>
                        {/* } */}
                        {/* <Button type='primary' htmlType='submit' loading={loading} disabled={loading} className='btn-gradient px-4' block shape='round' size='large'>Pay ${totalAmont ? totalAmont : (router?.query?.price || state?.price)}</Button> */}
                      </Form>
                    </>
                  )}

                 
                </div>
                <div className="py-4">
                  {/* <Button type='primary' onClick={onFinish} loading={processing} disabled={processing} id='1' className='btn-gradient px-4' block shape='round' size='large'>Pay ${+total_amount}</Button> */}
                  {/* <Button type='primary' onClick={onFinish} loading={processing} disabled={processing} id='1' className='btn-gradient px-4' block shape='round' size='large'>Pay ${state?.price}</Button> */}
                </div>
              </Col>
              <Col span={24} lg={12} xl={10}>
                <div className="p-sm-4 sticky-top">
                  {/* Details of your purchase: */}
                  <div>
                    <h2
                      className={`mb-4 fw-medium ${
                        screens.md ? "fs-20" : "fs-18"
                      }`}
                    >
                      Details of your purchase:
                    </h2>
                    {/* <Tooltip title={capFirst(state?.name)} style={{ border: 'none' }} > */}

                    {/* Song Detail */}
                    {
                      <div>
                        <h2
                          className={`mb-3 text-secondary-dark fw-medium ${
                            screens.md ? "fs-18" : "fs-16"
                          } text-capitalize`}
                        >
                          qwertyu
                        </h2>
                        <div className="border bg-white p-2 rounded-3 d-flex justify-content-between align-items-center">
                          <Space>
                            {/* <Avatar size={52} shape="square" className='rounded-3' src={}></Avatar> */}
                            <div>
                              <Tooltip title={"check"}>
                                <h5
                                  className={`line-clamp text-secondary-white line-1 mb-1 ${
                                    screens.md ? "fs-16" : "fs-14"
                                  }`}
                                >
                                  Testing
                                </h5>
                              </Tooltip>
                              <h6 className="text-black fw-semibold fs-14">
                                $12
                              </h6>
                            </div>
                          </Space>
                          <Space className="align-self-end">
                            {/* <Button size='small' type='text' onClick={() => console.log("hhhhhhhhhhh")} className='p-0' icon={<Icons.MinusRewards />}></Button>
                                            <Input placeholder='' style={{ width: "50px" }} className='border-0 px-0 bg-transparent text-white rounded-0 text-center' />
                                            <Button size='small' type='text' onClick={() => console.log("hhhhhhhhhhh")} className='p-0' icon={<Icons.PlusRewards />}></Button> */}
                          </Space>
                        </div>
                        <div className="border mt-3 bg-white p-2 rounded-3 d-flex justify-content-between align-items-center">
                          {/* <div className="text-white mt-3 mb-3 d-flex "> */}
                          <h5 className="m-0">Tip:</h5>
                          <h5 className="m-0">
                            {/* ${Number(router?.query?.price) - Number(state?.price)} */}
                            779
                          </h5>
                          {/* </div> */}
                        </div>
                      </div>
                    }

                    {/* Artist Detail */}
                    {/* <div className='d-flex justify-content-between'>
                                    <Space>
                                        <Avatar size={40} shape="circle" src={state?.artist_id?.image ? henceforthS3Bucket.image.getSmall(state?.artist_id?.image) : modal1.src}></Avatar>
                                        <h3 className="fw-medium fs-6 text-nowrap">{state?.artist_id?.first_name} {state?.artist_id?.last_name}  {state?.artist_id?.is_artist_account_verify == "APPROVED" ? <Icons.Verified /> : ""}</h3></Space>
                                    <div className="my-3 mt-4 mt-md-5">
                                        <h4 className={` ${screens.md ? 'fs-20' : 'fs-18'} fw-semibold`}>{capFirst(state?.name?.slice(0, 20))}</h4>
                                    </div>
                                </div> */}

                    {/* </Tooltip> */}
                    {/* <div className='border p-1 rounded-3 checkout-image-wrapper'>
                                    <img src={state?.cover_image ? henceforthS3Bucket.image.getSmall(state?.cover_image) : modal1.src} alt="logo" className='object-fit-cover w-100 h-100 rounded-3' />
                                </div> */}
                  </div>

                  {/* Rewards  */}
                  {/* {retrievedData.quantity == 0 ? */}

                  <Divider style={{ borderColor: "#333" }}></Divider>

                  <Flex
                    justify={screens.md ? "space-between" : "flex-start"}
                    vertical={screens.md ? false : true}
                    gap={8}
                    align={screens.md ? "center" : ""}
                  >
                    <Space direction="vertical">
                      {/* <Tooltip title={"Loose This Feeling"}> */}
                      <h5
                        className={`line-clamp text-secondary-dark line-1 mb-1 ${
                          screens.md ? "fs-16" : "fs-14"
                        }`}
                      >
                        Total
                      </h5>
                      {/* </Tooltip> */}
                      <Typography.Title
                        className="text-secondary fs-14 fw-normal"
                        style={{ maxWidth: screens.md ? "30ch" : "100%" }}
                      >
                        This is the total amount for your purchase
                       
                      </Typography.Title>
                    </Space>

                    {/* {router?.query?.song_type == "video" ?
                                    <Typography.Title className='mb-2 text-white fw-semibold fs-32'>${(state?.price)}</Typography.Title>
                                    : */}
                    <Typography.Title className="mb-2 text-white fw-semibold fs-32">
                      $1102
                    </Typography.Title>
                    {/* } */}
                  </Flex>
                </div>
              </Col>
            </Row>
          </div>
        </section>
        {/* </StripeElement> */}
        {/* </Elements> */}
      {/* </>} */}
    </>
  )
}

export default PaymentCheckout
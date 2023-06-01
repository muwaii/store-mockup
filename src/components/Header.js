import "./styles/Header.css";
import {
  Badge,
  Button,
  Checkbox,
  Drawer,
  Form,
  Input,
  InputNumber,
  Menu,
  message,
  Table,
} from "antd";
import { HomeFilled } from "@ant-design/icons";
import { Navigate, useNavigate } from "react-router-dom";
import Typography from "antd/es/typography/Typography";
import { ShoppingCartOutlined } from "@ant-design/icons";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setCartOpen, setCartItems, setCheckoutOpen } from "../store/itemSlice";

import { useEffect, useState } from "react";
import { getCart } from "./api/api";

function AppCart() {
  const dispatch = useDispatch();
  const { theProducts } = useSelector((state) => ({ ...state }));
  // const [theCartItems, setTheCartItems] = useState([]);

  useEffect(() => {
    getCart().then((res) => {
      dispatch(setCartItems(res.products));
      // setTheCartItems(res.products);
    });
  }, []);

  const onConfirmOrder = (value) => {
    console.log("value", value);
    dispatch(setCartOpen(false));
    dispatch(setCheckoutOpen(false));
    message.success("Your order has been placed successfully");
  };

  return (
    <div>
      <Badge
        className="shopping-cart-icon"
        count={theProducts.cartItems.length}
        onClick={() => dispatch(setCartOpen(true))}
      >
        <ShoppingCartOutlined />
      </Badge>
      <Drawer
        open={theProducts.cartOpen}
        onClose={() => dispatch(setCartOpen(false))}
        title="Your Cart"
        contentWrapperStyle={{ width: 600 }}
      >
        <Table
          pagination={false}
          columns={[
            { title: "Title", dataIndex: "title" },
            {
              title: "Price",
              dataIndex: "price",
              render: (value) => {
                return <span>${value}</span>;
              },
            },
            {
              title: "Quantity",
              dataIndex: "quantity",
              render: (value, record) => {
                return (
                  <InputNumber
                    defaultValue={value}
                    min={0}
                    onChange={(value) => {
                      // setTheCartItems((prev) =>
                      //   prev.map((cart) => {
                      //     if (record.id === cart.id) {
                      //       cart.total = cart.price * value;
                      //     }
                      //     console.log("cart in map", cart);
                      //     return cart;
                      //   })
                      // );
                      //
                      dispatch(
                        setCartItems(
                          theProducts.cartItems.map((cart) => {
                            // นึกไว้เสมอว่า ถ้าเจอ return เมื่ไร มันก็ไม่ทำต่อละ
                            if (record.id === cart.id) {
                              // cart.total = cart.price * value; // เขีบนแบบนี้ไม่ได้ งงมาชั่วโมงนึง แสส
                              console.log("cart in", cart);
                              return { ...cart, total: cart.price * value };
                            }
                            console.log("cart out", cart);
                            return cart;
                          })
                        )
                      );
                    }}
                  />
                );
              },
            },
            {
              title: "Total",
              dataIndex: "total",
              render: (value) => {
                return <span>${value}</span>;
              },
            },
          ]}
          dataSource={theProducts.cartItems}
          // dataSource={theCartItems}

          summary={(data) => {
            const total = data.reduce((prev, current) => {
              return prev + current.total;
            }, 0);
            return <span>Total: {total}</span>;
          }}
        />
        <Button onClick={() => dispatch(setCheckoutOpen(true))} type="primary">
          Check out
        </Button>
      </Drawer>
      <Drawer
        open={theProducts.checkoutOpen}
        onClose={() => dispatch(setCheckoutOpen(false))}
        title="Confirm Order"
      >
        <Form onFinish={onConfirmOrder}>
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: "Please enter your full name" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email",
                type: "email",
              },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter your address" }]}
          >
            <Input placeholder="Enter your address" />
          </Form.Item>
          <Form.Item>
            <Checkbox defaultChecked>Cash on Delivery</Checkbox>
          </Form.Item>
          <Typography.Paragraph type="secondary">
            Moree methods comming soon
          </Typography.Paragraph>
          <Button type="primary" htmlType="submit">
            Confirm
          </Button>
        </Form>
      </Drawer>
    </div>
  );
}

function Header() {
  const navigate = useNavigate();
  function onMenulick(item) {
    navigate(`/${item.key}`);
  }

  return (
    <>
      <div className="Header">
        <Menu
          className="main-menu"
          onClick={onMenulick}
          mode="horizontal"
          items={[
            { label: <HomeFilled />, key: "" },
            {
              label: "Men",
              key: "men",
              children: [
                { label: "Men's Shirts", key: "mens-shirts" },
                { label: "Men's Shoes", key: "mens-shoes" },
                { label: "Men's Watches", key: "mens-watches" },
              ],
            },
            {
              label: "Women",
              key: "women",
              children: [
                { label: "Women's Dresses", key: "womens-dresses" },
                { label: "Women's Shoes", key: "womens-shoes" },
                { label: "Women's Watches", key: "womens-watches" },
                { label: "Women's Bags", key: "womens-bags" },
                { label: "Women's Jeweellery", key: "womens-jeweellery" },
              ],
            },
            { label: "Furniture", key: "furniture" },
          ]}
        />
        <Typography.Title>Homme'</Typography.Title>
        <AppCart />
      </div>
    </>
  );
}

export default Header;

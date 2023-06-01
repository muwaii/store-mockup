import "./styles/ProductsComponent.css";
import { useEffect, useState } from "react";
import { addToCart, getAllProducts, getProductsByCategory } from "./api/api";
import { useSelector, useDispatch } from "react-redux";
import { setItems, setSort } from "../store/itemSlice";
import { useParams } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  Image,
  List,
  message,
  Rate,
  Select,
  Spin,
  Typography,
} from "antd";

function Products() {
  const param = useParams();
  const dispatch = useDispatch();
  const { theProducts } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);

  // GET PRODUCT
  useEffect(() => {
    // categoryId มาจาก AppRoutes.js
    setLoading(true);
    // ถ้า param.categoryId เป็น undefind ก็ไปทำ getAllProducts() แทน
    // ?. คืออะไร https://www.freecodecamp.org/news/how-the-question-mark-works-in-javascript/
    (param?.categoryId
      ? getProductsByCategory(param.categoryId)
      : getAllProducts()
    ).then((res) => {
      dispatch(setItems(res.products));
      setLoading(false);
    });
  }, [param]);

  // COMPONENT for Each ADD-TO-CART-BUTTON
  // item คือ prop ที่รับมา
  function AddToCardButtong({ item }) {
    const [loading, setLoading] = useState(false);
    function addProductToCart() {
      setLoading(true);
      addToCart(item.id).then((res) => {
        message.success(`${item.title} has been added to cart`);
        setLoading(false);
      });
    }
    return (
      <Button
        type="link"
        onClick={() => {
          addProductToCart();
        }}
        // Loading...
        loading={loading}
      >
        Add to cart
      </Button>
    );
  }

  // Function
  function getSortedItems() {
    const sortedItems = [...theProducts.items];

    // sortedItems.sort((a, b) => {
    //   if (theProducts.sort === "az") {
    //     return a.title > b.title ? 1 : a.title === b.title ? 0 : -1;
    //   } else if (theProducts.sort === "za") {
    //     return a.title > b.title ? 1 : a.title === b.title ? 0 : -1;
    //   } else if (theProducts.sort === "lowHigh") {
    //     return a.price > b.price ? 1 : a.price === b.price ? 0 : -1;
    //   } else if (theProducts.sort === "highLow") {
    //     return a.price < b.price ? 1 : a.price === b.price ? 0 : -1;
    //   }
    // });

    sortedItems.sort((a, b) => {
      const aLowerCaseTitle = a.title.toLowerCase();
      const bLowerCaseTitle = b.title.toLowerCase();

      if (theProducts.sort === "az") {
        return aLowerCaseTitle > bLowerCaseTitle
          ? 1
          : aLowerCaseTitle === bLowerCaseTitle
          ? 0
          : -1;
      } else if (theProducts.sort === "za") {
        return aLowerCaseTitle < bLowerCaseTitle
          ? 1
          : aLowerCaseTitle === bLowerCaseTitle
          ? 0
          : -1;
      } else if (theProducts.sort === "lowHigh") {
        return a.price - b.price;
      } else if (theProducts.sort === "highLow") {
        return b.price - a.price;
      }
    });

    return sortedItems;
  }

  // Loading...
  // if (loading) {
  //   return <Spin spinning />;
  // }
  // *** RETURN ***
  return (
    <div className="products-container">
      {/* <div>itemsssss69---{String(theProducts.loading)}</div> */}
      {/* <div> */}
      <Typography.Text>Sorted By:</Typography.Text>
      <Select
        defaultValue={"az"}
        options={[
          { label: "Alphabettically a-z", value: "az" },
          { label: "Alphabettically z-a", value: "za" },
          { label: "Price Low to High", value: "lowHigh" },
          { label: "Price High to Low", value: "highLow" },
        ]}
        onChange={(value) => {
          dispatch(setSort(value));
        }}
      ></Select>
      {/* </div> */}
      <List
        loading={loading}
        // dataSource={theProducts.items}
        dataSource={getSortedItems()}
        grid={{ column: 3 }}
        // n ก็คือ theProducts.items[i] ในแต่ละรอบ โดยที่ i คือจำนวนใน array
        renderItem={(n, index) => {
          return (
            <Badge.Ribbon
              className="item-card-badge"
              text={`${n.discountPercentage}% off`}
              color="red"
            >
              <Card
                className="item-card"
                title={n.title}
                key={index}
                cover={<Image className="item-card-image" src={n.thumbnail} />}
                actions={[
                  <Rate allowHalf disabled value={n.rating} />,
                  // ส่ง n เป็น prop ให้กับ component
                  <AddToCardButtong item={n} />,
                ]}
              >
                <Card.Meta
                  title={
                    <Typography.Paragraph>
                      Price: ${n.price}{" "}
                      <Typography.Text delete type="danger">
                        $
                        {parseFloat(
                          (n.price * n.discountPercentage) / 100
                        ).toFixed(2)}
                      </Typography.Text>
                    </Typography.Paragraph>
                  }
                  description={
                    <Typography.Paragraph
                      ellipsis={{ row: 1, expandable: true, symbol: "more" }}
                    >
                      {n.description}
                    </Typography.Paragraph>
                  }
                ></Card.Meta>
              </Card>
            </Badge.Ribbon>
          );
        }}
      ></List>
    </div>
  );
}

export default Products;

import { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingAddress } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import PlaceOrderPage from "./PlaceOrderPage";

const ShippingPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { shippingAddress } = useSelector((state) => state.cart);
  const [recipient, setRecipient] = useState(userInfo.name);
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [phone, setPhone] = useState(shippingAddress.phone || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ recipient, address, city, phone }));
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <h2>Shipping Address</h2>
      <Form onSubmit={submitHandler} className="my-4">
        <Form.Group controlId="recipient" className="my-2">
          <Form.Label>Recipient Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="recipient" className="my-2">
          <Form.Label>Contact</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Contact"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="address" className="my-2">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="house no./building/street/area"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="city" className="my-2">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="province/City/District"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="dark" className="my-2">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;

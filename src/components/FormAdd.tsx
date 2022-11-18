import React, { FormEvent, useState } from "react";
import {
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  Toast,
  ToastHeader,
} from "reactstrap";
import { User } from "../features/usersSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addUser } from "../features/usersSlice";

const FormAdd = () => {
  const [toastOn, setToastOn] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((store) => store.users);

  const [formObj, setFormObj] = useState<User>({
    id: users.length + Math.floor(Math.random() * 1000),
    name: "",
    email: "",
    gender: "male",
    address: {
      street: "",
      city: "",
    },
    phone: "",
  });

  const onChangeObj = (e: React.SyntheticEvent) => {
    e.preventDefault();

    let target = e.target as HTMLInputElement;

    setFormObj((prev) => ({
      ...prev,
      [target.name]: target.value,
      address: {
        ...prev.address,
      },
    }));
  };
  const onChangeObjAdre = (e: React.SyntheticEvent) => {
    e.preventDefault();

    let target = e.target as HTMLInputElement;

    setFormObj((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [target.name]: target.value,
      },
    }));
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (name && email && address.city && address.street && phone) {
      dispatch(addUser(formObj));
      setFormObj({
        id: users.length + Math.floor(Math.random() * 1000),
        name: "",
        email: "",
        gender: "Male",
        address: {
          street: "",
          city: "",
        },
        phone: "",
      });
    } else {
      setToastOn(true);

      setTimeout(() => {
        setToastOn(false);
      }, 3000);
    }
  };

  const { name, email, gender, address, phone } = formObj;
  console.log(formObj);
  return (
    <Form style={{ marginBlock: "50px" }} onSubmit={onSubmit}>
      {toastOn && (
        <Toast>
          <ToastHeader icon="danger">Please add all fields</ToastHeader>
        </Toast>
      )}
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleEmail">name</Label>
            <Input
              id="name"
              value={name.trim()}
              name="name"
              onChange={(e) => onChangeObj(e)}
              placeholder="name"
              type="text"
              required
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="examplePassword">email</Label>
            <Input
              id="email"
              value={email.trim()}
              name="email"
              placeholder="email"
              onChange={(e) => onChangeObj(e)}
              type="email"
              required
            />
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label for="phone">phone</Label>
        <Input
          id="phone"
          value={phone.trim()}
          name="phone"
          placeholder="phone number"
          onChange={(e) => onChangeObj(e)}
        />
      </FormGroup>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="street">street</Label>
            <Input
              id="street"
              value={address.street.trim()}
              name="street"
              placeholder="street"
              onChange={(e) => onChangeObjAdre(e)}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="city">city</Label>
            <Input
              id="city"
              value={address.city.trim()}
              name="city"
              placeholder="city"
              onChange={(e) => onChangeObjAdre(e)}
            />
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label for="exampleSelect">gender</Label>
        <Input
          id="gender"
          name="gender"
          value={gender}
          type="select"
          onChange={(e) => onChangeObj(e)}
        >
          <option>male</option>
          <option>female</option>
        </Input>
      </FormGroup>
      <Button>Add user</Button>
    </Form>
  );
};

export default FormAdd;

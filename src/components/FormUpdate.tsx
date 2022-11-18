import React, { useEffect, useState } from "react";
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
import { User, updateOff } from "../features/usersSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { updateUser } from "../features/usersSlice";

const FormAdd = () => {
  const [toastOn, setToastOn] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { users, updateId } = useAppSelector((store) => store.users);

  const [filterUser, setFilterUser] = useState(
    users.filter((item) => item.id === updateId)
  );

  useEffect(() => {
    setFilterUser(users.filter((item) => item.id === updateId));
  }, [dispatch, updateId]);

  console.log(filterUser);

  const [formObj, setFormObj] = useState<User>({
    id: filterUser[0].id,
    name: filterUser[0].name,
    email: filterUser[0].email,
    gender: filterUser[0].gender,
    address: {
      street: filterUser[0].address.street,
      city: filterUser[0].address.city,
    },
    phone: filterUser[0].phone,
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
      dispatch(updateUser(formObj));
      setFormObj({
        id: 0,
        name: "",
        email: "",
        gender: "male",
        address: {
          street: "",
          city: "",
        },
        phone: "",
      });
      dispatch(updateOff());
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
    <Form
      style={{
        marginBlock: "50px",
        padding: "50px",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        borderRadius: "10px",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 10,
      }}
      onSubmit={onSubmit}
    >
      {toastOn && (
        <Toast>
          <ToastHeader icon="danger">Please add all fields</ToastHeader>
        </Toast>
      )}
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleEmail" style={{ color: "white" }}>
              name
            </Label>
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
            <Label for="examplePassword" style={{ color: "white" }}>
              email
            </Label>
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
        <Label for="phone" style={{ color: "white" }}>
          phone
        </Label>
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
            <Label for="street" style={{ color: "white" }}>
              street
            </Label>
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
            <Label for="city" style={{ color: "white" }}>
              city
            </Label>
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
        <Label for="exampleSelect" style={{ color: "white" }}>
          gender
        </Label>
        <Input
          id="gender"
          name="gender"
          value={gender}
          type="select"
          onChange={(e) => onChangeObj(e)}
        >
          <option selected={gender === "male"}>male</option>
          <option selected={gender === "female"}>female</option>
        </Input>
      </FormGroup>
      <Button color="primary">Update</Button>
    </Form>
  );
};

export default FormAdd;

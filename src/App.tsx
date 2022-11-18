import { useEffect, useState } from "react";
import GlobalStyle from "./components/styles/Global";
import DataTable, { TableColumn } from "react-data-table-component";
import {
  fetchUsers,
  deleteUser,
  setId,
  updateOnFunc,
  updateOff,
} from "./features/usersSlice";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { Spinner, SpinnerCont } from "./components/styles/Spinner";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import FormAdd from "./components/FormAdd";
import FormUpdate from "./components/FormUpdate";
import Chart from "react-apexcharts";
import { Center } from "./components/styles/Center";
function App() {
  interface Result {
    city: string;
    occurrences: number | string;
  }

  const dispatch = useAppDispatch();

  const [onOff, seOnOff] = useState<boolean>(false);

  const { users, loading, updateOn } = useAppSelector((state) => state.users);

  let [result, setResult] = useState<Result[]>([]);

  useEffect(() => {
    let output: Result[] = Object.values(
      users.reduce((obj: any, { address: { city } }) => {
        if (obj[city] === undefined) obj[city] = { city: city, occurrences: 1 };
        else obj[city].occurrences++;
        return obj;
      }, {})
    );

    setResult(output);

    console.log(result);
  }, [dispatch, users]);

  interface Address {
    street: string;
    city: string;
  }

  interface User {
    id?: number | string;
    name: string;
    email: string;
    gender: string;
    address: Address;
    phone: string;
  }

  const columns: TableColumn<User>[] = [
    {
      name: "Title",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
    },
    {
      name: "City",
      selector: (row) => row.address.city,
    },
    {
      name: "Street",
      selector: (row) => row.address.street,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      cell: (row) => (
        <Button size="sm" onClick={() => dispatch(deleteUser(Number(row.id)))}>
          Remove
        </Button>
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (loading)
    return (
      <>
        <GlobalStyle />
        <SpinnerCont>
          <Spinner></Spinner>
        </SpinnerCont>
      </>
    );

  return (
    <>
      <GlobalStyle />
      {updateOn && <FormUpdate />}

      {onOff ? (
        <Button
          color="danger"
          onClick={() => seOnOff(!onOff)}
          style={{ marginLeft: "5px" }}
        >
          close
        </Button>
      ) : (
        <Button
          color="primary"
          onClick={() => seOnOff(!onOff)}
          style={{ marginLeft: "5px" }}
        >
          open
        </Button>
      )}
      {onOff && <FormAdd />}
      <DataTable
        columns={columns}
        data={users}
        onRowDoubleClicked={(row) => {
          dispatch(setId(Number(row.id)));
          dispatch(updateOnFunc());
        }}
        onRowClicked={(row) => {
          dispatch(updateOff());
        }}
      />
      <Center>
        <Chart
          type="pie"
          width={500}
          height={500}
          series={result.map((item: any) => item.occurrences)}
          options={{
            labels: result.map((item) => item.city),
          }}
        />
      </Center>
    </>
  );
}

export default App;

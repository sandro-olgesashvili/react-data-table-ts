import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
export interface Address {
  street: string;
  city: string;
}

export interface User {
  id?: number | string;
  name: string;
  email: string;
  gender: string;
  address: Address;
  phone: string;
}

export interface UsersState {
  users: User[];
  loading: boolean;
  message: string;
  updateId:number;
  updateOn:boolean
}

const initialState: UsersState = {
  users: [],
  loading: false,
  message: "",
  updateId:0,
  updateOn: false
};

export const fetchUsers = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:4000/users`);
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (data:number, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:4000/users/${data}`, {
        method: "DELETE",
      })
      return data
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const addUser = createAsyncThunk("users/addUser", async(data:User, {rejectWithValue}) => {
  try {
    const response = await fetch("http://localhost:4000/users/", {
      method:"POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    return data
  } catch (error) {
    return rejectWithValue((error as Error).message)
    
  }
})

export const updateUser = createAsyncThunk<User, User, {state: RootState}>("users/updateUser", async(data ,{rejectWithValue, getState}) => {
  try {
    const response = await fetch(`http://localhost:4000/users/${getState().users.updateId}`, {
      method:"PUT",
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(data)
    })
    return data = await response.json()

  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setId: (state, action:PayloadAction<number>) => {
      state.updateId= action.payload
    },
    updateOnFunc: (state) => {
      state.updateOn= true
    },
    updateOff: (state) => {
      state.updateOn = false
    }
   },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.users = state.users.filter((item) => item.id !== action.payload)
      })
      .addCase(deleteUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.users.push(action.payload)
      })
      .addCase(addUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.users = state.users.map(item => item.id === action.payload.id ? {...action.payload}: item)
      })
      .addCase(updateUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.message = action.payload;
      });
  },
});

export const {setId, updateOff, updateOnFunc} = usersSlice.actions;

export default usersSlice.reducer;

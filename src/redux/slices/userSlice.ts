import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
  password: string;
  status?: string;  // status opsional untuk user
}

interface UserState {
  users: User[];
  loggedInUser: User | null;
  status: string;
}

const initialState: UserState = {
  users: [], // Daftar pengguna awal kosong
  loggedInUser: null, // Tidak ada pengguna yang login di awal
  status: "loggedOut", // Status login awal
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    register: (state, action: PayloadAction<User>) => {
      // Menambahkan status pada user saat registrasi
      const newUser: User = {
        ...action.payload,
        status: "Registered", // Status default saat registrasi
      };
      state.users.push(newUser); // Menambahkan user baru ke state
    },
    
    login: (state, action: PayloadAction<{ email: string; password: string }>) => {
      const user = state.users.find(
        (user: User) =>
          user.email === action.payload.email &&
          user.password === action.payload.password
      );
      if (user) {
        state.loggedInUser = user;
        state.status = "loggedIn";
      }
    },
    
    logout: (state) => {
      state.loggedInUser = null; // Mengatur loggedInUser ke null saat logout
      state.status = "loggedOut"; // Mengubah status ke loggedOut
    }
  },
});

export const { login, logout, register } = userSlice.actions;

export const selectUser = (state: { user: UserState }) => state.user.loggedInUser;
export const selectUserStatus = (state: { user: UserState }) => state.user.status;

export default userSlice.reducer;

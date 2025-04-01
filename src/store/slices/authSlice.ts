import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/services/api';

interface User {
  id: number;
  email: string;
  businessName: string | null;
  isSalesperson: boolean;
  onboarding_completed: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  onboardingCompleted: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  onboardingCompleted: false,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', credentials);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const signup = createAsyncThunk(
  'auth/signup',
  async (credentials: { 
    email: string; 
    password: string;
    isSalesperson: boolean;
    referralCode?: string 
  }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/signup', credentials);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userEmail', credentials.email);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    } catch (error: any) {
      console.log(error.response?.data?.message)
      return rejectWithValue(
        error.response?.data?.message || 
        'An email already exist'
      );
    }
  }
);

export const updateBusinessProfile = createAsyncThunk(
  'auth/updateProfile',
  async (data: any) => {
    const response = await api.put('/business/profile', data);
    return response.data;
  }
);

export const completeOnboarding = createAsyncThunk(
  'auth/completeOnboarding',
  async (data: BusinessData) => {
    const response = await api.post('/auth/complete-onboarding', data);
    return response.data;
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    api.defaults.headers.common['Authorization'] = '';
    return null;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.onboardingCompleted = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.onboardingCompleted = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.onboardingCompleted = false;
      })
      .addCase(updateBusinessProfile.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload.business };
      })
      .addCase(completeOnboarding.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.onboardingCompleted = true;
      });
  },
});

export const { clearAuth, setUser } = authSlice.actions;
export default authSlice.reducer; 
import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';

// Majority of this store was used in the './features/counter/Arithemetic.tsx' and './features/color/Theme.tsx' files and a bit of this store was used in './app/Routes.tsx' file
type CounterStore = {
  count: number;
  increment: () => void;
  incrementAsync: () => Promise<void>;
  decrement: () => void;
};

type ThemeStore = {
    color: string;
    changeTheme: () => void;
  };


  type BoundaryStore = {
    boundary: number;
    setBoundary: () => void;
  };


type AuthStore = {
  isAuthenticated: boolean;
  authenticate: () => void;
  disauthenticate: () => void;
  reset: () => void
};

// define types for state values without and actions with a null operator to enable & use an initialState object
type UserStore = {
  name: string
  token: string
  id: string
  age: number
  changeName?: (newName: string) => void
  addAge?: (extra: number) => void
  changeId?: (newId: string) => void
  changeUser?: (user: Partial<UserStore>) => void; // Use Partial<UserStore> to allow partial updates  
  reset?: () => void
}

// define the initial state
const initialUserState: UserStore = {
  name: 'EEdris',
  token: 'hdvjsd783834h4g874fy4872872f',
  id: '784894309298347894093',
  age: 20
}


// This depicts a single state and it manipulation. simpky a basic store setup
export const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => {
    set((state) => ({ count: state.count + 1 }));
  },
  incrementAsync: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set((state) => ({ count: state.count + 1 }));
  },
  decrement: () => {
    set((state) => ({ count: state.count - 1 }));
  },
}));

export const useThemeStore = create<any>(
    persist(
      (set) => ({
        color: 'light', // initial theme is light
        setTheme: () => {
          set((state: any) => ({ color: state.color === 'light' ? 'dark' : 'light' }));
        },
      }),
      {
        name: 'theme-storage', // name of the item in the storage (must be unique)
        storage: createJSONStorage(() => AsyncStorage), // Using AsyncStorage instead of sessionStorage
      },
    ),
  );


  export const useBoundaryStore = create<any>(
    persist(
      (set) => ({
        boundary: 0, // initial boundary is 200
        setBoundary: (value: number) => {
          set({ boundary: value });
        },
      }),
      {
        name: 'bound-storage', // name of the item in the storage (must be unique)
        storage: createJSONStorage(() => AsyncStorage), // Using AsyncStorage instead of sessionStorage
      },
    ),
  );

export const useAuthStore = create<any>(
  persist(
  (set) => ({
  isAuthenticated: false,
  authenticate: () => {
    set((state) => ({ isAuthenticated: true }));
  },
  disauthenticate: () => {
    set((state) => ({ isAuthenticated: false }));
  },
  reset: () => {
    set((state) => ({ isAuthenticated: false }));
  },
}),
{
  name: 'auth-storage', // name of the item in the storage (must be unique)
  storage: createJSONStorage(() => AsyncStorage), // Using AsyncStorage instead of sessionStorage
},
),
);

// This depicts how to have multiple states and manipulate them in one store
export const useUserStore = create<UserStore>()((set, get) => ({
  ...initialUserState,
  changeName: (newName: string) => {
    set({ name: newName })
  },
  changeId: (newId: string) => {
    set({ id: newId })
  },
  addAge: (extra: number) => {
    set({ age: get().age + extra })
  },
  changeUser: (user: Partial<UserStore>) => {
    set({ ...get(), ...user }); // Corrected way to update the store with a new user object
  },
  reset: () => {
    set(initialUserState)
  },
}))
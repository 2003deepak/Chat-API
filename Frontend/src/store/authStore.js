import { create } from "zustand";
import { persist } from "zustand/middleware";

const authStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      role: null,
      user: null,

      setLogIn: (userId, userRole) =>
        set(() => ({
          isLoggedIn: true,
          role: userRole,
          user: userId,
        })),

      setLogOut: () =>
        set(() => ({
          isLoggedIn: false,
          role: null,
          user: null,
        })),
    }),
    {
      name: "auth-storage", 
      getStorage: () => localStorage, 
    }
  )
);

export default authStore;

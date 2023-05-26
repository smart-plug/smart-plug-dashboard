import { create } from 'zustand';

type State = {
  username: string;
  userId: string;
};

type Action = {
  updateUsername: (username: State['username']) => void;
  updateUserId: (userId: State['userId']) => void;
};

const useStore = create<State & Action>(set => ({
  username: '',
  userId: '',
  updateUsername: username => set(() => ({ username: username })),
  updateUserId: userId => set(() => ({ userId: userId })),
}));

export { useStore };

// import { getAllCloths } from './data/sheet/data';
// import { create } from 'zustand';

// type Store = {
//   items: any[];
//   count: number;
//   pageNumber: number;
//   getAllCloths: (page: number) => void;
// };

// export const useStore = create<Store>((set) => ({
//   items: [],
//   count: 0,
//   pageNumber: 1,
//   getAllCloths: async (page) => {
//     try {
//       const { items, count } = await getAllCloths({ page });
//       console.log(items);

//       if (!items || !count) {
//         console.log('No data returned from getAllCloths');
//         return;
//       }

//       set({ items, count, pageNumber: page });
//     } catch (error) {
//       console.error('Error fetching cloths:', error);
//     }
//   },
// }));

// export default useStore;

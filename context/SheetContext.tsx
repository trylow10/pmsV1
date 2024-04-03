// 'use client';
// import React, { createContext, useState } from 'react';

// interface SheetContextData {
//   sheetId: string | null;
//   setSheetId: (id: string | null) => void;
// }

// export const SheetContext = createContext<SheetContextData>({
//   sheetId: null,
//   setSheetId: () => {},
// });

// export const SheetProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [sheetId, setSheetId] = useState<string | null>(null);

//   return (
//     <SheetContext.Provider value={{ sheetId, setSheetId }}>
//       {children}
//     </SheetContext.Provider>
//   );
// };

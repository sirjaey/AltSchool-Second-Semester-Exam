"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export default function ReactQueryProvider({ children }: { children: ReactNode }) {
    // Create queryClient only once per app instance
    const [queryClient] = useState(() => new QueryClient());

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}


// // app/providers.tsx

// "use client"; // Important for components using React hooks

// import React from "react";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// // Create a client instance
// const queryClient = new QueryClient();

// export default function Providers({ children }: { children: React.ReactNode }) {
//     return (
//         // Provide the client to the app
//         <QueryClientProvider client={queryClient}>
//             {children}
//         </QueryClientProvider>
//     );
// }
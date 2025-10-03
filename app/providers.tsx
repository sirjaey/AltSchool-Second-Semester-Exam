// "use client";

// import React from "react";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


// const queryClient = new QueryClient();

// export default function Providers({ children }: { children: React.ReactNode }) {
//     return (
//         // Provide the client to the app
//         <QueryClientProvider client={queryClient}>
//             {children}
//         </QueryClientProvider>
//     );
// }

// app/providers.tsx (CORRECTED)
"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Providers({ children }: { children: React.ReactNode }) {

    const [queryClient] = React.useState(() => new QueryClient({

        defaultOptions: {
            queries: {
                staleTime: 5 * 1000, // 5 seconds
            },
        },
    }));

    return (

        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
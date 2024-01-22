//custom.d.ts

interface ImportMeta {
  env: {
    VITE_ADMIN_API_BASE_URL:string;
    VITE_SERVER_URL:string;
    VITE_USER_API_BASE_URL:string;
    VITE_GOOGLE_ONETAP: string;
    VITE_MAPBOX_TOKEN: string;
    VITE_CE_PRIVATE_KEY: string;
    VITE_CE_PROJECT_ID: string;
    VITE_STRIPE_PUBLIC_KEY: string;
  };
}

declare module "@fortawesome/free-solid-svg-icons";
declare module "react-chat-engine";

//custom.d.ts

interface ImportMeta {
  env: {
    VITE_GOOGLE_ONETAP: string;
    VITE_MAPBOX_TOKEN: string;
    DROP_IMAGE: string;
    REACT_APP_PUBLIC_FOLDER: string;
    VITE_CE_PRIVATE_KEY: string;
    VITE_CE_PROJECT_ID: string;
    VITE_STRIPE_PUBLIC_KEY: string;
  };
}

declare module "@fortawesome/free-solid-svg-icons";
declare module "react-chat-engine";

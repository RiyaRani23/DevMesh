//export const BASE_URL = "http://localhost:3000";
export const DEFAULT_PHOTO_URL = "https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png";
export const BASE_URL = process.env.NODE_ENV === "production" 
    ? "https://dev-mesh-dxdb.vercel.app" 
    : "http://localhost:3000";
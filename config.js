const config = {
    mails: import.meta.env.VITE_MAILS_API,
    users: import.meta.env.VITE_USERS_API,
    googleClientID: import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID,
    AccessToken: import.meta.env.VITE_ACCESS_TOKEN_NAME,
    RefreshToken: import.meta.env.VITE_REFRESH_TOKEN_NAME,
    EditorKey:import.meta.env.VITE_EDITOR_API_KEY
}
export default config;
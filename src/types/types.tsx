export type Props = {
    children?: any;
    title?: string;
}

export type RouteProperties = {
    path: string,
    page: React.FC,
    isAuthenticated?: boolean
}
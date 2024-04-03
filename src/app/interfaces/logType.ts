export interface LogTypesResult {
    success: boolean;
    errors: {};
    messagesCodes: boolean;
    object: LogType[];
    total: number;
    offset: number;
    limit: number;
    totalPages: number;
}

export interface LogType {
    idLogType: number;
    logTypeName: string;
}

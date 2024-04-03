import { LogType } from './logType';
export interface LogsResult {
    success: boolean;
    errors: {};
    messagesCodes: boolean;
    objects: Log[];
    total: number;
    offset: number;
    limit: number;
    totalPages: number;
}

export interface Log {
    idLog: number;
    logType: LogType;
    description: string;
    trace: string;
    serviceName: string;
    registrationDate: number;
    username: string;
    error: string;
    businessName: string;
    // Auxiliares de la vista
    rowSelected?: boolean;
}

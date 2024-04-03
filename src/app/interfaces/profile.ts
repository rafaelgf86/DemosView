// Individual
export interface ProfilesResult {
    success: boolean;
    errors: {};
    messagesCodes: boolean;
    object: Profile[];
}

export interface Profile {
    idProfile: number;
    description: string;
    name: string;
}


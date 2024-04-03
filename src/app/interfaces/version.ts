export interface VersionResult {
    success: boolean;
    errors: {};
    messagesCodes: boolean;
    object: Version;
}

export interface Version {
    versionDate: string;
    versionNumber: string;
    urlLogo: string;
    urlPrivacyPolicies: string;
    urlDocumentation: string;
    emailContact: string;
}

interface ExtensionCredentialsContainer {
    create(options?: CredentialCreationOptions): Promise<Credential | null>;
    get(options?: CredentialRequestOptions): Promise<Credential | null>;
    store(credential: Credential): Promise<void>;
}

interface ExtensionCredentialManager {
    registerContainer(credentialsContainer: ExtensionCredentialsContainer): Promise<void>;
    isActiveContainer(): boolean;
}

declare namespace chrome {
    var credentials: ExtensionCredentialManager;
}

declare namespace browser {
    var credentials: ExtensionCredentialManager;
}
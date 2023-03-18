const credentialsContainer: ExtensionCredentialsContainer = {
    create(options: CredentialCreationOptions | undefined): Promise<Credential | null> {
        console.log("Demo Extension: credentials.create");
        return Promise.resolve(null);
    },
    get(options: CredentialRequestOptions | undefined): Promise<Credential | null> {
        console.log("Demo Extension: credentials.get");
        return Promise.resolve(null);
    },
    store(credential: Credential): Promise<void> {
        console.log("Demo Extension: credentials.store");
        return Promise.resolve();
    }
}

// @ts-ignore
global.credentials.registerContainer(credentialsContainer)
    .then(() => {
        console.log("Demo extension credential container successfully registered");
    })
    .catch(() => {
        console.error("Demo extension failed to register credential container");
    });

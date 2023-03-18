let global: any;

// @ts-ignore
if (globalThis.browser?.runtime.id) {
    global = browser;
} else if (globalThis.chrome?.runtime.id) {
    global = chrome;
}

const credentials: ExtensionCredentialManager = {
    registerContainer: (credentialsContainer: ExtensionCredentialsContainer) => {
        const credentialsManifest = chrome.runtime.getManifest();
        if (!credentialsManifest.credentials)
            throw new Error("browser.credentials requires a credentials decleration in the manifest.");

        if (!credentialsManifest.credentials.supportedTypes)
            throw new Error("browser.credentials requires a supportedTypes decleration in the credentials section in the manifest.");

        // @ts-ignore
        credentialsContainer.create = credentialsContainer.create.toString();
        // @ts-ignore
        credentialsContainer.get = credentialsContainer.get.toString();
        // @ts-ignore
        credentialsContainer.store = credentialsContainer.store.toString();

        const scriptUrl = chrome.runtime.getURL('/dist/page-scripts/credentials-overrider.js');
        let script = document.createElement('script');
        script.setAttribute("credentialsContainer", JSON.stringify(credentialsContainer));
        script.setAttribute("supportedTypes", JSON.stringify(credentialsManifest.credentials.supportedTypes));
        script.src = scriptUrl;
        document.documentElement.insertBefore(script, document.head);

        return Promise.resolve();
    },
    isActiveContainer(): boolean {
        const credentialsManifest = chrome.runtime.getManifest();
        if (!credentialsManifest.credentials)
            throw new Error("browser.credentials requires a credentials decleration in the manifest.");

        if (!credentialsManifest.credentials.supportedTypes)
            throw new Error("browser.credentials requires a supportedTypes decleration in the credentials section in the manifest.");

        return true;
    }
}

// Attach to browser namespace in Firefox/Safari
// @ts-ignore
if (globalThis.browser?.runtime?.id) {
    browser.credentials = credentials;
}

// Attach to chrome namespace in all browsers
if (globalThis.chrome?.runtime?.id) {
    chrome.credentials = credentials;
}

import { LitElement } from 'lit';

export const shadowRootOptions = {
    ...LitElement.shadowRootOptions,

    mode: (import.meta.env.DEV ? 'open' : 'closed') as ShadowRootMode,
};

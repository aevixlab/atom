import { LitElement, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createRef, type Ref } from 'lit/directives/ref.js';
import { when } from 'lit/directives/when.js';
import { html } from 'lit/static-html.js';
import { shadowRootOptions } from '../../utils';
import { attrs } from '../../utils/attrs';
import { AtomButtonStyles } from './styles';

@customElement('atom-button')
export class AtomButton extends LitElement {
    static shadowRootOptions = shadowRootOptions;

    static styles = [...AtomButtonStyles];

    #name = 'button';

    #root: Ref<HTMLElement> = createRef();

    #rootAttrs = {
        part: 'root',
    };

    #internals: ElementInternals;

    @property({ type: String, attribute: 'href', reflect: true, useDefault: true })
    href: string | null = null;

    constructor() {
        super();

        this.#internals = this.attachInternals();
    }

    protected render() {
        return html`
            ${when(
                this.href === null,
                () => this.#linkVariant(),
                () => this.#buttonVariant(),
            )}
        `;
    }

    #content() {
        return html`
            <slot name="left" part="left"></slot>
            <slot part="center"></slot>
            <slot name="right" part="right"></slot>
        `;
    }

    #linkVariant() {
        return html`
            <a ${attrs(this.#rootAttrs)} .href=${this.href}>
                ${this.#content()}
            </a>
        `;
    }
    #buttonVariant() {
        return html`
            <button ${attrs(this.#rootAttrs)}>
                ${this.#content()}
            </button>
        `;
    }

    protected updated(_changedProperties: PropertyValues): void {}
}

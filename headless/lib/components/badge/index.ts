import { LitElement, type PropertyValues } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators.js';
import { createRef, type Ref, ref } from 'lit/directives/ref.js';
import { when } from 'lit/directives/when.js';
import { html } from 'lit/html.js';
import { shadowRootOptions } from '../../utils';
import { attrs } from '../../utils/attrs';
import { type SlotsStateController, slotsState } from '../../utils/slots';
import { AtomBadgeStyles } from './styles';

@customElement('atom-badge')
export class AtomBadge extends LitElement {
    static shadowRootOptions = shadowRootOptions;

    static styles = [...AtomBadgeStyles];

    private name = 'badge';

    private root: Ref<HTMLElement> = createRef();

    private rootAttrs = {
        part: 'root',
    };

    @slotsState()
    private slots!: SlotsStateController;

    #internals: ElementInternals;

    @property({ type: String, reflect: true, attribute: 'href', useDefault: true })
    href: string | null = null;

    constructor() {
        super();

        this.#internals = this.attachInternals();
    }

    protected render() {
        return html`
            <div ${ref(this.root)} ${attrs(this.rootAttrs)}>
                <slot part="left" name="left"></slot>
                <slot part="center"></slot>
                <slot part="right" name="right"></slot>
            </div>
        `;
    }

    protected override updated(changedProperties: PropertyValues): void {
        this.#internals.role = this.href !== null ? 'link' : 'note';
        this.setAttribute('role', this.#internals.role);
        if (changedProperties.has('href')) {
            if (this.href !== null) {
                this.setAttribute('tabindex', '0');
            } else {
                this.setAttribute('tabindex', '-1');
            }
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'atom-badge': AtomBadge;
    }
}

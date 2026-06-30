import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { syncAttr } from '../../utils/attrs';

@customElement('atom-progress')
export class AtomProgress extends LitElement {
    static styles = css`
        :host {
          display: block;

          --track-bg: var(--atom-progress-track-bg, #e0e0e0);
          --fill-bg: var(--atom-progress-fill-bg, #4caf50);
          --height: var(--atom-progress-height, 12px);
          --radius: var(--atom-progress-radius, 6px);
          --transition: var(--atom-progress-transition, width 0.3s ease);

          background-color: lightgray;
          padding: 8px;
        }
        :host(.blue) {
          background-color: aliceblue;
          color: darkgreen;
        }

        :host([hidden]) {
          display: none;
        }

        :host [part=track] {
          background: var(--track-bg);
          height: var(--height);
          border-radius: var(--radius);
          overflow: hidden;
          position: relative;
        }

        :host [part=fill] {
          height: 100%;
          width: 0%;
          background: var(--fill-bg);
          border-radius: var(--radius);
          transition: var(--transition);
        }
      `;

    #internals: ElementInternals;

    @property({ type: Number, attribute: 'min', reflect: true })
    min: number = 0;

    @property({ type: Number, attribute: 'value', reflect: true })
    value: number = 0;

    @property({ type: Number, attribute: 'max', reflect: true })
    max: number = 100;

    @property({ type: String, attribute: 'label' })
    label: string = '';

    @property({ type: Boolean, attribute: 'indeterminate', reflect: true })
    indeterminate: boolean = false;

    constructor() {
        super();
        this.setAttribute('role', 'progressbar');
        this.#internals = this.attachInternals();
        this.#internals.role = 'progressbar';
        this.#updateAria();
    }

    #updateAria() {
        const i = this.#internals;

        if (this.indeterminate) {
            syncAttr(this, 'aria-valuenow', null);
            syncAttr(this, 'aria-valuemin', null);
            syncAttr(this, 'aria-valuemax', null);
            syncAttr(this, 'aria-valuetext', null);

            i.ariaValueNow = null;
            i.ariaValueMin = null;
            i.ariaValueMax = null;
            i.ariaValueText = null;
        } else {
            const now = String(this.value);
            const min = String(this.min);
            const max = String(this.max);
            const text = `${this.value} of ${this.max}`;

            syncAttr(this, 'aria-valuenow', now);
            syncAttr(this, 'aria-valuemin', min);
            syncAttr(this, 'aria-valuemax', max);
            syncAttr(this, 'aria-valuetext', text);

            i.ariaValueNow = now;
            i.ariaValueMin = min;
            i.ariaValueMax = max;
            i.ariaValueText = text;
        }

        syncAttr(this, 'aria-label', this.label || null);
        i.ariaLabel = this.label || null;

        const disabled = this.hasAttribute('disabled') ? 'true' : null;
        syncAttr(this, 'aria-disabled', disabled);
        i.ariaDisabled = disabled;
    }

    override updated(changed: Map<string, unknown>) {
        if (
            changed.has('value') ||
            changed.has('min') ||
            changed.has('max') ||
            changed.has('label') ||
            changed.has('indeterminate')
        ) {
            this.#updateAria();
        }
    }

    override render() {
        const pct = this.indeterminate
            ? 100
            : this.max > this.min
              ? ((this.value - this.min) / (this.max - this.min)) * 100
              : 0;

        return html`
            <div part="track">
                <div
                  part="fill"
                  style=${this.indeterminate ? '' : `width: ${pct}%`}
                ></div>
            </div>
        `;
    }

    static shadowRootOptions = {
        ...LitElement.shadowRootOptions,

        mode: (import.meta.env.DEV ? 'open' : 'closed') as ShadowRootMode,
    };
}

declare global {
    interface HTMLElementTagNameMap {
        'atom-progress': AtomProgress;
    }
}

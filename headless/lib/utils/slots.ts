import type { ReactiveController, ReactiveControllerHost } from 'lit';

type SlotState = {
    empty: boolean;
    nodes: Element[];
};

export class SlotsStateController implements ReactiveController {
    private host: ReactiveControllerHost & HTMLElement;

    private slots = new Map<string, SlotState>();

    constructor(host: ReactiveControllerHost & HTMLElement) {
        this.host = host;
        host.addController(this);
    }

    hostConnected() {
        requestAnimationFrame(() => this.init());
    }

    private init() {
        const root = this.host.shadowRoot;
        if (!root) return;

        const slots = Array.from(root.querySelectorAll('slot'));

        const update = () => {
            let changed = false;

            for (const slot of slots) {
                const name = slot.getAttribute('name') ?? 'default';

                const nodes = slot
                    .assignedNodes({ flatten: true })
                    .filter(n => n.nodeType === Node.ELEMENT_NODE) as Element[];

                const empty = nodes.length === 0;

                const prev = this.slots.get(name);

                if (!prev || prev.empty !== empty) {
                    this.slots.set(name, { empty, nodes });
                    changed = true;
                }

                slot.toggleAttribute('empty', empty);
            }

            if (changed) {
                this.host.requestUpdate();
            }
        };

        requestAnimationFrame(() => {
            requestAnimationFrame(update);
        });

        const onSlotChange = () => {
            requestAnimationFrame(update);
        };

        for (const slot of slots) {
            slot.addEventListener('slotchange', onSlotChange);
        }

        update();
    }

    isEmpty(name: string = 'default') {
        return this.slots.get(name)?.empty ?? true;
    }

    get(name: string) {
        return this.slots.get(name);
    }
}

export function slotsState() {
    return (proto: any, prop: string) => {
        Object.defineProperty(proto, prop, {
            get() {
                return this.__slotsState;
            },
        });

        const original = proto.connectedCallback;

        proto.connectedCallback = function () {
            this.__slotsState = new SlotsStateController(this);
            original?.call(this);
        };
    };
}

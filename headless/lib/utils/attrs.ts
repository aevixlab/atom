import type { LitElement } from 'lit';
import {
    Directive,
    directive,
    type ElementPart,
    type PartInfo,
    PartType,
} from 'lit/directive.js';

class AttrsDirective extends Directive {
    constructor(partInfo: PartInfo) {
        super(partInfo);

        if (partInfo.type !== PartType.ELEMENT) {
            throw new Error('attrs() can only be used on elements');
        }
    }

    render(attrs: Record<string, unknown>) {}

    update(part: ElementPart, [attrs]: [Record<string, unknown>]) {
        const el = part.element;

        for (const [key, value] of Object.entries(attrs)) {
            if (value == null || value === false) {
                el.removeAttribute(key);
            } else {
                el.setAttribute(key, String(value));
            }
        }
    }
}

export const attrs = directive(AttrsDirective);

export const syncAttr = <T extends LitElement>(
    elem: T,
    name: string,
    value?: string | null,
) => {
    if (typeof value !== 'string') {
        elem.removeAttribute('name');
    } else {
        elem.setAttribute(name, value);
    }
};

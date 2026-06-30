import { css } from 'lit';
import { AtomBaseStyles } from '../styles';

export const AtomBadgeStyles = [
    AtomBaseStyles,
    css`
        :host {
            display: inline-block;

            & div[part=root] {
                display: flex;
            }

            & slot:not([name]) {

            }

            & [part=right] {
                display: inline;
            }

            & slot:not([name])[empty] {

            }
        }

    `,
];

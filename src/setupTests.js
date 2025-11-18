// Provide a minimal ResizeObserver polyfill for jsdom (used by Recharts)
if (typeof globalThis.ResizeObserver === 'undefined') {
    // Simple no-op implementation sufficient for tests
    globalThis.ResizeObserver = class {
        observe() { }
        unobserve() { }
        disconnect() { }
    }
}

import { expect } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'

// Register jest-dom matchers with Vitest's expect
expect.extend(matchers)

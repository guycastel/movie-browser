# State Management Demos

This folder contains interactive demonstration components showcasing different state management approaches in React.

## Components

### `StateManagementDemo.tsx`
Basic demo showing the three state management approaches side-by-side:
- **useReducer** - Movie browser state with atomic updates
- **useReducer + Immer** - Enhanced state with filters and history
- **Image Loading State Machine** - Prevents invalid states

### `EnhancedStateManagementDemo.tsx`
Advanced demo with more complex interactions and real-world scenarios:
- Complex nested state updates
- Filter management
- Search history tracking
- Interactive buttons with immediate feedback

### `ImmerPerformanceDemo.tsx`
Technical demo showing Immer's performance benefits beyond developer experience:
- **Performance measurements** - Real-time comparison of manual spread vs Immer
- **Memory efficiency** - Demonstrates structural sharing
- **Complex nested updates** - Shows where Immer shines
- **Bug prevention** - Highlights common manual spread mistakes

### `DemoPage.tsx`
Standalone page component that can be used as a dedicated demo route.

## Usage

These components are automatically included in development mode via:
```tsx
{import.meta.env.DEV && (
  <VStack gap={6}>
    <EnhancedStateManagementDemo />
    <ImmerPerformanceDemo />
  </VStack>
)}
```

## Purpose

These demos help developers:
- ✅ **Learn** different state management patterns
- ✅ **Compare** performance characteristics
- ✅ **Understand** when to use each approach
- ✅ **See** real-time state changes
- ✅ **Test** edge cases safely

## Development Only

All demos are excluded from production builds and only appear in development mode (`import.meta.env.DEV`).

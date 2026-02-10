---
description: USE WHEN creating, modifying, or reviewing React components, hooks, state management, or effect patterns. Enforces Rules of Hooks and correct state/effect usage.
---

# React Patterns

Apply when creating, modifying, or reviewing React components.

## Rules of Hooks (CRITICAL)

Hooks must be called in the **same order** every render. Violating this crashes the app.

### Never Do

```tsx
// ❌ Hook in callback/render prop
const demos = [{
  render: () => {
    const [state, setState] = useState()  // CRASHES
    return <Component />
  }
}]

// ❌ Hook after conditional return
if (loading) return <Spinner />
const [data, setData] = useState()  // CRASHES

// ❌ Hook in condition
if (userId) {
  const [user, setUser] = useState()  // CRASHES
}

// ❌ Hook in loop
items.map(item => {
  const [selected, setSelected] = useState()  // CRASHES
})
```

### Always Do

```tsx
// ✅ Extract to separate component
const CheckboxDemo = () => {
  const [checked, setChecked] = useState(false)
  return <Checkbox checked={checked} onChange={setChecked} />
}

// ✅ Hooks before any returns
const [data, setData] = useState()
const [loading, setLoading] = useState(true)
if (loading) return <Spinner />

// ✅ Condition inside hook, not hook inside condition
useEffect(() => {
  if (userId) fetchUser(userId)
}, [userId])
```

## State Updates

```tsx
// ❌ Stale state - only increments once
setCount(count + 1)
setCount(count + 1)

// ✅ Functional update - increments twice
setCount(prev => prev + 1)
setCount(prev => prev + 1)
```

## Dependencies

```tsx
// ❌ Missing dependency - stale closure
useEffect(() => {
  doSomething(value)
}, [])

// ✅ All dependencies listed
useEffect(() => {
  doSomething(value)
}, [value])
```

## Component Galleries

When building component showcases:

| Pattern | Wrong | Right |
|---------|-------|-------|
| Stateful demo | Hook in render prop | Separate `*Demo` component |
| Context consumer | Render alone | Wrap in provider |
| Controlled input | Internal state | Props from wrapper |

```tsx
// ❌ Wrong - hook in render function
const components = [{
  name: "Checkbox",
  render: () => {
    const [checked, setChecked] = useState(false)
    return <Checkbox checked={checked} />
  }
}]

// ✅ Right - separate component
const CheckboxDemo = () => {
  const [checked, setChecked] = useState(false)
  return <Checkbox checked={checked} onChange={setChecked} />
}

const components = [{
  name: "Checkbox",
  render: () => <CheckboxDemo />
}]
```

## Cleanup

```tsx
// ❌ Memory leak
useEffect(() => {
  const id = setInterval(tick, 1000)
}, [])

// ✅ Cleanup on unmount
useEffect(() => {
  const id = setInterval(tick, 1000)
  return () => clearInterval(id)
}, [])
```

## Checklist

Before delivering React code:

- [ ] No hooks in callbacks, loops, conditions, or render props
- [ ] No hooks after conditional returns
- [ ] All `useEffect`/`useCallback`/`useMemo` deps included
- [ ] Functional state updates when depending on previous state
- [ ] Context consumers wrapped in their providers
- [ ] Effects return cleanup functions where needed

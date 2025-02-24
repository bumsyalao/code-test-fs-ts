# Code-test Solution
[View App](https://code-test-fs-ts.vercel.app/)

This is a web application built with Next.js to show user data fetching with an elegant loading animation.

## Technologies Used

- **Next.js**: For optimized React application with Server-Side Rendering (SSR)
- **TypeScript**: For type safety and better developer experience
- **SCSS Modules**: For scoped styling and better CSS organization
- **Next Image**: For optimized image rendering and CDN support

## Features

- Server-side rendered user list
- Infinite scroll functionality
- Custom pulse loader animation
- Responsive design
- Type-safe components

## Infinite Scroll Implementation

The application implements efficient infinite scrolling using the Intersection Observer API and React hooks for state management.

### Technical Implementation

#### State Management
```typescript
const [users, setUsers] = useState<User[]>([]);
const [page, setPage] = useState(1);
const [hasMore, setHasMore] = useState(true);
const [isLoadingMore, setIsLoadingMore] = useState(false);
```

- `users`: Stores the array of fetched user data
- `page`: Tracks the current page number for pagination
- `hasMore`: Boolean flag indicating if more users are available
- `isLoadingMore`: Loading state for subsequent data fetches

#### Intersection Observer
The implementation uses the Intersection Observer API to detect when the user scrolls near the bottom of the list:

```typescript
const observer = new IntersectionObserver(handleObserver, {
  root: null,         // Use viewport as root
  rootMargin: '20px', // Trigger 20px before reaching bottom
  threshold: 1.0      // Fully visible element
});
```

#### Fetch Logic
```typescript
const fetchUsers = async (pageNum: number) => {
  try {
    setIsLoadingMore(true);
    const response = await fetch(`https://reqres.in/api/users?page=${pageNum}`);
    const data = await response.json();

    // Append or replace data based on page number
    if (pageNum === 1) {
      setUsers(data.data);
    } else {
      setUsers(prev => [...prev, ...data.data]);
    }

    // Update hasMore based on available pages
    setHasMore(data.page < data.total_pages);
  } catch (error) {
    console.error('Error fetching users:', error);
  } finally {
    setIsLoadingMore(false);
  }
};
```

#### Hydration Handling
```typescript
const [hydrated, setHydrated] = useState(false);

useEffect(() => {
  setHydrated(true);
}, []);
```
Prevents hydration mismatches between server and client rendering in Next.js.

### Key Features

1. **Efficient Loading**
   - Loads users in batches as needed
   - Prevents unnecessary API calls
   - Maintains smooth scrolling experience

2. **Error Handling**
   - Gracefully handles API errors
   - Provides error feedback in console
   - Maintains application stability

3. **User Experience**
   - Loading indicators for feedback
   - Smooth infinite scroll
   - Clear indication when all users are loaded

4. **Performance Optimization**
   - Uses Next.js Image component for optimized images
   - Implements lazy loading
   - Prevents unnecessary re-renders

### Component Structure
```jsx
<div className={styles.userList}>
  {/* User Cards */}
  {users.map(user => (
    <div key={user.id} className={styles.userCard}>
      <Image src={user.avatar} width={60} height={60} alt={`${user.first_name} ${user.last_name}`} />
      <div className={styles.userInfo}>
        <h3>{`${user.first_name} ${user.last_name}`}</h3>
        <p>{user.email}</p>
      </div>
    </div>
  ))}

  {/* Infinite Scroll Trigger */}
  <div ref={observerTarget} className={styles.loadingTrigger}>
    {isLoadingMore && <p>Loading more...</p>}
    {!hasMore && <p>No more users to load</p>}
  </div>
</div>
```


## Custom Pulse Loader Implementation

The application features a custom pulse loader animation that creates a ripple effect using concentric circles. The loader consists of three main components:

### Visual Structure
- **Inner Circle**: A static, solid green circle (#80b900)
- **Middle Circle**: An animated circle (#d1e5a4) that pulses outward
- **Outer Circle**: A delayed animated circle (#e5f1cc) creating a ripple effect

### Technical Implementation

#### Component Structure (PulseLoader.tsx)
```typescript
interface PulseLoaderProps {
  onLoadingComplete?: () => void;
  duration?: number;
}
```

The loader component accepts two props:
- `onLoadingComplete`: Callback function executed when loading completes
- `duration`: Display duration in milliseconds (defaults to 3000ms)

#### Animation Logic
The loader implements two key animations:
1. **Ripple Effect**: Achieved through CSS scale transformations
2. **Fade Out**: Opacity transitions from solid to transparent

#### SCSS Implementation
The animation uses:
- Fixed positioning for fullscreen overlay
- Absolute positioning for circle placement
- CSS keyframes for smooth animations
- Delayed animations for ripple effect
- SCSS modules for style encapsulation

```scss
// Example of ripple animation
@keyframes rippleMiddle {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── components/
│   └── PulseLoader/
│       ├── PulseLoader.tsx
│       └── PulseLoader.module.scss
│   └── UserList/
│       ├── UserList.tsx
│       └── UserList.module.scss
├── page.tsx
├── page.module.scss
```

## Performance Considerations

- Uses Next.js Image optimization for better image loading
- Implements infinite scroll for better performance with large data sets
- CSS animations for smooth, hardware-accelerated animations
- CSS Modules for zero-runtime CSS-in-JS solution

## Further Improvements

- Add unit tests for components
- Implement error boundaries and visual UI toast for error messages
- Add loading state skeletons
- Implement retry mechanism for failed API calls
- Add end-to-end tests

## Demo

[![Watch the Screen Recording](https://res.cloudinary.com/dcpfdxsly/image/upload/v1740327779/ezgif-25f32c9fcc4a59_xwjt8j.gif)](https://res.cloudinary.com/dcpfdxsly/video/upload/v1740327154/code-test-fs-ts-video-recording_kw6orp.mov)

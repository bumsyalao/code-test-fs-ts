"use client"

import { useEffect, useState, useRef, useCallback } from 'react';
import styles from './UserList.module.scss';

// Define the structure of a User object
interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

// Define the props expected by the UserList component
interface UserListProps {
  isLoading: boolean; // Boolean flag to determine if the initial loading is still active
}

export const UserList: React.FC<UserListProps> = ({ isLoading }) => {
  // State to store the list of users
  const [users, setUsers] = useState<User[]>([]);
  // State to track the current page number for pagination
  const [page, setPage] = useState(1);
  // State to determine if there are more users to load
  const [hasMore, setHasMore] = useState(true);
  // State to track if additional users are being fetched
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  // Reference to the div used as the observer target for infinite scrolling
  const observerTarget = useRef<HTMLDivElement>(null);

  /**
   * Fetches user data from the API based on the given page number.
   * Updates the user list and determines if more pages are available.
   */
  const fetchUsers = async (pageNum: number) => {
    try {
      setIsLoadingMore(true);
      const response = await fetch(`https://reqres.in/api/users?page=${pageNum}`);
      const data = await response.json();
      
      if (pageNum === 1) {
        // If it's the first page, replace existing users
        setUsers(data.data);
      } else {
        // Append new users to the existing list
        setUsers(prev => [...prev, ...data.data]);
      }
      
      // Check if there are more pages to load
      setHasMore(data.page < data.total_pages);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  /**
   * Handles the intersection observer callback.
   * If the target element is visible and there are more users to load,
   * it triggers the next page load.
   */
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore && !isLoadingMore && !isLoading) {
      setPage(prev => prev + 1);
    }
  }, [hasMore, isLoadingMore, isLoading]);

  /**
   * Sets up an IntersectionObserver to trigger loading more users when the user scrolls to the bottom.
   */
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null, // Observe within the viewport
      rootMargin: '20px', // Trigger when 20px away from the bottom
      threshold: 1.0 // Trigger when the element is fully visible
    });

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect(); // Cleanup observer on unmount
  }, [handleObserver]);

  /**
   * Fetch users whenever the page number changes or when the initial loading is complete.
   */
  useEffect(() => {
    if (!isLoading) {
      fetchUsers(page);
    }
  }, [page, isLoading]);

  // If the initial loading is still active, do not render the user list
  if (isLoading) return null;

  return (
    <div className={styles.userList}>
      {/* Render the list of users */}
      {users.map(user => (
        <div key={user.id} className={styles.userCard}>
          <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
          <div className={styles.userInfo}>
            <h3>{`${user.first_name} ${user.last_name}`}</h3>
            <p>{user.email}</p>
          </div>
        </div>
      ))}
      
      {/* Placeholder for lazy loading trigger */}
      <div ref={observerTarget} className={styles.loadingTrigger}>
        {isLoadingMore && <p>Loading more...</p>}
        {!hasMore && <p>No more users to load</p>}
      </div>
    </div>
  );
};

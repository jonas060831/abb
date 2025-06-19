'use client';

import React, { useEffect, useState, useMemo } from 'react';
import styles from './OwnerWidget.module.css';
import { getAllRsvp, RsvpEntry } from '@/app/(serverFunctions)/rsvp';

const OwnerWidget = () => {
  const [guests, setGuests] = useState<RsvpEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortMode, setSortMode] = useState<'default' | 'groupAndDate'>('default');
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');

  useEffect(() => {
    const fetchGuests = async () => {
      const res = await getAllRsvp();
      console.log(res);
      if (res.success && res.data) {
        setGuests(res.data);
      } else {
        console.error('Failed to load guests:', res.error);
      }
      setLoading(false);
    };

    fetchGuests();
  }, []);

  const sortedGuests = useMemo(() => {
    if (sortMode === 'default') return guests;

    return [...guests].sort((a, b) => {
      if (a.attendance < b.attendance) return -1;
      if (a.attendance > b.attendance) return 1;

      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

      return dateB - dateA;
    });
  }, [guests, sortMode]);

  const totalHeadcount = useMemo(() => {
    return guests.reduce((total, guest) => total + guest.guestNames.length, 0);
  }, [guests]);

  return (
    <div className={styles.widget_container}>
      <div className={styles.header}>
        <h2>Guest List</h2>
        <div className={styles.controls}>
          <button onClick={() => setSortMode(prev => (prev === 'default' ? 'groupAndDate' : 'default'))}>
            {sortMode === 'default' ? 'Sort by Group + Date' : 'Show All Guests'}
          </button>
          <button onClick={() => setViewMode(prev => (prev === 'card' ? 'table' : 'card'))}>
            {viewMode === 'card' ? 'View as Table' : 'View as Cards'}
          </button>
        </div>
      </div>

      <p className={styles.headcount}><strong>Total Headcount:</strong> {totalHeadcount}</p>

      {loading ? (
        <p>Loading guests...</p>
      ) : viewMode === 'table' ? (
        <div className={styles.table_wrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Guest Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Attendance</th>
                <th>RSVP ID</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {sortedGuests.map(guest => (
                <tr key={guest._id}>
                  <td>{guest.guestNames.join(', ')}</td>
                  <td>{guest.contactEmail}</td>
                  <td>{guest.contactNumber}</td>
                  <td>{guest.attendance}</td>
                  <td>{guest.rsvpId}</td>
                  <td>{guest.createdAt ? new Date(guest.createdAt).toLocaleString() : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className={styles.grid}>
          {sortedGuests.map(guest => (
            <div key={guest._id} className={styles.card}>
              <p><strong>Guests:</strong> {guest.guestNames.join(', ')}</p>
              <p><strong>Email:</strong> {guest.contactEmail}</p>
              <p><strong>Phone:</strong> {guest.contactNumber}</p>
              <p><strong>Attendance:</strong> {guest.attendance}</p>
              <p><strong>RSVP ID:</strong> {guest.rsvpId}</p>
              {guest.createdAt && (
                <p className={styles.date}><strong>Date:</strong> {new Date(guest.createdAt).toLocaleString()}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerWidget;

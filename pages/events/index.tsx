import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getLayout } from "../components/layout";

const Events: React.FC = ({ eventList }: any) => {
  const [events, setEvents] = useState(eventList);
  const [filter, setFilter] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch(`http://localhost:4000/events?category=${filter}`);
      const data = await response.json();
      setEvents(data);
    };

    if (filter!=="") {
      fetchEvents();
    } 
    router.push(`/events?category=${filter}` , undefined , {shallow:true});
  }, [filter ,router]); 

  return (
    <>
      <div className="container mx-auto p-4">
        <label htmlFor="selectInput">Select an option:</label>
        <select
          id="selectInput"
          name="selectInput"
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        >
          {eventList.map((e: any) => (
            <option key={e.category} value={e.category}>
              {e.category}
            </option>
          ))}
        </select>
        <h1 className="text-2xl font-semibold mb-4">Event List</h1>
        <ul>
          {events.map((event: any) => (
            <li key={event.id} className="mb-6">
              <h2 className="text-xl font-semibold mb-2">{event.eventName}</h2>
              <p className="text-gray-600">Date: {event.date}</p>
              <p className="text-gray-600">Category: {event.category}</p>
              <p className="text-gray-600">Description: {event.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

(Events as any).getLayout = getLayout

export default Events;

export async function getServerSideProps(context:any) {
  const { query } = context;
  const { category } = query;
  const queryString = category ? `category=${category}`: ''
  const response = await fetch(`http://localhost:4000/events?${queryString}`);
  const data = await response.json();

  return {
    props: {
      eventList: data,
    },
  };
}

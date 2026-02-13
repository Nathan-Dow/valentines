export interface Memory {
  id: number;
  date: string;
  title: string;
  description: string;
  image: string; // Put photos in /public/memories/
  color: string;
}

export const memories: Memory[] = [
  {
    id: 1,
    date: "Jan 12",
    title: "The First Coffee",
    description: "Where it all began. You wore that green scarf.",
    image: "/memories/date1.jpg",
    color: "#ffccd5",
  },
  {
    id: 2,
    date: "April 05",
    title: "Beach Day",
    description: "The sunset was pretty, but you were prettier.",
    image: "/memories/beach.jpg",
    color: "#caf0f8",
  },
  // Add as many as you want!
];
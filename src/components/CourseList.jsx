import { useEffect, useState } from "react";
import supabase from "../lib/supabase"; // Correct import path

function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses from the Supabase database
    async function fetchCourses() {
      try {
        const { data, error } = await supabase.from("courses").select("*");
        if (error) throw error;
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error.message);
      }
    }

    fetchCourses();
  }, []);

  return (
    <div>
      <h2>Course List</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <h3>{course.course_name}</h3>
            <p>{course.description}</p>
            <p>Category: {course.category_name}</p>
            <p>Price: ${course.price}</p>
            <p>Duration: {course.duration} hours</p>
            <p>Level: {course.level}</p>
            <p>Rating: {course.ratings}</p>
            <p>
              Creation Date:{" "}
              {new Date(course.creation_date).toLocaleDateString()}
            </p>
            <p>
              Last Update Date:{" "}
              {new Date(course.last_update_date).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseList;

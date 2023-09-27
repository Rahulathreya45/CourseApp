import React, { useEffect, useState } from "react";
import supabase from "../lib/supabase"; //
import CourseCard from "./CourseCard"; //

function SavedCourses({ userId }) {
  const [savedCourses, setSavedCourses] = useState([]);

  useEffect(() => {
    // Fetch the list of saved courses for the user
    async function fetchSavedCourses() {
      if (!userId) {
        return;
      }

      try {
        const { data, error } = await supabase
          .from("saved_courses")
          .select("course_id")
          .eq("user_id", userId);

        if (error) {
          throw error;
        }

        // Extract the course IDs from the fetched data
        const courseIds = data.map((entry) => entry.course_id);

        // Use the course IDs to fetch the course details
        const { data: courseData, error: courseError } = await supabase
          .from("courses")
          .select("*")
          .in("id", courseIds);

        if (courseError) {
          throw courseError;
        }

        // Set the list of saved courses with their details
        setSavedCourses(courseData);
      } catch (error) {
        console.error("Error fetching saved courses:", error.message);
      }
    }

    fetchSavedCourses();
  }, [userId]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {savedCourses.map((course) => (
        <CourseCard key={course.id} course={course} userId={userId} />
      ))}
    </div>
  );
}

export default SavedCourses;

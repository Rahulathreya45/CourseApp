import React from "react";
import EnrollButton from "./EnrollButton";
import supabase from "../lib/supabase";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
function CourseCard({ course }) {
  const session = useSession();
  // Define a mapping of categories to background colors for the dark theme
  const categoryColors = {
    "Web Development": "bg-blue-700",
    "Data Science": "bg-green-700",
    Design: "bg-red-700",
    Marketing: "bg-purple-700",
    Art: "bg-orange-700",
    // Add more category-color mappings as needed
  };

  // Determine the category color based on the course's category_name
  const categoryColor = categoryColors[course.category_name] || "bg-gray-800";

  // Format date to display in the "DD-MM-YYYY" format
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-IN", options);
  };
  const enrollInCourse = async (courseId) => {
    const { user } = session;

    if (!user) {
      alert("You must be signed in to enroll in courses.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("saved_courses")
        .insert({ user_id: user.id, course_id: courseId })
        .single();

      if (error) {
        throw error;
      }

      console.log("Successfully enrolled in course:", data);
      alert("You have successfully enrolled in this course!");
    } catch (error) {
      console.error("Error enrolling in course:", error.message);
      alert(
        "There was an error enrolling in this course. Please try again later."
      );
    }
  };

  return (
    <div
      className={`relative bg-gray-800 p-2 rounded-lg shadow-md ${categoryColor}`}
    >
      {/* Course Thumbnail (First letter of course name) */}
      <div className="bg-white p-1 rounded-full mb-2">
        <div className="w-10 h-10 rounded-full mx-auto bg-gray-300 flex justify-center items-center text-gray-600 font-semibold text-lg">
          {course.course_name.charAt(0).toUpperCase()}
        </div>
      </div>

      {/* Course Title */}
      <h2 className="text-lg font-semibold text-white mb-1">
        {course.course_name}
      </h2>

      {/* Course Description */}
      <p className="text-white-400 text-sm mb-2">{course.description}</p>

      {/* Course Category */}
      <p
        className={`text-black text-sm bg-white px-2 py-1 rounded-full float-right`}
      >
        {course.category_name}
      </p>

      {/* Course Details (e.g., Price, Duration, Level, Ratings) */}
      <div className="mt-2">
        <p className="text-white-400 text-sm">Price: {course.price} ₹</p>
        <p className="text-white-400 text-sm">
          Duration: {course.duration} hours
        </p>
        <p className="text-white-400 text-sm">Level: {course.level}</p>
        <p className="text-white-400 text-sm">Rating: {course.ratings}</p>
        <p className="text-white-400 text-sm">
          Last Updated: {formatDate(course.last_update_date)}
        </p>
      </div>

      {/* Enroll Button */}
      <div className="absolute bottom-2 right-2">
        <EnrollButton courseId={course.id} userId={session.user.id} />
      </div>
    </div>
  );
}

export default CourseCard;

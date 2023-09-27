import React, { useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard";
import supabase from "../../lib/supabase";
import { FaSearch } from "react-icons/fa";
function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchCourses() {
      try {
        const { data: coursesData, error } = await supabase
          .from("courses")
          .select("*");
        if (error) throw error;

        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching courses:", error.message);
      }
    }

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) => {
    const title = course.title || "";
    const category = course.category_name || "";

    return (
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="container mx-auto py-8">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for courses..."
          className="w-full px-4 py-2 rounded-md shadow-md bg-black-900 text-black" // Set background color to bg-gray-900
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

export default CoursesPage;

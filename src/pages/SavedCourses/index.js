import SavedCourses from "../../components/SavedCourses";
import React from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
function SavedCoursesPage() {
  const session = useSession();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">Saved Courses</h1>
      {session ? (
        <SavedCourses userId={session.user.id} />
      ) : (
        <p>Please sign in to view your saved courses.</p>
      )}
    </div>
  );
}

export default SavedCoursesPage;

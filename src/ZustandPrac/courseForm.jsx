import React, { useState } from 'react';
import useCourseStore from './zustandStore';

export const CourseForm = () => {
  const addCourse = useCourseStore((state) => state.addCourse);
  const [courseName, setCourseName] = useState("");

  console.log("CourseForm re-rendered");

  const handleCourseSubmit = () => {
    if (courseName.trim() === "") return alert("Course name is required");

    addCourse({
      id: Math.ceil(Math.random() * 10000),
      name: courseName,
      completed: false,
    });

    setCourseName("");
  };

  return (
    <div>
      <input
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleCourseSubmit()}
        placeholder="Enter course name"
        style={{color:"black"}}
      />
      <button onClick={handleCourseSubmit}>Add Course</button>
    </div>
  );
};

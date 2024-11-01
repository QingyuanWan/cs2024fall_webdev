import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { enrollments } from "../Database";

const initialState = {
  enrollments: enrollments,
};

const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (state, action: PayloadAction<{ user: string; course: string }>) => {
      const exists = state.enrollments.some(
        (enrollment) =>
          enrollment.user === action.payload.user &&
          enrollment.course === action.payload.course
      );

      if (!exists) {
        state.enrollments.push({
          _id: (state.enrollments.length + 1).toString(),
          user: action.payload.user,
          course: action.payload.course,
        });
      }
    },
    unenroll: (state, action: PayloadAction<{ user: string; course: string }>) => {
      state.enrollments = state.enrollments.filter(
        (enrollment) =>
          !(
            enrollment.user === action.payload.user &&
            enrollment.course === action.payload.course
          )
      );
    },
  },
});

export const { enroll, unenroll } = enrollmentSlice.actions;

export default enrollmentSlice.reducer;

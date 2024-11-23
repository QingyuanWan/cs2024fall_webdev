import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

const initialState: { enrollments: Enrollment[] } = {
  enrollments: [],
};

const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action: PayloadAction<Enrollment[]>) => {
      state.enrollments = action.payload;
    },
    enroll: (state, action: PayloadAction<{ user: string; course: string }>) => {
      state.enrollments.push({
        _id: Date.now().toString(),
        user: action.payload.user,
        course: action.payload.course,
      });
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

export const { setEnrollments, enroll, unenroll } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;

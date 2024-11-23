import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const enrollUserInCourse = async (userId: string, courseId: string) => {
  await axios.post(ENROLLMENTS_API, { userId, courseId });
};

export const unenrollUserFromCourse = async (userId: string, courseId: string) => {
  await axios.delete(ENROLLMENTS_API, { data: { userId, courseId } });
};
export const findEnrollmentsForUser = async (userId: string) => {
    const { data } = await axios.get(`${ENROLLMENTS_API}/${userId}/enrollments`);
    return data;
  };